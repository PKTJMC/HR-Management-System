import { describe, expect, it } from "vitest";
import {
  mapEmployeeDetailForManagement,
  mapEmployeeRowForManagement,
} from "./management-view";

describe("management employee view mappers", () => {
  it("redacts pending activation status in directory rows", () => {
    const row = mapEmployeeRowForManagement({
      id: "employee-0049",
      employeeCode: "EMP-0049",
      name: "Mina Park",
      department: "Engineering",
      title: "Frontend Engineer",
      status: "Pending activation",
    });

    expect(row.status).toBe("Pending");
  });

  it("redacts pending activation status in employee detail views", () => {
    const detail = mapEmployeeDetailForManagement({
      id: "employee-0049",
      employeeCode: "EMP-0049",
      name: "Mina Park",
      legalName: "Mina Park",
      preferredName: "Mina",
      department: "Engineering",
      title: "Frontend Engineer",
      status: "Pending activation",
      email: "mina.park@company.test",
      location: "Bangkok HQ",
      manager: "Management Lead",
      startDate: "2026-06-16",
      employmentType: "Full-time",
      bio: null,
      isBioPublic: false,
    });

    expect(detail?.status).toBe("Pending");
  });
});
