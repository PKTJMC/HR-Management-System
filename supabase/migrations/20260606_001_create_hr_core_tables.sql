create extension if not exists pgcrypto;

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
