"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { canEditAnyEmployeeProfile } from "../permissions";
import {
  getSessionRoleFromCookieValue,
  MOCK_ROLE_SESSION_COOKIE,
} from "../../../lib/auth/session";
import type { EmployeeActionResult } from "./create-employee";

const employeeAdminUpdateSchema = z.object({
  employeeId: z.string().min(1),
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

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function updateEmployee(
  formData: FormData,
): Promise<EmployeeActionResult> {
  const cookieStore = await cookies();
  const role = getSessionRoleFromCookieValue(
    cookieStore.get(MOCK_ROLE_SESSION_COOKIE)?.value,
  );

  if (!role || !canEditAnyEmployeeProfile(role)) {
    return {
      success: false,
      message: "You do not have permission to edit employee records.",
    };
  }

  const result = employeeAdminUpdateSchema.safeParse({
    employeeId: getStringValue(formData, "employeeId"),
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
      message: "Employee update payload is invalid.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: `Employee ${result.data.employeeId} update scaffold completed.`,
  };
}
