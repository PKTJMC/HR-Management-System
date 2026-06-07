import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("renders a metric label and value", () => {
    render(<StatCard label="Active employees" value="48" />);

    expect(screen.getByText("Active employees")).toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument();
  });
});
