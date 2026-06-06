import type { ReactNode } from "react";
import { PageHeader } from "../../../../../components/layout/page-header";
import { updateEmployee } from "../../../../../features/employees/actions/update-employee";
import { ProfileForm } from "../../../../../features/employees/components/profile-form";
import { getEmployeeById } from "../../../../../features/employees/queries";

type EmployeeDetailPageProps = {
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

export default async function EmployeeDetailPage({
  params,
}: EmployeeDetailPageProps) {
  const { employeeId } = await params;
  const employee = await getEmployeeById(employeeId);

  return (
    <section className="space-y-6">
      <PageHeader
        title={employee?.name ?? `Employee ${employeeId}`}
        description="Review master profile details, reporting lines, and employment metadata."
      />

      <div className="flex flex-wrap gap-3 text-sm text-stone-600">
        <span className="rounded-full border border-[--color-border] bg-[--color-panel] px-4 py-2">
          {employee?.status ?? "Profile placeholder"}
        </span>
        <span className="rounded-full border border-[--color-border] bg-[--color-panel] px-4 py-2">
          {employee?.department ?? "Department pending"}
        </span>
        <span className="rounded-full border border-[--color-border] bg-[--color-panel] px-4 py-2">
          {employee?.title ?? "Title pending"}
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <DetailCard title="Profile overview">
          <dl>
            <DetailRow label="Employee ID" value={employeeId} />
            <DetailRow
              label="Work email"
              value={employee?.email ?? "Not connected yet"}
            />
            <DetailRow
              label="Manager"
              value={employee?.manager ?? "Manager relationship pending"}
            />
            <DetailRow
              label="Location"
              value={employee?.location ?? "Location pending"}
            />
            <DetailRow
              label="Start date"
              value={employee?.startDate ?? "Start date pending"}
            />
          </dl>
        </DetailCard>

        <DetailCard title="HR actions queue">
          <ProfileForm
            action={updateEmployee}
            submitLabel="Save HR profile changes"
            defaultValues={{
              employeeId,
              actorUserId: "hr-user",
              targetUserId: employeeId,
              legalFirstName: employee?.name?.split(" ")[0] ?? "Employee",
              legalLastName: employee?.name?.split(" ").slice(1).join(" ") ?? "",
              preferredName: employee?.name ?? `Employee ${employeeId}`,
              phone: "",
              address: employee?.location ?? "",
              emergencyContactName: "",
              emergencyContactPhone: "",
              bio: "",
              phoneVisible: false,
              bioVisible: true,
            }}
          />
        </DetailCard>
      </div>
    </section>
  );
}
