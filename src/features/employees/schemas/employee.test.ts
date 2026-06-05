import { describe, expect, it } from "vitest";
import { employeeCreateSchema } from "./employee";

const validPayload = {
  employeeCode: "EMP-001",
  legalFirstName: "Big",
  legalLastName: "Boss",
  preferredName: "Big",
  companyEmail: "big@company.com",
  departmentId: "11111111-1111-4111-8111-111111111111",
  jobTitleId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  employmentType: "full_time",
  joinDate: "2026-06-06",
  employmentStatus: "active",
} as const;

describe("employeeCreateSchema", () => {
  it("accepts a valid employee payload", () => {
    const result = employeeCreateSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const result = employeeCreateSchema.safeParse({
      ...validPayload,
      companyEmail: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid UUID values for department and job title", () => {
    const result = employeeCreateSchema.safeParse({
      ...validPayload,
      departmentId: "dep-1",
      jobTitleId: "title-1",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid employment status", () => {
    const result = employeeCreateSchema.safeParse({
      ...validPayload,
      employmentStatus: "archived",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid join date", () => {
    const result = employeeCreateSchema.safeParse({
      ...validPayload,
      joinDate: "2026-02-30",
    });

    expect(result.success).toBe(false);
  });
});
