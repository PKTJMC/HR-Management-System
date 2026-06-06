"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import {
  canEditAnyEmployeeProfile,
  canEditOwnEmployeeProfile,
} from "../permissions";
import { mapEmployeeToPublicProfile } from "../mappers";
import {
  getSessionRoleFromCookieValue,
  MOCK_ROLE_SESSION_COOKIE,
} from "../../../lib/auth/session";
import type { EmployeeActionResult } from "./create-employee";

const selfProfileUpdateSchema = z.object({
  employeeId: z.string().min(1),
  actorUserId: z.string().min(1),
  targetUserId: z.string().min(1),
  legalFirstName: z.string().min(1),
  legalLastName: z.string().min(1),
  preferredName: z.string().min(1),
  phone: z.string().trim(),
  address: z.string().trim(),
  emergencyContactName: z.string().trim(),
  emergencyContactPhone: z.string().trim(),
  bio: z.string().trim(),
  phoneVisible: z.boolean(),
  bioVisible: z.boolean(),
});

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function getNullableStringValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key).trim();

  return value.length > 0 ? value : null;
}

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export type UpdateMyProfileResult = EmployeeActionResult & {
  publicProfile?: ReturnType<typeof mapEmployeeToPublicProfile>;
};

export async function updateMyProfile(
  formData: FormData,
): Promise<UpdateMyProfileResult> {
  const cookieStore = await cookies();
  const role = getSessionRoleFromCookieValue(
    cookieStore.get(MOCK_ROLE_SESSION_COOKIE)?.value,
  );

  if (!role) {
    return {
      success: false,
      message: "You must be signed in to update a profile.",
    };
  }

  const result = selfProfileUpdateSchema.safeParse({
    employeeId: getStringValue(formData, "employeeId"),
    actorUserId: getStringValue(formData, "actorUserId"),
    targetUserId: getStringValue(formData, "targetUserId"),
    legalFirstName: getStringValue(formData, "legalFirstName"),
    legalLastName: getStringValue(formData, "legalLastName"),
    preferredName: getStringValue(formData, "preferredName"),
    phone: getStringValue(formData, "phone"),
    address: getStringValue(formData, "address"),
    emergencyContactName: getStringValue(formData, "emergencyContactName"),
    emergencyContactPhone: getStringValue(formData, "emergencyContactPhone"),
    bio: getStringValue(formData, "bio"),
    phoneVisible: getBooleanValue(formData, "phoneVisible"),
    bioVisible: getBooleanValue(formData, "bioVisible"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Profile update payload is invalid.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const canEditProfile =
    canEditAnyEmployeeProfile(role) ||
    canEditOwnEmployeeProfile(
      role,
      result.data.actorUserId,
      result.data.targetUserId,
    );

  if (!canEditProfile) {
    return {
      success: false,
      message: "You do not have permission to edit this profile.",
    };
  }

  return {
    success: true,
    message: `Profile ${result.data.employeeId} is ready for persistence.`,
    publicProfile: mapEmployeeToPublicProfile({
      employee: {
        id: result.data.employeeId,
        legalFirstName: result.data.legalFirstName,
        legalLastName: result.data.legalLastName,
        preferredName: result.data.preferredName,
        phone: getNullableStringValue(formData, "phone"),
        bio: getNullableStringValue(formData, "bio"),
        address: result.data.address,
        emergencyContactName: result.data.emergencyContactName,
        emergencyContactPhone: result.data.emergencyContactPhone,
      },
      privacy: {
        phoneVisible: result.data.phoneVisible,
        bioVisible: result.data.bioVisible,
      },
    }),
  };
}
