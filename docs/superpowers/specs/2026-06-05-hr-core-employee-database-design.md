# HR Management System MVP Design

## 1. Overview

This MVP focuses on `Core HR Employee Database + Profile Management` as the foundation of the HR Management System.

The product direction is:

- `Admin-first HRIS with Employee Self-Service`

This means the system prioritizes:

- data integrity
- employee master records
- role-based access control
- org structure
- safe profile self-service

This MVP does **not** try to build the full HR platform in one shot. It intentionally excludes:

- leave workflow engine
- document request workflow
- digital signatures
- employee social feed
- payroll
- tax/legal document vault
- client invoice workflow

Those are future phases. This MVP exists to create a stable, production-safe employee data foundation first.

## 2. Product Scope

### Included in MVP

- employee database
- employee profile management
- role-based login
- role-based dashboards
- HR employee management
- management read-only employee access
- employee self-service profile editing
- org structure
- employee directory with advanced search and filters
- CSV employee import
- temporary password flow
- forced password change on first login
- forgot password
- soft deactivation only

### Excluded from MVP

- leave requests and approvals
- document request and issuance workflows
- news/announcement publishing
- department feed/community board
- client tax/invoice operations
- document attachments
- salary data
- legal/tax/personal identity document storage

## 3. User Roles

### HR

HR has full access to the MVP operational scope:

- create employees
- edit employees
- change employee status
- manage account states
- import CSV
- view all employee data included in MVP

### Management

Management has read-only access to company employee data in a production-safe way:

- view directory
- search and filter employees
- view org structure
- view employee profiles in read-only mode

Management cannot:

- create employees
- edit employees
- import CSV
- reset other users
- view HR-only operational/security data

### Employee

Employees can:

- log in
- change password
- reset forgotten password
- view their own full profile
- edit only allowed profile fields
- control simple visibility settings for selected public fields
- browse the employee directory

Employees cannot:

- modify employee master fields
- change org structure
- change role or account status
- view hidden/private data of other employees

## 4. Architecture Flow

The technical flow for the system is:

- `User -> UI -> API -> Server -> Database -> Response -> UI`

### User

The user is one of three roles:

- HR
- Management
- Employee

### UI

The UI is the web application interface where users:

- log in
- navigate dashboards
- search employees
- edit profile data
- upload CSV files

### API

The API receives requests such as:

- login
- password reset
- create employee
- update employee
- update own profile
- fetch directory
- import CSV

### Server

The server is responsible for:

- authentication
- authorization
- validation
- field-level permission checks
- business rules
- import processing
- response shaping by role

### Database

The database stores:

- accounts
- employee profiles
- departments
- job titles
- manager relationships
- privacy settings
- CSV import records

### Response

The server returns:

- success results
- validation errors
- unauthorized responses
- filtered profile data based on role and visibility rules

### UI Return

The UI then presents:

- dashboards
- directories
- profile details
- inline form feedback
- loading/error/empty states

## 5. Module Boundaries

The MVP is divided into clear modules:

### Authentication

- login
- temporary password support
- forced password change on first login
- forgot password
- account activation state handling

### Authorization

- role-based route access
- field-level edit restrictions
- response filtering by role

### Employee Master

- primary employee record management
- create/update/status changes

### Org Structure

- departments
- job titles
- reporting line
- manager relationships

### Directory and Search

- employee listing
- search
- advanced filters
- role-aware profile access

### Profile Management

- HR edits full MVP profile
- employee edits allowed self-service fields
- privacy settings

### CSV Import

- template download
- upload
- validation
- duplicate checks
- partial success handling
- import result reporting

### Dashboard

- role-based entry experience for HR, Management, and Employee

## 6. Screen Flows

### HR Portal

Required screens:

- Login
- Force Change Password
- HR Dashboard
- Employee Directory
- Employee Detail
- Create Employee
- Edit Employee
- CSV Import
- Import Result
- My Account

#### HR Dashboard

Should show:

- total employees
- counts by employee status
- pending activation accounts
- recently created or updated employees
- quick actions:
  - add employee
  - import CSV
  - view directory

#### HR Directory

Must support:

- search by name, email, employee code
- filters by department, employee status, title, manager, employment type, join date
- actions:
  - view detail
  - edit employee
  - change status

No hard delete action is allowed.

#### HR Employee Detail

Profile sections:

- basic info
- work info
- org structure
- contact info
- emergency contact
- privacy snapshot
- account status

#### CSV Import

Flow:

- download CSV template
- upload file
- validate rows
- preview issues
- import valid records
- show summary

### Management Portal

Required screens:

- Login
- Force Change Password
- Management Dashboard
- Employee Directory
- Employee Detail (read-only)
- My Account

#### Management Dashboard

Should show:

- total employees
- headcount by department
- headcount by employee status
- shortcut to directory
- basic org structure overview

#### Management Directory

Same search and filters as HR, but fully read-only.

### Employee Portal

Required screens:

- Login
- Force Change Password
- Employee Dashboard
- My Profile
- Edit My Profile
- Directory
- View Other Employee Profile
- My Account

#### Employee Dashboard

Should show:

- profile summary
- account state summary
- shortcut to edit profile
- shortcut to change password
- shortcut to directory

#### Editable Fields for Employees

Employees can edit:

- profile image
- preferred name
- phone
- address
- emergency contact
- bio
- privacy settings

Employees cannot edit:

- employee code
- legal name
- department
- job title
- manager
- employment type
- join date
- employee status

### Shared System Screens

All roles need:

- login
- first login password reset
- forgot password
- unauthorized page
- not found page
- loading states
- empty states
- success/error feedback

## 7. Business Data Model

### Primary Entities

- `users`
- `employees`
- `departments`
- `job_titles`
- `employee_manager_relations`
- `employee_privacy_settings`
- `csv_import_jobs`
- `csv_import_job_errors`

### users

Purpose:

- account and security data

Fields:

- `id`
- `employee_id`
- `email`
- `password_hash`
- `role`
- `account_status`
- `must_change_password`
- `last_login_at`
- `created_at`
- `updated_at`

Role values:

- `hr`
- `management`
- `employee`

Account status values:

- `pending_activation`
- `active`
- `suspended`

### employees

Purpose:

- employee master profile

Fields:

- `id`
- `employee_code`
- `legal_first_name`
- `legal_last_name`
- `preferred_name`
- `profile_image_url`
- `company_email`
- `phone`
- `department_id`
- `job_title_id`
- `employment_type`
- `join_date`
- `employment_status`
- `address`
- `emergency_contact_name`
- `emergency_contact_phone`
- `bio`
- `created_by_user_id`
- `updated_by_user_id`
- `created_at`
- `updated_at`

Employment type examples:

- `full_time`
- `part_time`
- `contract`
- `intern`

Employment status values:

- `active`
- `probation`
- `on_leave`
- `resigned`
- `terminated`

### departments

Fields:

- `id`
- `name`
- `code`
- `status`
- `created_at`
- `updated_at`

### job_titles

Fields:

- `id`
- `name`
- `code`
- `status`
- `created_at`
- `updated_at`

### employee_manager_relations

Fields:

- `id`
- `employee_id`
- `manager_employee_id`
- `is_primary`
- `created_at`
- `updated_at`

This design uses a relation table instead of embedding a single manager field directly in `employees` to keep future org growth flexible.

### employee_privacy_settings

Fields:

- `id`
- `employee_id`
- `phone_visible`
- `bio_visible`
- `created_at`
- `updated_at`

Note:

- `address` and `emergency_contact` are intentionally not public-toggle fields in the final policy for this MVP

### csv_import_jobs

Fields:

- `id`
- `uploaded_by_user_id`
- `file_name`
- `total_rows`
- `success_rows`
- `failed_rows`
- `job_status`
- `started_at`
- `completed_at`
- `created_at`
- `updated_at`

Job status values:

- `uploaded`
- `validated`
- `completed`
- `failed`

### csv_import_job_errors

Fields:

- `id`
- `import_job_id`
- `row_number`
- `field_name`
- `error_message`
- `raw_value`
- `created_at`

## 8. Permission Matrix

### HR Permissions

Allowed:

- login
- change own password
- reset other users when needed
- create employees
- edit employees
- view all employee data included in MVP
- import CSV
- view import results
- change employee status
- change account status
- view privacy settings
- view org structure

Blocked:

- hard delete employee

### Management Permissions

Allowed:

- login
- change own password
- view employee directory
- search and filter employees
- view employee profile in read-only mode
- view org structure

Blocked:

- create employee
- edit employee
- import CSV
- change account status
- reset other users
- view HR-only data

### Employee Permissions

Allowed:

- login
- change own password
- forgot password
- view own full profile
- edit allowed profile fields
- manage allowed visibility settings
- view employee directory public profiles

Blocked:

- edit employee master fields
- edit org structure
- edit roles
- edit account status
- view hidden/private data of others

## 9. Visibility Rules

### Public Company Profile

Visible to all company users by default:

- profile image
- legal name
- preferred name
- job title
- department
- company email
- manager
- employment status
- join date
- bio if visible

### Employee-Controlled Visibility

Employee can toggle:

- `phone`
- `bio`

### HR-and-Self Only

Visible only to HR and the profile owner:

- `address`
- `emergency_contact_name`
- `emergency_contact_phone`

### HR Operational Data

Visible only to HR:

- account status
- must change password
- created/updated metadata
- import traces

### Security Data

System-only or tightly restricted:

- password hash
- reset tokens
- auth metadata

## 10. Search and Filter Rules

Directory search must support:

- name
- company email
- employee code

Directory filters must support:

- department
- employee status
- job title
- manager
- employment type
- join date

This should be designed as server-side query logic, not purely client-side filtering of large datasets.

## 11. Employee Lifecycle Rules

- employee records are never hard-deleted in MVP
- offboarding is handled through status changes
- resigned or terminated employees can be blocked from login based on account state
- account suspension does not remove employee data

## 12. Authentication and Account Rules

- login identifier is company email
- HR creates account with temporary password
- new users must change password on first login
- forgot password must exist from MVP
- account states must include:
  - `pending_activation`
  - `active`
  - `suspended`

## 13. CSV Import Rules

The system must support:

- downloadable template
- field validation before insert
- duplicate checks for employee code and company email
- row-level error reporting
- partial success import
- import history

Import must not write invalid rows directly into employee master records without validation.

## 14. Technology Recommendation

Recommended stack:

- `Next.js App Router`
- `TypeScript`
- `Tailwind CSS`
- `shadcn/ui`
- `Supabase Auth`
- `Supabase Postgres`
- `React Hook Form`
- `Zod`
- `Lucide React`
- `Vercel` for deployment

### Why this stack

- suitable for a non-engineer founder/operator working with AI
- fast to scaffold
- strong enough for internal production MVP
- good ecosystem for auth, dashboard UI, forms, and role-based flows
- easier to deploy and maintain than a more custom backend-heavy setup

### Why not the main alternatives

#### Next.js + Prisma + PostgreSQL + Auth.js

Good, but more engineering-heavy and slower for this stage.

#### Firebase + Next.js

Too weak for this product's relational data model and long-term query needs.

## 15. Production Constraints

### Authentication and Authorization

- role checks must happen server-side
- ownership checks must happen server-side
- route access cannot depend on hidden frontend navigation alone

### Validation

- validate on both client and server
- CSV import must validate before write
- enforce unique employee code and company email

### Error Handling

The MVP must include:

- form validation errors
- unauthorized responses
- empty states
- loading states
- import error reporting
- reset-password failure handling
- partial import failure handling

### Performance

- directory should support server-driven pagination or query limits
- filtering should be query-based, not fetch-all on the client
- dashboard aggregates should be deliberate and efficient

### Environment Separation

- separate local, staging, and production environments
- no hardcoded secrets
- use `.env.local` for local development
- use Vercel and Supabase environment management for production

### Security

- do not expose restricted fields from API responses
- enforce RBAC consistently
- use soft deactivation only
- restrict editable fields by role
- keep the architecture ready for audit logging in later phases

## 16. UX and Design Direction

The product should follow the established project guidance:

- clear role separation
- modular component architecture
- reusable tokens and patterns
- strong spacing hierarchy
- production-safe data presentation
- accessible, responsive admin and employee experiences

Relevant design principles already agreed for this project:

- `ui-ux-pro-max`: UX quality, accessibility, hierarchy, clarity, feedback
- `frontend-design`: distinctive but intentional product UI, not generic AI-looking output
- `rad-spacing`: hierarchical spacing using 4px/8px system and nesting depth
- `uui-style`: componentized, accessible UI system using Tailwind and reusable patterns

## 17. Final Recommendation

Build the project as:

- `Admin-first HRIS with Employee Self-Service`

Start with the following implementation priority:

1. authentication and route protection
2. employee master data model
3. role-based dashboards
4. HR employee directory and detail views
5. employee self-profile and edit flow
6. management read-only directory
7. CSV import

This order keeps the system stable and avoids building attractive but structurally weak features first.
