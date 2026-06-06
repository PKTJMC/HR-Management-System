export function EmployeeFilters() {
  return (
    <section
      aria-label="Employee filters"
      className="grid gap-4 rounded-3xl border border-[--color-border] bg-[--color-panel] p-5 md:grid-cols-3"
    >
      <label className="space-y-2 text-sm font-medium text-stone-700">
        Search employees
        <input
          type="search"
          name="employee-search"
          placeholder="Search by name, ID, or email"
          className="w-full rounded-2xl border border-[--color-border] bg-white px-4 py-3 text-sm outline-none transition focus:border-[--color-accent]"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-stone-700">
        Department
        <select
          name="department"
          defaultValue="all"
          className="w-full rounded-2xl border border-[--color-border] bg-white px-4 py-3 text-sm outline-none transition focus:border-[--color-accent]"
        >
          <option value="all">All departments</option>
        </select>
      </label>

      <label className="space-y-2 text-sm font-medium text-stone-700">
        Employment status
        <select
          name="status"
          defaultValue="all"
          className="w-full rounded-2xl border border-[--color-border] bg-white px-4 py-3 text-sm outline-none transition focus:border-[--color-accent]"
        >
          <option value="all">All statuses</option>
        </select>
      </label>
    </section>
  );
}
