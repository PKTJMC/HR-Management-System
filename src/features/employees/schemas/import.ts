import { z } from "zod";

export const employeeImportHeaders = [
  "employeeCode",
  "legalFirstName",
  "legalLastName",
  "preferredName",
  "companyEmail",
  "departmentId",
  "jobTitleId",
  "employmentType",
  "joinDate",
  "employmentStatus",
] as const;

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Join date must use YYYY-MM-DD format")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      !Number.isNaN(date.getTime()) &&
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Join date must be a valid calendar date");

export const employeeImportRowSchema = z.object({
  employeeCode: z.string().trim().min(1, "Employee code is required"),
  legalFirstName: z.string().trim().min(1, "Legal first name is required"),
  legalLastName: z.string().trim().min(1, "Legal last name is required"),
  preferredName: z.string().trim().min(1, "Preferred name is required"),
  companyEmail: z.string().trim().email("Company email must be valid"),
  departmentId: z.string().trim().uuid("Department must be a UUID"),
  jobTitleId: z.string().trim().uuid("Job title must be a UUID"),
  employmentType: z.enum(["full_time", "part_time", "contract", "intern"], {
    error: "Employment type is invalid",
  }),
  joinDate: isoDateSchema,
  employmentStatus: z.enum(
    ["active", "probation", "on_leave", "resigned", "terminated"],
    {
      error: "Employment status is invalid",
    },
  ),
});

export type EmployeeImportHeader = (typeof employeeImportHeaders)[number];
export type EmployeeImportRow = z.infer<typeof employeeImportRowSchema>;
