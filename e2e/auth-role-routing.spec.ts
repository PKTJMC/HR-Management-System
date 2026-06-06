import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../src/middleware";
import { SESSION_ROLE_COOKIE } from "../src/lib/auth/session";

function buildRequest(pathname: string, role?: string) {
  const headers = new Headers();

  if (role) {
    headers.set("cookie", `${SESSION_ROLE_COOKIE}=${role}`);
  }

  return new NextRequest(`http://localhost:3000${pathname}`, { headers });
}

describe("auth role routing", () => {
  it("allows hr users through hr routes", () => {
    const response = middleware(buildRequest("/hr/dashboard", "hr"));

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("redirects users without a role to unauthorized", () => {
    const response = middleware(buildRequest("/hr/dashboard"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/unauthorized",
    );
  });

  it("redirects mismatched roles to their own dashboard", () => {
    const response = middleware(buildRequest("/hr/dashboard", "management"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/management/dashboard",
    );
  });
});
