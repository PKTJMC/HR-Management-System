import type { AppRole } from "../../lib/auth/roles";

export function canEditAnyEmployeeProfile(role: AppRole) {
  return role === "hr";
}

export function canViewEmployeeDirectory(role: AppRole) {
  return role === "hr" || role === "management" || role === "employee";
}

export function canViewSensitiveEmployeeFields(role: AppRole) {
  return role === "hr";
}

export function canEditOwnEmployeeProfile(
  role: AppRole,
  actorUserId: string,
  targetUserId: string,
) {
  if (role !== "employee") {
    return false;
  }

  return actorUserId === targetUserId;
}
