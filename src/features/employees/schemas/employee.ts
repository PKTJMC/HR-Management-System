import { z } from "zod";

const isoDateSchema = z
  .string()
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

export const employeeCreateSchema = z.object({
  employeeCode: z.string().min(1),
  legalFirstName: z.string().min(1),
  legalLastName: z.string().min(1),
  preferredName: z.string().min(1),
  companyEmail: z.string().email(),
  departmentId: z.uuid(),
  jobTitleId: z.uuid(),
  employmentType: z.enum(["full_time", "part_time", "contract", "intern"]),
  joinDate: isoDateSchema,
  employmentStatus: z.enum([
    "active",
    "probation",
    "on_leave",
    "resigned",
    "terminated",
  ]),
});
