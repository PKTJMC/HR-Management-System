import { describe, expect, it } from "vitest";
import {
  canEditEmployee,
  canViewSensitiveEmployeeFields,
} from "./permissions";

describe("employee permissions", () => {
  it("allows hr to edit employee records", () => {
    expect(canEditEmployee("hr")).toBe(true);
  });

  it("blocks management from sensitive fields", () => {
    expect(canViewSensitiveEmployeeFields("management")).toBe(false);
  });
});
