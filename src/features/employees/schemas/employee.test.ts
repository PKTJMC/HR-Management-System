import { describe, expect, it } from "vitest";
import { employeeCreateSchema } from "./employee";

describe("employeeCreateSchema", () => {
  it("accepts a valid employee payload", () => {
    const result = employeeCreateSchema.safeParse({
      employeeCode: "EMP-001",
      legalFirstName: "Big",
      legalLastName: "Boss",
      preferredName: "Big",
      companyEmail: "big@company.com",
      departmentId: "dep-1",
      jobTitleId: "title-1",
      employmentType: "full_time",
      joinDate: "2026-06-06",
      employmentStatus: "active",
    });

    expect(result.success).toBe(true);
  });
});
