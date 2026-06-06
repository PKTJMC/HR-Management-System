import { describe, expect, it } from "vitest";
import {
  canEditEmployee,
  canEditOwnEmployeeProfile,
  canViewEmployeeDirectory,
  canViewSensitiveEmployeeFields,
} from "./permissions";

describe("employee permissions", () => {
  it("allows hr to edit employee records", () => {
    expect(canEditEmployee("hr")).toBe(true);
  });

  it("blocks management from sensitive fields", () => {
    expect(canViewSensitiveEmployeeFields("management")).toBe(false);
  });

  it("allows management to view the employee directory", () => {
    expect(canViewEmployeeDirectory("management")).toBe(true);
  });

  it("allows employees to edit only their own profile data", () => {
    expect(canEditOwnEmployeeProfile("employee", "user-1", "user-1")).toBe(
      true,
    );
    expect(canEditOwnEmployeeProfile("employee", "user-1", "user-2")).toBe(
      false,
    );
  });
});
