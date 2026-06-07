import Link from "next/link";
import { StatCard } from "../../../../components/dashboard/stat-card";
import { AppShell } from "../../../../components/layout/app-shell";
import { PageHeader } from "../../../../components/layout/page-header";
import { listEmployees } from "../../../../features/employees/queries";
import type { EmployeeDirectoryFilters } from "../../../../features/employees/types";

function ReadOnlyAction({
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

export default async function ManagementDashboardPage() {
  const filters: EmployeeDirectoryFilters = {
    searchQuery: "",
    department: "all",
    status: "all",
  };
  const employees = await listEmployees(filters);
  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;
  const departments = new Set(employees.map((employee) => employee.department));

  return (
    <AppShell roleLabel="Management">
      <section className="space-y-6">
        <PageHeader
          title="Management Dashboard"
          description="Read-only team visibility for headcount, org context, and public company profile details only."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Visible employees"
            value={String(employees.length)}
            description="Employees currently exposed through the read-only company directory."
          />
          <StatCard
            label="Active employees"
            value={String(activeEmployees)}
            description="Operational headcount view without HR-only metadata."
          />
          <StatCard
            label="Departments covered"
            value={String(departments.size)}
            description="Distinct departments represented in the shared directory scaffold."
          />
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[--color-fg]">
            Read-only management views
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ReadOnlyAction
              href="/management/directory"
              title="Browse company directory"
              description="Review employee profiles through the management-safe visibility policy."
            />
            <ReadOnlyAction
              href="/management/employees/employee-self"
              title="Open sample employee profile"
              description="Inspect the public company profile fields that management can see."
            />
          </div>
        </section>
      </section>
    </AppShell>
  );
}
