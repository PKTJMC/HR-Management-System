import { PageHeader } from "../../../../components/layout/page-header";
import { EmployeeFilters } from "../../../../features/employees/components/employee-filters";
import { EmployeeTable } from "../../../../features/employees/components/employee-table";
import { listEmployees } from "../../../../features/employees/queries";

export default async function EmployeesPage() {
  const rows = await listEmployees();

  return (
    <section className="space-y-6">
      <PageHeader
        title="Employee Directory"
        description="Search, filter, and manage employee master records."
      />
      <EmployeeFilters />
      <EmployeeTable rows={rows} />
    </section>
  );
}
