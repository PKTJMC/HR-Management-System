import { describe, expect, it } from "vitest";
import { parseImportCsvText, validateImportRows } from "../lib/import-validation";

describe("validateImportRows", () => {
  it("reports duplicate company email rows", () => {
    const result = validateImportRows([
      {
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
      },
      {
        employeeCode: "EMP-002",
        legalFirstName: "Mini",
        legalLastName: "Boss",
        preferredName: "Mini",
        companyEmail: "big@company.com",
        departmentId: "11111111-1111-4111-8111-111111111111",
        jobTitleId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
        employmentType: "full_time",
        joinDate: "2026-06-07",
        employmentStatus: "active",
      },
    ]);

    expect(result.failedRows).toBe(1);
    expect(result.errors[0]?.fieldName).toBe("companyEmail");
  });

  it("reports duplicate employee codes", () => {
    const result = validateImportRows([
      {
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
      },
      {
        employeeCode: "EMP-001",
        legalFirstName: "Mini",
        legalLastName: "Boss",
        preferredName: "Mini",
        companyEmail: "mini@company.com",
        departmentId: "11111111-1111-4111-8111-111111111111",
        jobTitleId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
        employmentType: "part_time",
        joinDate: "2026-06-07",
        employmentStatus: "probation",
      },
    ]);

    expect(result.failedRows).toBe(1);
    expect(result.errors[0]?.fieldName).toBe("employeeCode");
  });

  it("reports schema validation problems for malformed rows", () => {
    const result = validateImportRows([
      {
        employeeCode: "EMP-001",
        legalFirstName: "Big",
        legalLastName: "Boss",
        preferredName: "Big",
        companyEmail: "not-an-email",
        departmentId: "bad-id",
        jobTitleId: "bad-id",
        employmentType: "full_time",
        joinDate: "2026-06-99",
        employmentStatus: "active",
      },
    ]);

    expect(result.failedRows).toBe(1);
    expect(result.errors.map((error) => error.fieldName)).toContain("companyEmail");
    expect(result.errors.map((error) => error.fieldName)).toContain("departmentId");
  });
});

describe("parseImportCsvText", () => {
  it("reports missing required headers", () => {
    const result = parseImportCsvText("employeeCode,companyEmail\nEMP-001,big@company.com");

    expect(result.rows).toHaveLength(0);
    expect(result.errors[0]?.fieldName).toBe("legalFirstName");
  });
});
