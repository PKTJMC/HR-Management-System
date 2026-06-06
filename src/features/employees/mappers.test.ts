import { describe, expect, it } from "vitest";
import { mapEmployeeToPublicProfile } from "./mappers";

describe("mapEmployeeToPublicProfile", () => {
  it("hides phone when privacy says not visible", () => {
    const profile = mapEmployeeToPublicProfile({
      employee: {
        id: "1",
        legalFirstName: "Big",
        legalLastName: "Boss",
        preferredName: "Big",
        phone: "0812345678",
        bio: "Leader",
        address: "Hidden",
        emergencyContactName: "Mom",
        emergencyContactPhone: "0800000000",
      },
      privacy: {
        phoneVisible: false,
        bioVisible: true,
      },
    });

    expect(profile.phone).toBeNull();
    expect(profile.bio).toBe("Leader");
    expect("address" in profile).toBe(false);
    expect("emergencyContactName" in profile).toBe(false);
    expect("emergencyContactPhone" in profile).toBe(false);
  });
});
