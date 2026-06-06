"use server";

import { cookies } from "next/headers";
import { employeeCreateSchema } from "../schemas/employee";
import { canEditAnyEmployeeProfile } from "../permissions";
import {
  getSessionRoleFromCookieValue,
  MOCK_ROLE_SESSION_COOKIE,
} from "../../../lib/auth/session";

export type EmployeeActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

export async function createEmployee(
  formData: FormData,
): Promise<EmployeeActionResult> {
  const cookieStore = await cookies();
  const role = getSessionRoleFromCookieValue(
    cookieStore.get(MOCK_ROLE_SESSION_COOKIE)?.value,
  );

  if (!role || !canEditAnyEmployeeProfile(role)) {
    return {
      success: false,
      message: "You do not have permission to create employee records.",
    };
  }

  const result = employeeCreateSchema.safeParse({
    employeeCode: getStringValue(formData, "employeeCode"),
    legalFirstName: getStringValue(formData, "legalFirstName"),
    legalLastName: getStringValue(formData, "legalLastName"),
    preferredName: getStringValue(formData, "preferredName"),
    companyEmail: getStringValue(formData, "companyEmail"),
    departmentId: getStringValue(formData, "departmentId"),
    jobTitleId: getStringValue(formData, "jobTitleId"),
    employmentType: getStringValue(formData, "employmentType"),
    joinDate: getStringValue(formData, "joinDate"),
    employmentStatus: getStringValue(formData, "employmentStatus"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Employee form contains invalid data.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: `Employee ${result.data.preferredName} is ready for persistence.`,
  };
}
