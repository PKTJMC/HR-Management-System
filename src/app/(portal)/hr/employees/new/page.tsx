import { PageHeader } from "../../../../../components/layout/page-header";
import { createEmployee } from "../../../../../features/employees/actions/create-employee";
import { EmployeeForm } from "../../../../../features/employees/components/employee-form";

export default function NewEmployeePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Create Employee"
        description="Capture a new employee master record before downstream modules connect."
      />
      <EmployeeForm action={createEmployee} />
    </section>
  );
}
