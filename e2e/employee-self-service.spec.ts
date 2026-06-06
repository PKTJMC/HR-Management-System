import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileForm } from "../src/features/employees/components/profile-form";

describe("employee self-service profile scaffold", () => {
  it("renders editable self-service fields and privacy controls", () => {
    render(
      React.createElement(ProfileForm, {
        defaultValues: {
          employeeId: "emp-1",
          actorUserId: "user-1",
          targetUserId: "user-1",
          legalFirstName: "Big",
          legalLastName: "Boss",
          preferredName: "Big",
          phone: "0812345678",
          address: "Bangkok",
          emergencyContactName: "Mom",
          emergencyContactPhone: "0800000000",
          bio: "Leader",
          phoneVisible: false,
          bioVisible: true,
        },
      }),
    );

    expect(screen.getByPlaceholderText("Preferred name")).toHaveValue("Big");
    expect(screen.getByPlaceholderText("Phone")).toHaveValue("0812345678");
    expect(screen.getByPlaceholderText("Address")).toHaveValue("Bangkok");
    expect(screen.getByPlaceholderText("Emergency contact name")).toHaveValue(
      "Mom",
    );
    expect(screen.getByPlaceholderText("Emergency contact phone")).toHaveValue(
      "0800000000",
    );
    expect(screen.getByPlaceholderText("Bio")).toHaveValue("Leader");
    expect(screen.getByLabelText("Show phone in public profile")).not.toBeChecked();
    expect(screen.getByLabelText("Show bio in public profile")).toBeChecked();
  });

  it("lets the user change visibility settings in the scaffold form", () => {
    render(React.createElement(ProfileForm));

    const phoneVisible = screen.getByLabelText("Show phone in public profile");
    const bioVisible = screen.getByLabelText("Show bio in public profile");

    expect(phoneVisible).toBeChecked();
    expect(bioVisible).toBeChecked();

    fireEvent.click(phoneVisible);
    fireEvent.click(bioVisible);

    expect(phoneVisible).not.toBeChecked();
    expect(bioVisible).not.toBeChecked();
  });
});
