export const appRoles = ["hr", "management", "employee"] as const;

export type AppRole = (typeof appRoles)[number];

export const roleHomeMap: Record<AppRole, string> = {
  hr: "/hr/dashboard",
  management: "/management/dashboard",
  employee: "/employee/dashboard",
};

export const roleRoutePrefixMap: Record<AppRole, `/${string}`> = {
  hr: "/hr",
  management: "/management",
  employee: "/employee",
};

export function isAppRole(value: string | null | undefined): value is AppRole {
  return appRoles.includes(value as AppRole);
}
