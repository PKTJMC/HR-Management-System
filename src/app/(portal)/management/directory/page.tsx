import { AppShell } from "../../../../components/layout/app-shell";
import { PageHeader } from "../../../../components/layout/page-header";
import { EmployeeFilters } from "../../../../features/employees/components/employee-filters";
import { EmployeeTable } from "../../../../features/employees/components/employee-table";
import { listEmployees } from "../../../../features/employees/queries";
import type { EmployeeDirectoryFilters } from "../../../../features/employees/types";

export default async function ManagementDirectoryPage() {
  const filters: EmployeeDirectoryFilters = {
    searchQuery: "",
    department: "all",
    status: "all",
  };
  const rows = await listEmployees(filters);

  return (
    <AppShell roleLabel="Management">
      <section className="space-y-6">
        <PageHeader
          title="Company Directory"
          description="Read-only directory access for management. Public company profile data only, with HR-only fields stripped out."
        />
        <EmployeeFilters />
        <EmployeeTable rows={rows} detailHrefBase="/management/employees" />
      </section>
    </AppShell>
  );
}
