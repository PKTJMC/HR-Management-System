insert into departments (id, name, code, status)
values
  ('11111111-1111-4111-8111-111111111111', 'Human Resources', 'HR', 'active'),
  ('22222222-2222-4222-8222-222222222222', 'Engineering', 'ENG', 'active'),
  ('33333333-3333-4333-8333-333333333333', 'Finance', 'FIN', 'active')
on conflict (id) do nothing;

insert into job_titles (id, name, code, status)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'HR Manager', 'HR_MANAGER', 'active'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Software Engineer', 'SWE', 'active'),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Finance Analyst', 'FIN_ANALYST', 'active')
on conflict (id) do nothing;
