import { redirect } from "next/navigation";
import type { AppRole } from "./roles";
import { roleHomeMap, roleRoutePrefixMap } from "./roles";

export function requireRole(role: AppRole, allowedRoles: AppRole[]) {
  if (!allowedRoles.includes(role)) {
    redirect("/unauthorized");
  }
}

export function redirectToRoleHome(role: AppRole) {
  redirect(roleHomeMap[role]);
}

export function getRequiredRoleForPath(pathname: string): AppRole | null {
  for (const [role, prefix] of Object.entries(roleRoutePrefixMap) as [
    AppRole,
    string,
  ][]) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return role;
    }
  }

  return null;
}

export function canAccessPath(role: AppRole, pathname: string) {
  const requiredRole = getRequiredRoleForPath(pathname);

  if (!requiredRole) {
    return true;
  }

  return role === requiredRole;
}
