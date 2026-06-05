import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders the application shell content", () => {
    render(
      <RootLayout>
        <div>HRMS App</div>
      </RootLayout>,
    );

    expect(screen.getByText("HRMS App")).toBeInTheDocument();
  });
});
