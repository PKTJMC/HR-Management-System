import { redirect } from "next/navigation";
import type { MockRoleSession } from "./session";
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

export function requireCurrentRole(session: MockRoleSession | null) {
  if (!session) {
    redirect("/unauthorized");
  }

  return session.role;
}

export function requireAllowedRoles(
  session: MockRoleSession | null,
  allowedRoles: AppRole[],
) {
  const role = requireCurrentRole(session);

  if (!allowedRoles.includes(role)) {
    redirect("/unauthorized");
  }

  return role;
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
