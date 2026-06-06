import { describe, expect, it } from "vitest";
import {
  canEditAnyEmployeeProfile,
  canEditOwnEmployeeProfile,
  canViewEmployeeDirectory,
  canViewSensitiveEmployeeFields,
} from "./permissions";

describe("employee permissions", () => {
  it("allows hr to perform admin edits on employee records", () => {
    expect(canEditAnyEmployeeProfile("hr")).toBe(true);
    expect(canEditAnyEmployeeProfile("management")).toBe(false);
  });

  it("blocks management from sensitive fields", () => {
    expect(canViewSensitiveEmployeeFields("management")).toBe(false);
  });

  it("allows employee directory visibility for management and employees", () => {
    expect(canViewEmployeeDirectory("management")).toBe(true);
    expect(canViewEmployeeDirectory("employee")).toBe(true);
  });

  it("allows employees to edit only their own profile data", () => {
    expect(canEditOwnEmployeeProfile("employee", "user-1", "user-1")).toBe(
      true,
    );
    expect(canEditOwnEmployeeProfile("employee", "user-1", "user-2")).toBe(
      false,
    );
    expect(canEditOwnEmployeeProfile("hr", "user-1", "user-2")).toBe(false);
  });
});
