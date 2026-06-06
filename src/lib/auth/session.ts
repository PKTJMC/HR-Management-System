import type { AppRole } from "./roles";
import { isAppRole } from "./roles";

export const SESSION_ROLE_COOKIE = "hrms-role";

export type AppSession = {
  role: AppRole;
};

type RequestCookieStore = {
  get(name: string): { value: string } | undefined;
};

type RequestWithCookies = {
  cookies: RequestCookieStore;
};

export function getSessionRoleFromCookieValue(
  cookieValue: string | null | undefined,
): AppRole | null {
  return isAppRole(cookieValue) ? cookieValue : null;
}

export function getSessionFromRequest(
  request: RequestWithCookies,
): AppSession | null {
  const role = getSessionRoleFromCookieValue(
    request.cookies.get(SESSION_ROLE_COOKIE)?.value,
  );

  if (!role) {
    return null;
  }

  return { role };
}

export function getSessionRoleFromRequest(
  request: RequestWithCookies,
): AppRole | null {
  return getSessionFromRequest(request)?.role ?? null;
}
