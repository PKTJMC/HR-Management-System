import type { AppRole } from "./roles";
import { isAppRole } from "./roles";

/**
 * Temporary scaffold-only cookie for Task 3 routing.
 *
 * This is intentionally a mock role session and must not be treated as
 * production authentication or a trusted authorization source.
 */
export const MOCK_ROLE_SESSION_COOKIE = "hrms-role";

/**
 * Temporary role session shape used only until real auth is wired in.
 */
export type MockRoleSession = {
  role: AppRole;
  userId: string;
  employeeId: string | null;
  legalFirstName: string;
  legalLastName: string;
};

type RequestCookieStore = {
  get(name: string): { value: string } | undefined;
};

type RequestWithCookies = {
  cookies: RequestCookieStore;
};

const mockSessionIdentityMap: Record<AppRole, Omit<MockRoleSession, "role">> = {
  hr: {
    userId: "hr-user",
    employeeId: "hr-staff",
    legalFirstName: "HR",
    legalLastName: "Admin",
  },
  management: {
    userId: "management-user",
    employeeId: "management-staff",
    legalFirstName: "Management",
    legalLastName: "Lead",
  },
  employee: {
    userId: "employee-self",
    employeeId: "employee-self",
    legalFirstName: "Big",
    legalLastName: "Boss",
  },
};

export function getSessionRoleFromCookieValue(
  cookieValue: string | null | undefined,
): AppRole | null {
  return isAppRole(cookieValue) ? cookieValue : null;
}

/**
 * Temporary scaffold identity derived entirely on the server side.
 *
 * This closes obvious client-side hidden-input spoofing paths until real auth
 * is available. Do not treat these ids as production-safe identity claims.
 */
export function getMockRoleSessionFromCookieValue(
  cookieValue: string | null | undefined,
): MockRoleSession | null {
  const role = getSessionRoleFromCookieValue(cookieValue);

  if (!role) {
    return null;
  }

  return {
    role,
    ...mockSessionIdentityMap[role],
  };
}

/**
 * Reads a mock role session from request cookies for scaffold routing only.
 *
 * Do not reuse this as real authentication. The cookie is unsigned and can be
 * changed by the client, so it is suitable only for temporary local role flows.
 */
export function getMockRoleSessionFromRequest(
  request: RequestWithCookies,
): MockRoleSession | null {
  return getMockRoleSessionFromCookieValue(
    request.cookies.get(MOCK_ROLE_SESSION_COOKIE)?.value,
  );
}

export function getMockSessionRoleFromRequest(
  request: RequestWithCookies,
): AppRole | null {
  return getMockRoleSessionFromRequest(request)?.role ?? null;
}
