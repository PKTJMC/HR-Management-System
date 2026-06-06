import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmployeeProfilePage from "../src/app/(portal)/employee/profile/page";

describe("employee self-service profile scaffold", () => {
  it("renders the employee self-service profile page with mounted profile form", async () => {
    render(await EmployeeProfilePage());

    expect(
      screen.getByRole("heading", { name: "My Profile" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Preferred name")).toHaveValue("Big");
    expect(screen.getByPlaceholderText("Phone")).toHaveValue("");
    expect(screen.getByPlaceholderText("Address")).toHaveValue("");
    expect(screen.getByPlaceholderText("Emergency contact name")).toHaveValue(
      "",
    );
    expect(screen.getByPlaceholderText("Emergency contact phone")).toHaveValue(
      "",
    );
    expect(screen.getByPlaceholderText("Bio")).toHaveValue("");
    expect(screen.getByLabelText("Show phone in public profile")).toBeChecked();
    expect(screen.getByLabelText("Show bio in public profile")).toBeChecked();
    expect(
      screen.getByRole("button", { name: "Save my profile" }),
    ).toBeInTheDocument();
  });

  it("lets the user change visibility settings from the routed self-service page", async () => {
    render(await EmployeeProfilePage());

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
