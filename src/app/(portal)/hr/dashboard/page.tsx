import Link from "next/link";
import { StatCard } from "../../../../components/dashboard/stat-card";
import { AppShell } from "../../../../components/layout/app-shell";
import { PageHeader } from "../../../../components/layout/page-header";
import { listEmployees } from "../../../../features/employees/queries";
import type { EmployeeDirectoryFilters } from "../../../../features/employees/types";

function QuickActionLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[--color-border] bg-[--color-panel] p-5 transition hover:border-[--color-accent] hover:bg-white"
    >
      <p className="text-base font-semibold text-[--color-fg]">{title}</p>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
    </Link>
  );
}

export default async function HrDashboardPage() {
  const filters: EmployeeDirectoryFilters = {
    searchQuery: "",
    department: "all",
    status: "all",
  };
  const employees = await listEmployees(filters);
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;
  const pendingActivation = employees.filter(
    (employee) => employee.status === "Pending activation",
  ).length;

  return (
    <AppShell roleLabel="HR">
      <section className="space-y-6">
        <PageHeader
          title="HR Dashboard"
          description="Track employee record readiness, activation backlog, and the next operational actions without pretending this is analytics."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Total employees"
            value={String(totalEmployees)}
            description="Directory records currently available in the mock-safe employee registry."
          />
          <StatCard
            label="Active employees"
            value={String(activeEmployees)}
            description="Employees with an active company profile status."
          />
          <StatCard
            label="Pending activation"
            value={String(pendingActivation)}
            description="Placeholder count for profiles still waiting on activation or setup."
          />
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[--color-fg]">
            Quick actions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <QuickActionLink
              href="/hr/employees"
              title="Open employee directory"
              description="Review company records, search employees, and move into profile maintenance."
            />
            <QuickActionLink
              href="/hr/employees/new"
              title="Create employee record"
              description="Launch the HR intake scaffold for a new employee profile."
            />
          </div>
        </section>
      </section>
    </AppShell>
  );
}
