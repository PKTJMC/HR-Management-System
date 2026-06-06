import { render, screen } from "@testing-library/react";
import EmployeesPage from "./page";

describe("EmployeesPage", () => {
  it("renders the employee directory heading", async () => {
    render(await EmployeesPage());

    expect(
      screen.getByRole("heading", { name: "Employee Directory" }),
    ).toBeInTheDocument();
  });
});
