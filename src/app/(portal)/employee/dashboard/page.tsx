import Link from "next/link";
import { StatCard } from "../../../../components/dashboard/stat-card";
import { AppShell } from "../../../../components/layout/app-shell";
import { PageHeader } from "../../../../components/layout/page-header";
import { getEmployeeById } from "../../../../features/employees/queries";

function SelfServiceLink({
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

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[--color-border] py-3 last:border-b-0 md:flex-row md:items-center md:justify-between">
      <dt className="text-sm font-medium text-stone-600">{label}</dt>
      <dd className="text-sm text-[--color-fg]">{value}</dd>
    </div>
  );
}

export default async function EmployeeDashboardPage() {
  const employee = await getEmployeeById("employee-self");

  return (
    <AppShell roleLabel="Employee">
      <section className="space-y-6">
        <PageHeader
          title="Employee Dashboard"
          description="Self-service overview for your company profile, employment status, and the next places you can safely manage yourself."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Profile status"
            value={employee?.status ?? "Pending"}
            description="Current company profile status from the employee registry scaffold."
          />
          <StatCard
            label="Employment type"
            value={employee?.employmentType ?? "Unknown"}
            description="High-level employment classification visible to you."
          />
          <StatCard
            label="Manager"
            value={employee?.manager ?? "Not assigned"}
            description="Reporting line snapshot for quick reference."
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <section className="rounded-3xl border border-[--color-border] bg-[--color-panel] p-5">
            <h2 className="text-lg font-semibold text-[--color-fg]">
              Profile summary
            </h2>
            <dl className="mt-4">
              <SummaryRow
                label="Preferred name"
                value={employee?.preferredName ?? "Not added yet"}
              />
              <SummaryRow
                label="Company email"
                value={employee?.email ?? "Not connected yet"}
              />
              <SummaryRow
                label="Department"
                value={employee?.department ?? "Department pending"}
              />
              <SummaryRow
                label="Join date"
                value={employee?.startDate ?? "Join date pending"}
              />
            </dl>
          </section>

          <section className="space-y-4">
            <SelfServiceLink
              href="/employee/profile"
              title="My Profile"
              description="Update your personal profile details and visibility settings."
            />
            <SelfServiceLink
              href="/employee/dashboard#directory"
              title="Directory"
              description="Shared employee directory access will attach here once the employee entry route is added."
            />
          </section>
        </div>

        <section
          id="directory"
          className="rounded-3xl border border-dashed border-[--color-border] bg-[--color-panel] p-5"
        >
          <h2 className="text-lg font-semibold text-[--color-fg]">
            Directory access status
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            The visibility policy already allows employee directory access, but
            this MVP still needs a dedicated employee-facing route. This
            placeholder keeps the dashboard honest instead of pretending that
            route already exists.
          </p>
        </section>
      </section>
    </AppShell>
  );
}
