export type EmployeeRow = {
  id: string;
  name: string;
  department: string;
  title: string;
  status: string;
};

export function EmployeeTable({ rows }: { rows: EmployeeRow[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[--color-border] bg-[--color-panel]">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[--color-border] text-left text-stone-600">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Department</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-stone-500" colSpan={4}>
                No employees found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[--color-border] last:border-b-0"
              >
                <td className="px-4 py-3 font-medium text-[--color-fg]">
                  {row.name}
                </td>
                <td className="px-4 py-3 text-stone-700">{row.department}</td>
                <td className="px-4 py-3 text-stone-700">{row.title}</td>
                <td className="px-4 py-3 text-stone-700">{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
