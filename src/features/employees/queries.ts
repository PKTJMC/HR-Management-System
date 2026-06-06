import type { EmployeeRow } from "./components/employee-table";

export type EmployeeDetail = EmployeeRow & {
  email: string;
  location: string;
  manager: string;
  startDate: string;
};

export async function listEmployees(): Promise<EmployeeRow[]> {
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
