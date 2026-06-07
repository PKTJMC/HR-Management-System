import type { ReactNode } from "react";
import { AppShell } from "../../../../../components/layout/app-shell";
import { PageHeader } from "../../../../../components/layout/page-header";
import { getEmployeeById } from "../../../../../features/employees/queries";

type ManagementEmployeeDetailPageProps = {
  params: Promise<{
    employeeId: string;
  }>;
};

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[--color-border] bg-[--color-panel] p-5">
      <h2 className="text-lg font-semibold text-[--color-fg]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DetailRow({
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function ManagementEmployeeDetailPage({
  params,
}: ManagementEmployeeDetailPageProps) {
  const { employeeId } = await params;
  const employee = await getEmployeeById(employeeId);

  const publicBio =
    employee?.isBioPublic && employee.bio ? employee.bio : "No public bio shared.";
  const displayName = employee?.name ?? `Employee ${employeeId}`;
  const legalName = employee?.legalName ?? displayName;
  const preferredName = employee?.preferredName ?? displayName;

  return (
    <AppShell roleLabel="Management">
      <section className="space-y-6">
        <PageHeader
          title={displayName}
          description="Read-only company profile view for management. Sensitive HR and personal contact fields are intentionally excluded."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <DetailCard title="Company profile">
            <div className="flex items-center gap-4 border-b border-[--color-border] pb-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[--color-border] bg-white text-lg font-semibold text-[--color-accent-strong]">
                {getInitials(displayName)}
              </div>
              <div>
                <p className="text-lg font-semibold text-[--color-fg]">
                  {displayName}
                </p>
                <p className="text-sm text-stone-600">
                  Public profile image placeholder
                </p>
              </div>
            </div>

            <dl className="mt-4">
              <DetailRow label="Legal name" value={legalName} />
              <DetailRow label="Preferred name" value={preferredName} />
              <DetailRow
                label="Employee code"
                value={employee?.employeeCode ?? "Unavailable"}
              />
              <DetailRow
                label="Company email"
                value={employee?.email ?? "Not connected yet"}
              />
              <DetailRow
                label="Department"
                value={employee?.department ?? "Department pending"}
              />
              <DetailRow label="Title" value={employee?.title ?? "Title pending"} />
              <DetailRow
                label="Manager"
                value={employee?.manager ?? "Manager relationship pending"}
              />
              <DetailRow
                label="Employment type"
                value={employee?.employmentType ?? "Type pending"}
              />
              <DetailRow
                label="Join date"
                value={employee?.startDate ?? "Join date pending"}
              />
              <DetailRow
                label="Employment status"
                value={employee?.status ?? "Status pending"}
              />
            </dl>
          </DetailCard>

          <DetailCard title="Public bio">
            <p className="text-sm leading-6 text-stone-700">{publicBio}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-stone-500">
              Read-only view
            </p>
          </DetailCard>
        </div>
      </section>
    </AppShell>
  );
}
