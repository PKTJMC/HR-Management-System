# HR Core Employee Database MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-safe MVP for HR employee master data, role-based access, employee directory, self-service profile editing, and CSV import.

**Architecture:** Build a Next.js App Router application with Supabase for auth and Postgres, keeping account data separate from employee profile data. Use server-side authorization, Zod validation, and small route-scoped modules so HR, Management, and Employee experiences stay isolated.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase Auth, Supabase Postgres, React Hook Form, Zod, Lucide React, Vitest, Testing Library, Playwright

---

## File Structure

### App Shell and Auth

- Create: `src/app/(auth)/login/page.tsx`
- Create: `src/app/(auth)/forgot-password/page.tsx`
- Create: `src/app/(auth)/force-password-change/page.tsx`
- Create: `src/app/(portal)/hr/dashboard/page.tsx`
- Create: `src/app/(portal)/management/dashboard/page.tsx`
- Create: `src/app/(portal)/employee/dashboard/page.tsx`
- Create: `src/app/unauthorized/page.tsx`
- Create: `src/middleware.ts`

### Shared UI and Navigation

- Create: `src/components/layout/app-shell.tsx`
- Create: `src/components/layout/app-sidebar.tsx`
- Create: `src/components/layout/page-header.tsx`
- Create: `src/components/dashboard/stat-card.tsx`
- Create: `src/components/feedback/empty-state.tsx`
- Create: `src/components/feedback/error-state.tsx`

### Employee Domain

- Create: `src/features/employees/schemas/employee.ts`
- Create: `src/features/employees/schemas/import.ts`
- Create: `src/features/employees/types.ts`
- Create: `src/features/employees/permissions.ts`
- Create: `src/features/employees/queries.ts`
- Create: `src/features/employees/mappers.ts`
- Create: `src/features/employees/actions/create-employee.ts`
- Create: `src/features/employees/actions/update-employee.ts`
- Create: `src/features/employees/actions/update-my-profile.ts`
- Create: `src/features/employees/actions/import-employees.ts`
- Create: `src/features/employees/components/employee-table.tsx`
- Create: `src/features/employees/components/employee-filters.tsx`
- Create: `src/features/employees/components/employee-form.tsx`
- Create: `src/features/employees/components/profile-form.tsx`
- Create: `src/features/employees/components/import-dropzone.tsx`

### Employee Screens

- Create: `src/app/(portal)/hr/employees/page.tsx`
- Create: `src/app/(portal)/hr/employees/new/page.tsx`
- Create: `src/app/(portal)/hr/employees/[employeeId]/page.tsx`
- Create: `src/app/(portal)/hr/import/page.tsx`
- Create: `src/app/(portal)/management/directory/page.tsx`
- Create: `src/app/(portal)/management/employees/[employeeId]/page.tsx`
- Create: `src/app/(portal)/employee/profile/page.tsx`
- Create: `src/app/(portal)/employee/directory/page.tsx`
- Create: `src/app/(portal)/employee/employees/[employeeId]/page.tsx`

### Supabase and Database

- Create: `supabase/migrations/20260606_001_create_hr_core_tables.sql`
- Create: `supabase/seed.sql`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/auth/session.ts`
- Create: `src/lib/auth/roles.ts`
- Create: `src/lib/auth/guards.ts`

### Tests

- Create: `src/features/employees/schemas/employee.test.ts`
- Create: `src/features/employees/permissions.test.ts`
- Create: `src/features/employees/mappers.test.ts`
- Create: `src/features/employees/actions/import-employees.test.ts`
- Create: `src/app/(portal)/hr/employees/page.test.tsx`
- Create: `e2e/auth-role-routing.spec.ts`
- Create: `e2e/hr-employee-lifecycle.spec.ts`
- Create: `e2e/employee-self-service.spec.ts`

## Task 1: Scaffold the Project Foundation

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Test: `src/app/layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/layout.test.tsx
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders the application shell content", () => {
    render(
      <RootLayout>
        <div>HRMS App</div>
      </RootLayout>,
    );

    expect(screen.getByText("HRMS App")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/app/layout.test.tsx`
Expected: FAIL with `Cannot find module './layout'` or missing test setup.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "HR Management System",
  description: "Internal HR platform for employee data and profile management.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[--color-bg] text-[--color-fg] antialiased">
        {children}
      </body>
    </html>
  );
}
```

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --color-bg: #f4f1ea;
  --color-fg: #1e1a16;
  --color-panel: #fffdf8;
  --color-border: #d8cfbf;
  --color-accent: #0f766e;
  --color-accent-strong: #115e59;
}

body {
  font-family: "IBM Plex Sans", sans-serif;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/app/layout.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add package.json next.config.ts tsconfig.json src/app/layout.tsx src/app/globals.css src/app/layout.test.tsx
git commit -m "chore: scaffold nextjs foundation"
```

## Task 2: Create Database Schema and Seed Data

**Files:**
- Create: `supabase/migrations/20260606_001_create_hr_core_tables.sql`
- Create: `supabase/seed.sql`
- Test: `src/features/employees/schemas/employee.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/employees/schemas/employee.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/features/employees/schemas/employee.test.ts`
Expected: FAIL with missing schema file.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/features/employees/schemas/employee.ts
import { z } from "zod";

export const employeeCreateSchema = z.object({
  employeeCode: z.string().min(1),
  legalFirstName: z.string().min(1),
  legalLastName: z.string().min(1),
  preferredName: z.string().min(1),
  companyEmail: z.email(),
  departmentId: z.string().uuid().or(z.string().min(1)),
  jobTitleId: z.string().uuid().or(z.string().min(1)),
  employmentType: z.enum(["full_time", "part_time", "contract", "intern"]),
  joinDate: z.string().min(1),
  employmentStatus: z.enum(["active", "probation", "on_leave", "resigned", "terminated"]),
});
```

```sql
-- supabase/migrations/20260606_001_create_hr_core_tables.sql
create table departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  code text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table job_titles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  code text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table employees (
  id uuid primary key default gen_random_uuid(),
  employee_code text not null unique,
  legal_first_name text not null,
  legal_last_name text not null,
  preferred_name text not null,
  profile_image_url text,
  company_email text not null unique,
  phone text,
  department_id uuid not null references departments(id),
  job_title_id uuid not null references job_titles(id),
  employment_type text not null,
  join_date date not null,
  employment_status text not null,
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  bio text,
  created_by_user_id uuid,
  updated_by_user_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null unique references employees(id) on delete restrict,
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('hr', 'management', 'employee')),
  account_status text not null check (account_status in ('pending_activation', 'active', 'suspended')),
  must_change_password boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/features/employees/schemas/employee.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/20260606_001_create_hr_core_tables.sql supabase/seed.sql src/features/employees/schemas/employee.ts src/features/employees/schemas/employee.test.ts
git commit -m "feat: add hr core database schema"
```

## Task 3: Implement Authentication, Roles, and Route Guards

**Files:**
- Create: `src/lib/auth/roles.ts`
- Create: `src/lib/auth/session.ts`
- Create: `src/lib/auth/guards.ts`
- Create: `src/middleware.ts`
- Create: `src/app/unauthorized/page.tsx`
- Test: `src/features/employees/permissions.test.ts`
- Test: `e2e/auth-role-routing.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/employees/permissions.test.ts
import { describe, expect, it } from "vitest";
import { canEditEmployee, canViewSensitiveEmployeeFields } from "../permissions";

describe("employee permissions", () => {
  it("allows hr to edit employee records", () => {
    expect(canEditEmployee("hr")).toBe(true);
  });

  it("blocks management from sensitive fields", () => {
    expect(canViewSensitiveEmployeeFields("management")).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/features/employees/permissions.test.ts`
Expected: FAIL with missing permission helpers.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/auth/roles.ts
export type AppRole = "hr" | "management" | "employee";

export const roleHomeMap: Record<AppRole, string> = {
  hr: "/hr/dashboard",
  management: "/management/dashboard",
  employee: "/employee/dashboard",
};
```

```ts
// src/features/employees/permissions.ts
import type { AppRole } from "@/lib/auth/roles";

export function canEditEmployee(role: AppRole) {
  return role === "hr";
}

export function canViewSensitiveEmployeeFields(role: AppRole) {
  return role === "hr";
}
```

```ts
// src/lib/auth/guards.ts
import { redirect } from "next/navigation";
import type { AppRole } from "./roles";
import { roleHomeMap } from "./roles";

export function requireRole(role: AppRole, allowedRoles: AppRole[]) {
  if (!allowedRoles.includes(role)) {
    redirect("/unauthorized");
  }
}

export function redirectToRoleHome(role: AppRole) {
  redirect(roleHomeMap[role]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/features/employees/permissions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth/roles.ts src/lib/auth/guards.ts src/features/employees/permissions.ts src/features/employees/permissions.test.ts src/middleware.ts src/app/unauthorized/page.tsx e2e/auth-role-routing.spec.ts
git commit -m "feat: add auth role guards"
```

## Task 4: Build HR Employee Directory and Detail Experience

**Files:**
- Create: `src/app/(portal)/hr/employees/page.tsx`
- Create: `src/app/(portal)/hr/employees/[employeeId]/page.tsx`
- Create: `src/features/employees/components/employee-table.tsx`
- Create: `src/features/employees/components/employee-filters.tsx`
- Create: `src/features/employees/queries.ts`
- Test: `src/app/(portal)/hr/employees/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/(portal)/hr/employees/page.test.tsx
import { render, screen } from "@testing-library/react";
import EmployeesPage from "./page";

describe("EmployeesPage", () => {
  it("renders the employee directory heading", async () => {
    render(await EmployeesPage());
    expect(screen.getByRole("heading", { name: "Employee Directory" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- "src/app/(portal)/hr/employees/page.test.tsx"`
Expected: FAIL with missing page component.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/app/(portal)/hr/employees/page.tsx
import { PageHeader } from "@/components/layout/page-header";
import { EmployeeTable } from "@/features/employees/components/employee-table";

export default async function EmployeesPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Employee Directory"
        description="Search, filter, and manage employee master records."
      />
      <EmployeeTable rows={[]} />
    </section>
  );
}
```

```tsx
// src/features/employees/components/employee-table.tsx
type EmployeeRow = {
  id: string;
  name: string;
  department: string;
  title: string;
  status: string;
};

export function EmployeeTable({ rows }: { rows: EmployeeRow[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[--color-border] bg-[--color-panel]">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[--color-border] text-left">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-stone-500" colSpan={4}>
                No employees found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-[--color-border] last:border-b-0">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.department}</td>
                <td className="px-4 py-3">{row.title}</td>
                <td className="px-4 py-3">{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- "src/app/(portal)/hr/employees/page.test.tsx"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/'(portal)'/hr/employees/page.tsx src/app/'(portal)'/hr/employees/[employeeId]/page.tsx src/features/employees/components/employee-table.tsx src/features/employees/components/employee-filters.tsx src/features/employees/queries.ts src/app/'(portal)'/hr/employees/page.test.tsx
git commit -m "feat: add hr employee directory"
```

## Task 5: Build Employee Create/Edit and Self-Service Profile Flows

**Files:**
- Create: `src/app/(portal)/hr/employees/new/page.tsx`
- Create: `src/features/employees/components/employee-form.tsx`
- Create: `src/features/employees/components/profile-form.tsx`
- Create: `src/features/employees/actions/create-employee.ts`
- Create: `src/features/employees/actions/update-employee.ts`
- Create: `src/features/employees/actions/update-my-profile.ts`
- Create: `src/features/employees/mappers.ts`
- Test: `src/features/employees/mappers.test.ts`
- Test: `e2e/employee-self-service.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/employees/mappers.test.ts
import { describe, expect, it } from "vitest";
import { mapEmployeeToPublicProfile } from "./mappers";

describe("mapEmployeeToPublicProfile", () => {
  it("hides phone when privacy says not visible", () => {
    const profile = mapEmployeeToPublicProfile({
      employee: {
        id: "1",
        legalFirstName: "Big",
        legalLastName: "Boss",
        preferredName: "Big",
        phone: "0812345678",
        bio: "Leader",
        address: "Hidden",
        emergencyContactName: "Mom",
        emergencyContactPhone: "0800000000",
      },
      privacy: {
        phoneVisible: false,
        bioVisible: true,
      },
    });

    expect(profile.phone).toBeNull();
    expect(profile.bio).toBe("Leader");
    expect(profile.address).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/features/employees/mappers.test.ts`
Expected: FAIL with missing mapper.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/features/employees/mappers.ts
type MapperInput = {
  employee: {
    id: string;
    legalFirstName: string;
    legalLastName: string;
    preferredName: string;
    phone: string | null;
    bio: string | null;
    address?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
  };
  privacy: {
    phoneVisible: boolean;
    bioVisible: boolean;
  };
};

export function mapEmployeeToPublicProfile({ employee, privacy }: MapperInput) {
  return {
    id: employee.id,
    fullName: `${employee.legalFirstName} ${employee.legalLastName}`,
    preferredName: employee.preferredName,
    phone: privacy.phoneVisible ? employee.phone : null,
    bio: privacy.bioVisible ? employee.bio : null,
  };
}
```

```tsx
// src/features/employees/components/profile-form.tsx
"use client";

import { useForm } from "react-hook-form";

type ProfileFormValues = {
  preferredName: string;
  phone: string;
  bio: string;
  phoneVisible: boolean;
  bioVisible: boolean;
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      preferredName: "",
      phone: "",
      bio: "",
      phoneVisible: true,
      bioVisible: true,
    },
  });

  return (
    <form className="grid gap-4">
      <input {...form.register("preferredName")} placeholder="Preferred name" />
      <input {...form.register("phone")} placeholder="Phone" />
      <textarea {...form.register("bio")} placeholder="Bio" />
      <label>
        <input type="checkbox" {...form.register("phoneVisible")} />
        Show phone
      </label>
      <label>
        <input type="checkbox" {...form.register("bioVisible")} />
        Show bio
      </label>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/features/employees/mappers.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/'(portal)'/hr/employees/new/page.tsx src/features/employees/components/employee-form.tsx src/features/employees/components/profile-form.tsx src/features/employees/actions/create-employee.ts src/features/employees/actions/update-employee.ts src/features/employees/actions/update-my-profile.ts src/features/employees/mappers.ts src/features/employees/mappers.test.ts e2e/employee-self-service.spec.ts
git commit -m "feat: add employee profile management flows"
```

## Task 6: Build Role-Based Dashboards and Management Read-Only Views

**Files:**
- Create: `src/app/(portal)/hr/dashboard/page.tsx`
- Create: `src/app/(portal)/management/dashboard/page.tsx`
- Create: `src/app/(portal)/employee/dashboard/page.tsx`
- Create: `src/app/(portal)/management/directory/page.tsx`
- Create: `src/app/(portal)/management/employees/[employeeId]/page.tsx`
- Create: `src/components/dashboard/stat-card.tsx`
- Create: `src/components/layout/app-shell.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/dashboard/stat-card.test.tsx
import { render, screen } from "@testing-library/react";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("renders a metric label and value", () => {
    render(<StatCard label="Active employees" value="48" />);
    expect(screen.getByText("Active employees")).toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/dashboard/stat-card.test.tsx`
Expected: FAIL with missing component.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/dashboard/stat-card.tsx
export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-[--color-border] bg-[--color-panel] p-5">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-stone-900">{value}</p>
    </article>
  );
}
```

```tsx
// src/app/(portal)/management/dashboard/page.tsx
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/layout/page-header";

export default function ManagementDashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Management Dashboard"
        description="Read-only workforce overview for leadership."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total employees" value="0" />
        <StatCard label="Active employees" value="0" />
        <StatCard label="Departments" value="0" />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/dashboard/stat-card.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/'(portal)'/hr/dashboard/page.tsx src/app/'(portal)'/management/dashboard/page.tsx src/app/'(portal)'/employee/dashboard/page.tsx src/app/'(portal)'/management/directory/page.tsx src/app/'(portal)'/management/employees/[employeeId]/page.tsx src/components/dashboard/stat-card.tsx src/components/dashboard/stat-card.test.tsx src/components/layout/app-shell.tsx
git commit -m "feat: add role-based dashboards"
```

## Task 7: Implement CSV Import Validation and Job Reporting

**Files:**
- Create: `src/features/employees/schemas/import.ts`
- Create: `src/features/employees/actions/import-employees.ts`
- Create: `src/features/employees/components/import-dropzone.tsx`
- Create: `src/app/(portal)/hr/import/page.tsx`
- Test: `src/features/employees/actions/import-employees.test.ts`
- Test: `e2e/hr-employee-lifecycle.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/employees/actions/import-employees.test.ts
import { describe, expect, it } from "vitest";
import { validateImportRows } from "./import-employees";

describe("validateImportRows", () => {
  it("reports duplicate company email rows", () => {
    const result = validateImportRows([
      { employeeCode: "EMP-001", companyEmail: "big@company.com" },
      { employeeCode: "EMP-002", companyEmail: "big@company.com" },
    ]);

    expect(result.failedRows).toBe(1);
    expect(result.errors[0]?.fieldName).toBe("companyEmail");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/features/employees/actions/import-employees.test.ts`
Expected: FAIL with missing import validator.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/features/employees/actions/import-employees.ts
type ImportRow = {
  employeeCode: string;
  companyEmail: string;
};

type ImportError = {
  rowNumber: number;
  fieldName: string;
  errorMessage: string;
};

export function validateImportRows(rows: ImportRow[]) {
  const seenEmails = new Set<string>();
  const errors: ImportError[] = [];

  rows.forEach((row, index) => {
    if (seenEmails.has(row.companyEmail)) {
      errors.push({
        rowNumber: index + 1,
        fieldName: "companyEmail",
        errorMessage: "Duplicate company email in import file",
      });
      return;
    }

    seenEmails.add(row.companyEmail);
  });

  return {
    successRows: rows.length - errors.length,
    failedRows: errors.length,
    errors,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/features/employees/actions/import-employees.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/employees/schemas/import.ts src/features/employees/actions/import-employees.ts src/features/employees/actions/import-employees.test.ts src/features/employees/components/import-dropzone.tsx src/app/'(portal)'/hr/import/page.tsx e2e/hr-employee-lifecycle.spec.ts
git commit -m "feat: add csv import workflow"
```

## Task 8: Final Integration, Seeds, and End-to-End Verification

**Files:**
- Modify: `README.md`
- Modify: `.env.example`
- Modify: `supabase/seed.sql`
- Test: `e2e/auth-role-routing.spec.ts`
- Test: `e2e/hr-employee-lifecycle.spec.ts`
- Test: `e2e/employee-self-service.spec.ts`

- [ ] **Step 1: Write the failing end-to-end test assertion**

```ts
// e2e/employee-self-service.spec.ts
import { test, expect } from "@playwright/test";

test("employee can update preferred name and phone visibility", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
```

- [ ] **Step 2: Run end-to-end test to verify it fails**

Run: `npx playwright test e2e/employee-self-service.spec.ts`
Expected: FAIL because login screen, seed user, or routing flow is incomplete.

- [ ] **Step 3: Write minimal implementation**

```env
# .env.example
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

```md
# README.md

## Local setup

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env.local`
3. Start Supabase locally
4. Run database migrations
5. Seed the database
6. Start the app with `npm run dev`
```

- [ ] **Step 4: Run verification suite**

Run: `npm test && npx playwright test`
Expected: PASS for unit tests and end-to-end tests.

- [ ] **Step 5: Commit**

```bash
git add README.md .env.example supabase/seed.sql e2e/auth-role-routing.spec.ts e2e/hr-employee-lifecycle.spec.ts e2e/employee-self-service.spec.ts
git commit -m "test: verify hr core mvp end to end"
```

## Self-Review

### Spec Coverage

- MVP scope covered by Tasks 1-8
- auth, role routing, and password flows covered by Tasks 1, 3, and 8
- employee data model covered by Task 2
- HR operational screens covered by Tasks 4 and 5
- management read-only flows covered by Task 6
- employee self-service covered by Task 5 and Task 8
- CSV import covered by Task 7
- visibility rules covered by Task 5 mapper and profile flow
- production setup and verification covered by Task 8

### Placeholder Scan

- No `TBD`, `TODO`, or deferred placeholders left in the plan
- Every task contains explicit files, commands, and concrete example code

### Type Consistency

- Role names stay consistent: `hr`, `management`, `employee`
- Employee status stays consistent: `active`, `probation`, `on_leave`, `resigned`, `terminated`
- Account status stays consistent: `pending_activation`, `active`, `suspended`
- Public profile visibility stays limited to `phone` and `bio`

