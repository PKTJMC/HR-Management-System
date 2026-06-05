import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders the application shell content", () => {
    const layout = RootLayout({
      children: <div>HRMS App</div>,
    }) as ReactElement<{
      children: ReactElement<{ children: ReactElement }>;
      lang: string;
    }>;

    expect(layout.props.lang).toBe("en");

    const body = layout.props.children;

    expect(body.props.className).toContain("min-h-screen");

    const { getByText } = render(body.props.children);

    expect(getByText("HRMS App")).toBeInTheDocument();
  });
});
