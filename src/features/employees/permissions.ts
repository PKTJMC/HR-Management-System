import type { AppRole } from "../../lib/auth/roles";

export function canEditEmployee(role: AppRole) {
  return role === "hr";
}

export function canViewEmployeeDirectory(role: AppRole) {
  return role === "hr" || role === "management";
}

export function canViewSensitiveEmployeeFields(role: AppRole) {
  return role === "hr";
}

export function canEditOwnEmployeeProfile(
  role: AppRole,
  actorUserId: string,
  targetUserId: string,
) {
  if (role === "hr") {
    return true;
  }

  if (role !== "employee") {
    return false;
  }

  return actorUserId === targetUserId;
}
