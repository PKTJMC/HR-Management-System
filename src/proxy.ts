import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRequiredRoleForPath } from "./lib/auth/guards";
import { roleHomeMap } from "./lib/auth/roles";
import { getMockSessionRoleFromRequest } from "./lib/auth/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiredRole = getRequiredRoleForPath(pathname);

  if (!requiredRole) {
    return NextResponse.next();
  }

  const role = getMockSessionRoleFromRequest(request);

  if (!role) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (role !== requiredRole) {
    return NextResponse.redirect(new URL(roleHomeMap[role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hr/:path*", "/management/:path*", "/employee/:path*"],
};
