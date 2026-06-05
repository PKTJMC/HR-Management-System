import { z } from "zod";

export const employeeCreateSchema = z.object({
  employeeCode: z.string().min(1),
  legalFirstName: z.string().min(1),
  legalLastName: z.string().min(1),
  preferredName: z.string().min(1),
  companyEmail: z.string().email(),
  departmentId: z.string().uuid().or(z.string().min(1)),
  jobTitleId: z.string().uuid().or(z.string().min(1)),
  employmentType: z.enum(["full_time", "part_time", "contract", "intern"]),
  joinDate: z.string().min(1),
  employmentStatus: z.enum([
    "active",
    "probation",
    "on_leave",
    "resigned",
    "terminated",
  ]),
});
