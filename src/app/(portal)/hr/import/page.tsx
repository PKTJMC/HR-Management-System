import { AppShell } from "../../../../components/layout/app-shell";
import { PageHeader } from "../../../../components/layout/page-header";
import { importEmployees } from "../../../../features/employees/actions/import-employees";
import { ImportDropzone } from "../../../../features/employees/components/import-dropzone";

const requiredColumns = [
  "employeeCode",
  "legalFirstName",
  "legalLastName",
  "preferredName",
  "companyEmail",
  "departmentId",
  "jobTitleId",
  "employmentType",
  "joinDate",
  "employmentStatus",
];

export default function HrImportPage() {
  return (
    <AppShell roleLabel="HR">
      <section className="space-y-6">
        <PageHeader
          title="Employee CSV Import"
          description="Validate employee onboarding files before persistence. HR-only access, server-side validation, and row-level error reporting."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <ImportDropzone action={importEmployees} />

          <aside className="space-y-6 rounded-3xl border border-[--color-border] bg-[--color-panel] p-6">
            <div>
              <p className="text-sm font-semibold text-[--color-fg]">
                Required CSV columns
              </p>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                {requiredColumns.map((column) => (
                  <li key={column} className="rounded-2xl border border-[--color-border] bg-white px-3 py-2 font-mono text-xs text-stone-700">
                    {column}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[--color-border] bg-white p-4 text-sm leading-6 text-stone-600">
              <p className="font-semibold text-[--color-fg]">Reality check</p>
              <p className="mt-2">
                This screen validates structure, duplicates, and field-level schema only.
                It does not create users, write employee records, send invites, or queue background jobs yet.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
