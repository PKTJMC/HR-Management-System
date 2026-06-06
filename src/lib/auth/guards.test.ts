import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((destination: string) => {
    throw new Error(`REDIRECT:${destination}`);
  }),
}));

import { requireAllowedRoles, requireCurrentRole } from "./guards";

describe("auth guards", () => {
  it("returns the current role when a scaffold session exists", () => {
    expect(requireCurrentRole({ role: "hr" })).toBe("hr");
  });

  it("redirects unauthenticated access to unauthorized", () => {
    expect(() => requireCurrentRole(null)).toThrowError(
      "REDIRECT:/unauthorized",
    );
  });

  it("allows only configured roles", () => {
    expect(requireAllowedRoles({ role: "management" }, ["management"])).toBe(
      "management",
    );
    expect(() => requireAllowedRoles({ role: "employee" }, ["hr"])).toThrow(
      "REDIRECT:/unauthorized",
    );
  });
});
