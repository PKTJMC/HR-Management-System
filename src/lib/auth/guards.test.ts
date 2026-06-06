import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((destination: string) => {
    throw new Error(`REDIRECT:${destination}`);
  }),
}));

import { requireAllowedRoles, requireCurrentRole } from "./guards";
import type { MockRoleSession } from "./session";

const mockSessionByRole: Record<MockRoleSession["role"], MockRoleSession> = {
  hr: {
    role: "hr",
    userId: "hr-user",
    employeeId: "hr-staff",
    legalFirstName: "HR",
    legalLastName: "Admin",
  },
  management: {
    role: "management",
    userId: "management-user",
    employeeId: "management-staff",
    legalFirstName: "Management",
    legalLastName: "Lead",
  },
  employee: {
    role: "employee",
    userId: "employee-self",
    employeeId: "employee-self",
    legalFirstName: "Big",
    legalLastName: "Boss",
  },
};

describe("auth guards", () => {
  it("returns the current role when a scaffold session exists", () => {
    expect(requireCurrentRole(mockSessionByRole.hr)).toBe("hr");
  });

  it("redirects unauthenticated access to unauthorized", () => {
    expect(() => requireCurrentRole(null)).toThrowError(
      "REDIRECT:/unauthorized",
    );
  });

  it("allows only configured roles", () => {
    expect(requireAllowedRoles(mockSessionByRole.management, ["management"])).toBe(
      "management",
    );
    expect(() => requireAllowedRoles(mockSessionByRole.employee, ["hr"])).toThrow(
      "REDIRECT:/unauthorized",
    );
  });
});
