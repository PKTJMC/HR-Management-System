import type { AppRole } from "../../lib/auth/roles";

export function canEditEmployee(role: AppRole) {
  return role === "hr";
}

export function canViewSensitiveEmployeeFields(role: AppRole) {
  return role === "hr";
}
