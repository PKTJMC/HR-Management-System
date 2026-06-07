"use client";

import { useActionState } from "react";
import type { ImportActionState } from "../actions/import-employees";

type ImportEmployeesAction = (
  state: ImportActionState,
  formData: FormData,
) => ImportActionState | Promise<ImportActionState>;

type ImportDropzoneProps = {
  action: ImportEmployeesAction;
};

const initialImportActionState: ImportActionState = {
  submitted: false,
  success: false,
  message: "",
};

export function ImportDropzone({ action }: ImportDropzoneProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialImportActionState,
  );

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-6 rounded-3xl border border-[--color-border] bg-[--color-panel] p-6">
        <div className="rounded-3xl border border-dashed border-[--color-border] bg-white/70 p-6">
          <p className="text-sm font-semibold text-[--color-fg]">
            Upload employee CSV
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            This MVP validates CSV structure and row-level data on the server.
            It does not persist records yet and should be treated as a pre-import quality gate.
          </p>
          <label className="mt-4 grid gap-2 text-sm">
            CSV file
            <input
              name="csvFile"
              type="file"
              accept=".csv,text/csv"
              className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          Or paste CSV content
          <textarea
            name="csvText"
            rows={12}
            placeholder="employeeCode,legalFirstName,legalLastName,preferredName,companyEmail,departmentId,jobTitleId,employmentType,joinDate,employmentStatus"
            className="rounded-3xl border border-[--color-border] bg-white px-4 py-3 font-mono text-xs text-stone-700"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[--color-fg] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Validating import..." : "Validate import file"}
          </button>
        </div>
      </form>

      {state.submitted ? (
        <section className="rounded-3xl border border-[--color-border] bg-[--color-panel] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[--color-fg]">
                Import validation result
              </p>
              <p
                className={`mt-2 text-sm leading-6 ${
                  state.success ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {state.message}
              </p>
            </div>
            {state.summary ? (
              <div className="grid min-w-[220px] grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl border border-[--color-border] bg-white px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    Total
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[--color-fg]">
                    {state.summary.totalRows}
                  </p>
                </div>
                <div className="rounded-2xl border border-[--color-border] bg-white px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    Valid
                  </p>
                  <p className="mt-2 text-xl font-semibold text-emerald-700">
                    {state.summary.successRows}
                  </p>
                </div>
                <div className="rounded-2xl border border-[--color-border] bg-white px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    Failed
                  </p>
                  <p className="mt-2 text-xl font-semibold text-amber-700">
                    {state.summary.failedRows}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {state.summary && state.summary.errors.length > 0 ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-[--color-border] bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[--color-border] text-left text-stone-600">
                    <th className="px-4 py-3 font-medium">Row</th>
                    <th className="px-4 py-3 font-medium">Field</th>
                    <th className="px-4 py-3 font-medium">Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {state.summary.errors.map((error, index) => (
                    <tr
                      key={`${error.rowNumber}-${error.fieldName}-${index}`}
                      className="border-b border-[--color-border] last:border-b-0"
                    >
                      <td className="px-4 py-3 text-stone-700">
                        {error.rowNumber === 0 ? "File" : error.rowNumber}
                      </td>
                      <td className="px-4 py-3 font-medium text-[--color-fg]">
                        {error.fieldName}
                      </td>
                      <td className="px-4 py-3 text-stone-700">
                        {error.errorMessage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
