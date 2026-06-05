import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { describe, expect, it } from "vitest";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders the application shell content", () => {
    const layout = RootLayout({
      children: <div>HRMS App</div>,
    }) as ReactElement<{
      children: ReactElement<{
        children: ReactNode;
        className: string;
      }>;
      lang: string;
    }>;

    expect(layout.props.lang).toBe("en");

    const body = layout.props.children;

    expect(body.props.className).toContain("min-h-screen");

    const { getByText } = render(body.props.children);

    expect(getByText("HRMS App")).toBeInTheDocument();
  });
});
