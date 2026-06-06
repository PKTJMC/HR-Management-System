import { PageHeader } from "../../../../components/layout/page-header";
import { updateMyProfile } from "../../../../features/employees/actions/update-my-profile";
import { ProfileForm } from "../../../../features/employees/components/profile-form";

const scaffoldEmployeeProfile = {
  employeeId: "employee-self",
  actorUserId: "employee-self",
  targetUserId: "employee-self",
  legalFirstName: "Big",
  legalLastName: "Boss",
  preferredName: "Big",
  phone: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  bio: "",
  phoneVisible: true,
  bioVisible: true,
} as const;

export default function EmployeeProfilePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Update the personal details and visibility settings that power your employee directory profile."
      />
      <ProfileForm
        action={updateMyProfile}
        defaultValues={scaffoldEmployeeProfile}
        submitLabel="Save my profile"
      />
    </section>
  );
}
