import type {
  EmployeeDetail,
  EmployeeDirectoryFilters,
  EmployeeRow,
} from "./types";

export async function listEmployees(
  _filters: EmployeeDirectoryFilters,
): Promise<EmployeeRow[]> {
  return [];
}

export async function getEmployeeById(
  employeeId: string,
): Promise<EmployeeDetail | null> {
  if (!employeeId) {
    return null;
  }

  return null;
}
