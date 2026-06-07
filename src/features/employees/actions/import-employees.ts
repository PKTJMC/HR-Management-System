"use server";

import { cookies } from "next/headers";
import { canEditAnyEmployeeProfile } from "../permissions";
import type {
  ImportValidationSummary,
} from "../lib/import-validation";
import { parseImportCsvText, validateImportRows } from "../lib/import-validation";
import {
  getSessionRoleFromCookieValue,
  MOCK_ROLE_SESSION_COOKIE,
} from "../../../lib/auth/session";

export type ImportActionState = {
  submitted: boolean;
  success: boolean;
  message: string;
  summary?: ImportValidationSummary;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function getCsvSourceText(fileEntry: FormDataEntryValue | null, csvText: string) {
  if (typeof File !== "undefined" && fileEntry instanceof File && fileEntry.size > 0) {
    return fileEntry.text();
  }

  return Promise.resolve(csvText);
}

export async function importEmployees(
  _previousState: ImportActionState,
  formData: FormData,
): Promise<ImportActionState> {
  const cookieStore = await cookies();
  const role = getSessionRoleFromCookieValue(
    cookieStore.get(MOCK_ROLE_SESSION_COOKIE)?.value,
  );

  if (!role || !canEditAnyEmployeeProfile(role)) {
    return {
      submitted: true,
      success: false,
      message: "You do not have permission to import employee records.",
    };
  }

  const csvText = getStringValue(formData, "csvText");
  const fileEntry = formData.get("csvFile");
  const csvSource = await getCsvSourceText(fileEntry, csvText);
  const parsedImport = parseImportCsvText(csvSource);
  const validation = validateImportRows(parsedImport.rows);
  const failedRowNumbers = new Set<number>();

  parsedImport.errors.forEach((error) => {
    if (error.rowNumber > 0) {
      failedRowNumbers.add(error.rowNumber);
    }
  });

  validation.errors.forEach((error) => {
    failedRowNumbers.add(error.rowNumber);
  });

  const summary: ImportValidationSummary = {
    totalRows: parsedImport.totalRows,
    successRows: Math.max(parsedImport.totalRows - failedRowNumbers.size, 0),
    failedRows:
      failedRowNumbers.size > 0
        ? failedRowNumbers.size
        : validation.failedRows,
    errors: [...parsedImport.errors, ...validation.errors],
  };

  if (summary.errors.length > 0) {
    return {
      submitted: true,
      success: false,
      message:
        "CSV validation failed. Fix the reported rows before connecting this import flow to persistence.",
      summary,
    };
  }

  return {
    submitted: true,
    success: true,
    message:
      "CSV validation passed. This scaffold does not write to the database yet, but the file is structurally ready for import.",
    summary,
  };
}
