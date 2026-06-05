insert into departments (id, name, code, status)
values
  ('11111111-1111-1111-1111-111111111111', 'Human Resources', 'HR', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'Engineering', 'ENG', 'active'),
  ('33333333-3333-3333-3333-333333333333', 'Finance', 'FIN', 'active')
on conflict (id) do nothing;

insert into job_titles (id, name, code, status)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'HR Manager', 'HR_MANAGER', 'active'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Software Engineer', 'SWE', 'active'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Finance Analyst', 'FIN_ANALYST', 'active')
on conflict (id) do nothing;
