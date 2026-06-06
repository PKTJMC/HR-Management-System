type EmployeeFormActionResult = unknown;

export type EmployeeFormAction = (
  formData: FormData,
) => EmployeeFormActionResult | Promise<EmployeeFormActionResult>;

type EmployeeFormValues = {
  employeeCode: string;
  legalFirstName: string;
  legalLastName: string;
  preferredName: string;
  companyEmail: string;
  departmentId: string;
  jobTitleId: string;
  employmentType: "full_time" | "part_time" | "contract" | "intern";
  joinDate: string;
  employmentStatus:
    | "active"
    | "probation"
    | "on_leave"
    | "resigned"
    | "terminated";
};

type EmployeeFormProps = {
  action: EmployeeFormAction;
  defaultValues?: Partial<EmployeeFormValues>;
  submitLabel?: string;
};

const defaultDepartmentId = "11111111-1111-4111-8111-111111111111";
const defaultJobTitleId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

export function EmployeeForm({
  action,
  defaultValues,
  submitLabel = "Save employee",
}: EmployeeFormProps) {
  return (
    <form
      action={action as never}
      className="grid gap-6 rounded-3xl border border-[--color-border] bg-[--color-panel] p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Employee code
          <input
            name="employeeCode"
            defaultValue={defaultValues?.employeeCode ?? ""}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Work email
          <input
            name="companyEmail"
            type="email"
            defaultValue={defaultValues?.companyEmail ?? ""}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Legal first name
          <input
            name="legalFirstName"
            defaultValue={defaultValues?.legalFirstName ?? ""}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Legal last name
          <input
            name="legalLastName"
            defaultValue={defaultValues?.legalLastName ?? ""}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Preferred name
          <input
            name="preferredName"
            defaultValue={defaultValues?.preferredName ?? ""}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Join date
          <input
            name="joinDate"
            type="date"
            defaultValue={defaultValues?.joinDate ?? ""}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Department
          <select
            name="departmentId"
            defaultValue={defaultValues?.departmentId ?? defaultDepartmentId}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          >
            <option value={defaultDepartmentId}>People Operations</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Job title
          <select
            name="jobTitleId"
            defaultValue={defaultValues?.jobTitleId ?? defaultJobTitleId}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          >
            <option value={defaultJobTitleId}>HR Manager</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Employment type
          <select
            name="employmentType"
            defaultValue={defaultValues?.employmentType ?? "full_time"}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          >
            <option value="full_time">Full time</option>
            <option value="part_time">Part time</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Employment status
          <select
            name="employmentStatus"
            defaultValue={defaultValues?.employmentStatus ?? "active"}
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          >
            <option value="active">Active</option>
            <option value="probation">Probation</option>
            <option value="on_leave">On leave</option>
            <option value="resigned">Resigned</option>
            <option value="terminated">Terminated</option>
          </select>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-[--color-fg] px-5 py-3 text-sm font-semibold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
