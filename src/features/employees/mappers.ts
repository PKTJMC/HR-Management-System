export type EmployeeProfilePrivacy = {
  phoneVisible: boolean;
  bioVisible: boolean;
};

export type EmployeeProfileRecord = {
  id: string;
  legalFirstName: string;
  legalLastName: string;
  preferredName: string;
  phone: string | null;
  bio: string | null;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

type MapperInput = {
  employee: EmployeeProfileRecord;
  privacy: EmployeeProfilePrivacy;
};

export function mapEmployeeToPublicProfile({ employee, privacy }: MapperInput) {
  return {
    id: employee.id,
    fullName: `${employee.legalFirstName} ${employee.legalLastName}`,
    preferredName: employee.preferredName,
    phone: privacy.phoneVisible ? employee.phone : null,
    bio: privacy.bioVisible ? employee.bio : null,
  };
}
