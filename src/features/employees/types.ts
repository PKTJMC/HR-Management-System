export type EmployeeDirectoryFilters = {
  searchQuery: string;
  department: string;
  status: string;
};

export type EmployeeRow = {
  id: string;
  name: string;
  department: string;
  title: string;
  status: string;
};

export type EmployeeDetail = EmployeeRow & {
  email: string;
  location: string;
  manager: string;
  startDate: string;
};
