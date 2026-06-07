import type {
  EmployeeDetail,
  EmployeeDirectoryFilters,
  EmployeeRow,
} from "./types";

const employeeDirectorySeed: EmployeeDetail[] = [
  {
    id: "hr-staff",
    employeeCode: "EMP-0001",
    name: "HR Admin",
    legalName: "HR Admin",
    preferredName: "HR",
    department: "People Operations",
    title: "HR Operations Lead",
    status: "Active",
    email: "hr.admin@company.test",
    location: "Bangkok HQ",
    manager: "Chief People Officer",
    startDate: "2022-01-10",
    employmentType: "Full-time",
    bio: "Leads employee lifecycle operations and internal policy rollouts.",
    isBioPublic: true,
  },
  {
    id: "management-staff",
    employeeCode: "EMP-0002",
    name: "Management Lead",
    legalName: "Management Lead",
    preferredName: "Lead",
    department: "Operations",
    title: "Department Manager",
    status: "Active",
    email: "management.lead@company.test",
    location: "Bangkok HQ",
    manager: "Chief Operating Officer",
    startDate: "2021-05-03",
    employmentType: "Full-time",
    bio: "Coordinates hiring demand, team capacity, and cross-functional delivery.",
    isBioPublic: true,
  },
  {
    id: "employee-self",
    employeeCode: "EMP-0048",
    name: "Big Boss",
    legalName: "Big Boss",
    preferredName: "Big",
    department: "Design",
    title: "UX/UI Design Manager",
    status: "Active",
    email: "big.boss@company.test",
    location: "Remote - Bangkok",
    manager: "Management Lead",
    startDate: "2024-02-12",
    employmentType: "Full-time",
    bio: "Builds product systems, design operations, and scalable UX foundations.",
    isBioPublic: true,
  },
  {
    id: "employee-0049",
    employeeCode: "EMP-0049",
    name: "Mina Park",
    legalName: "Mina Park",
    preferredName: "Mina",
    department: "Engineering",
    title: "Frontend Engineer",
    status: "Pending activation",
    email: "mina.park@company.test",
    location: "Bangkok HQ",
    manager: "Management Lead",
    startDate: "2026-06-16",
    employmentType: "Full-time",
    bio: null,
    isBioPublic: false,
  },
];

export async function listEmployees(
  filters: EmployeeDirectoryFilters,
): Promise<EmployeeRow[]> {
  const query = filters.searchQuery.trim().toLowerCase();

  return employeeDirectorySeed.filter((employee) => {
    const matchesQuery =
      query.length === 0 ||
      employee.name.toLowerCase().includes(query) ||
      employee.employeeCode.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query);

    const matchesDepartment =
      filters.department === "all" || employee.department === filters.department;
    const matchesStatus =
      filters.status === "all" || employee.status === filters.status;

    return matchesQuery && matchesDepartment && matchesStatus;
  });
}

export async function getEmployeeById(
  employeeId: string,
): Promise<EmployeeDetail | null> {
  if (!employeeId) {
    return null;
  }

  return (
    employeeDirectorySeed.find((employee) => employee.id === employeeId) ?? null
  );
}
