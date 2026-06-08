# HR Management System

Internal MVP repository for a role-based HR platform with separate experiences for HR, Management, and Employees.

This project is currently focused on the first product slice:

`Core HR Employee Database + Profile Management`

## Overview

The long-term product vision includes three clearly separated areas:

1. HR workspace
2. Management workspace
3. Employee workspace

The current MVP is intentionally narrower. Right now, the repository is focused on the employee data foundation and profile workflows needed before more complex modules like approvals, documents, or company-wide social/community features.

## Current MVP Scope

Included in the current implementation direction:

- Employee directory
- Employee profile management
- Basic org structure handling
- HR-managed account creation flow
- Temporary password and forced password-change concept
- Forgot password concept
- Role-based access scaffolding for HR, Management, and Employee
- Employee self-service editing for limited profile fields
- Management-safe read-only employee views with data redaction
- HR CSV import validation flow

Not included as production-ready yet:

- Real authentication
- Real database integration
- Persistent CSV import into a database
- Leave approval workflows
- Document signing workflows
- Internal social feed / community board
- Production security hardening

## Current Status

Built so far:

1. App foundation with Next.js App Router
2. Employee schema, mapping, and validation layer
3. Role and route-guard scaffolding
4. HR employee directory and employee detail scaffolds
5. Employee profile update flow
6. Management redaction fix with regression coverage
7. HR CSV import validation scaffold

Latest known task status:

- Task 6: Complete
- Task 7: Complete
- Task 8: Not started

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zod
- Vitest

Planned later:

- Supabase
- Vercel

## Repository Structure

```text
src/
  app/
    (portal)/
      employee/
      hr/
      management/
  components/
    dashboard/
    layout/
  features/
    employees/
      actions/
      components/
      lib/
      schemas/
  lib/
    auth/
docs/
  codex-session-brief.md
  superpowers/
```

## Important Notes

- This repository is not production-ready yet.
- Authentication is still mock/scaffold level.
- Sensitive HR data rules are already being considered in the architecture, but the system is not hardened for real production use yet.
- No secrets should ever be hardcoded into the codebase.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Create a production build locally:

```bash
npm run build
```

## Key Reference Files

Project instructions and working rules:

- `/Users/martinfranck/Documents/HR-Management-System/AGENTS.md`

Current Codex onboarding brief:

- `/Users/martinfranck/Documents/HR-Management-System/docs/codex-session-brief.md`

Core product/design spec:

- `/Users/martinfranck/Documents/HR-Management-System/docs/superpowers/specs/2026-06-05-hr-core-employee-database-design.md`

Execution plan:

- `/Users/martinfranck/Documents/HR-Management-System/docs/superpowers/plans/2026-06-06-hr-core-employee-database-plan.md`

## Next Focus

The next implementation step should continue from the existing MVP plan rather than jumping into advanced modules too early. The main risk right now is not lack of features. The main risk is building too many surface features before the data model, permission model, and profile workflows are stable enough.
