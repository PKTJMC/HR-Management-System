export type EmployeeDirectoryFilters = {
  searchQuery: string;
  department: string;
  status: string;
};

export type EmployeeRow = {
  id: string;
  employeeCode: string;
  name: string;
  department: string;
  title: string;
  status: string;
};

export type EmployeeDetail = EmployeeRow & {
  legalName: string;
  preferredName: string;
  email: string;
  location: string;
  manager: string;
  startDate: string;
  employmentType: string;
  bio: string | null;
  isBioPublic: boolean;
};
