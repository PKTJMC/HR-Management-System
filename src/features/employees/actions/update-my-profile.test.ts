import { describe, expect, it } from "vitest";
import type { MockRoleSession } from "../../../lib/auth/session";
import { updateMyProfileWithSession } from "./update-my-profile";

const employeeSession: MockRoleSession = {
  role: "employee",
  userId: "employee-self",
  employeeId: "employee-self",
  legalFirstName: "Big",
  legalLastName: "Boss",
};

function buildProfileFormData(employeeId: string) {
  const formData = new FormData();

  formData.set("employeeId", employeeId);
  formData.set("preferredName", "Big");
  formData.set("phone", "0812345678");
  formData.set("address", "Bangkok");
  formData.set("emergencyContactName", "Mom");
  formData.set("emergencyContactPhone", "0800000000");
  formData.set("bio", "Leader");
  formData.set("phoneVisible", "on");
  formData.set("bioVisible", "on");

  return formData;
}

describe("updateMyProfileWithSession", () => {
  it("rejects forged client identity fields when target employee does not match the server session", async () => {
    const formData = buildProfileFormData("employee-victim");

    formData.set("actorUserId", "employee-victim");
    formData.set("targetUserId", "employee-victim");
    formData.set("legalFirstName", "Victim");
    formData.set("legalLastName", "User");

    const result = await updateMyProfileWithSession(employeeSession, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("You do not have permission to edit this profile.");
  });

  it("allows the session owner to update only their own scaffold profile", async () => {
    const result = await updateMyProfileWithSession(
      employeeSession,
      buildProfileFormData("employee-self"),
    );

    expect(result.success).toBe(true);
    expect(result.publicProfile).toMatchObject({
      id: "employee-self",
      fullName: "Big Boss",
      preferredName: "Big",
      phone: "0812345678",
      bio: "Leader",
    });
    expect("address" in (result.publicProfile ?? {})).toBe(false);
  });
});
