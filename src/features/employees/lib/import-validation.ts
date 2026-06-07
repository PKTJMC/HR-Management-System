import {
  employeeImportHeaders,
  employeeImportRowSchema,
  type EmployeeImportHeader,
} from "../schemas/import";

type RawImportRow = Record<EmployeeImportHeader, string>;

export type ImportValidationError = {
  rowNumber: number;
  fieldName: string;
  errorMessage: string;
};

export type ImportValidationSummary = {
  totalRows: number;
  successRows: number;
  failedRows: number;
  errors: ImportValidationError[];
};

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
        continue;
      }

      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

export function parseImportCsvText(csvText: string): {
  totalRows: number;
  rows: RawImportRow[];
  errors: ImportValidationError[];
} {
  const normalizedText = csvText.replace(/^\uFEFF/, "").trim();

  if (!normalizedText) {
    return {
      totalRows: 0,
      rows: [],
      errors: [
        {
          rowNumber: 0,
          fieldName: "csvFile",
          errorMessage: "Upload a CSV file or paste CSV content before importing.",
        },
      ],
    };
  }

  const lines = normalizedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return {
      totalRows: 0,
      rows: [],
      errors: [
        {
          rowNumber: 0,
          fieldName: "csvFile",
          errorMessage: "CSV content is empty.",
        },
      ],
    };
  }

  const headerCells = parseCsvLine(lines[0]);
  const headerIndexMap = new Map<string, number>();

  headerCells.forEach((header, index) => {
    headerIndexMap.set(header.trim(), index);
  });

  const missingHeaders = employeeImportHeaders.filter(
    (header) => !headerIndexMap.has(header),
  );

  if (missingHeaders.length > 0) {
    return {
      totalRows: Math.max(lines.length - 1, 0),
      rows: [],
      errors: missingHeaders.map((header) => ({
        rowNumber: 0,
        fieldName: header,
        errorMessage: `Missing required column: ${header}`,
      })),
    };
  }

  const rows: RawImportRow[] = [];
  const errors: ImportValidationError[] = [];

  lines.slice(1).forEach((line, rowIndex) => {
    const parsedCells = parseCsvLine(line);
    const rowNumber = rowIndex + 1;

    if (parsedCells.length < headerCells.length) {
      errors.push({
        rowNumber,
        fieldName: "row",
        errorMessage: "Row has fewer columns than the header definition.",
      });
      return;
    }

    const row = {} as RawImportRow;

    employeeImportHeaders.forEach((header) => {
      const headerIndex = headerIndexMap.get(header) ?? -1;
      row[header] = (parsedCells[headerIndex] ?? "").trim();
    });

    rows.push(row);
  });

  return {
    totalRows: lines.length - 1,
    rows,
    errors,
  };
}

export function validateImportRows(
  rows: Array<Record<string, string>>,
): ImportValidationSummary {
  const seenEmails = new Map<string, number>();
  const seenEmployeeCodes = new Map<string, number>();
  const errors: ImportValidationError[] = [];
  let successRows = 0;

  rows.forEach((row, index) => {
    const rowNumber = index + 1;
    let rowHasError = false;
    const parsedRow = employeeImportRowSchema.safeParse(row);

    if (!parsedRow.success) {
      rowHasError = true;
      parsedRow.error.issues.forEach((issue) => {
        errors.push({
          rowNumber,
          fieldName: String(issue.path[0] ?? "row"),
          errorMessage: issue.message,
        });
      });
    } else {
      const normalizedEmail = parsedRow.data.companyEmail.toLowerCase();
      const normalizedEmployeeCode = parsedRow.data.employeeCode.toUpperCase();

      if (seenEmails.has(normalizedEmail)) {
        rowHasError = true;
        errors.push({
          rowNumber,
          fieldName: "companyEmail",
          errorMessage: "Duplicate company email in import file",
        });
      } else {
        seenEmails.set(normalizedEmail, rowNumber);
      }

      if (seenEmployeeCodes.has(normalizedEmployeeCode)) {
        rowHasError = true;
        errors.push({
          rowNumber,
          fieldName: "employeeCode",
          errorMessage: "Duplicate employee code in import file",
        });
      } else {
        seenEmployeeCodes.set(normalizedEmployeeCode, rowNumber);
      }
    }

    if (!rowHasError) {
      successRows += 1;
    }
  });

  return {
    totalRows: rows.length,
    successRows,
    failedRows: rows.length - successRows,
    errors,
  };
}
