import type { EmployeeDetail, EmployeeRow } from "./types";

function getManagementSafeStatus(status: string) {
  if (status === "Pending activation") {
    return "Pending";
  }

  return status;
}

export function mapEmployeeRowForManagement(row: EmployeeRow): EmployeeRow {
  return {
    ...row,
    status: getManagementSafeStatus(row.status),
  };
}

export function mapEmployeeDetailForManagement(
  detail: EmployeeDetail | null,
): EmployeeDetail | null {
  if (!detail) {
    return null;
  }

  return {
    ...detail,
    status: getManagementSafeStatus(detail.status),
  };
}
