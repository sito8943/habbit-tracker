import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HabitList from "./HabitList";
import { createMockSupabaseManager } from "../../../../test/mockSupabaseManager";
import { renderWithProviders } from "../../../../test/renderWithProviders";

describe("HabitList", () => {
  it("renders without crashing", async () => {
    const manager = createMockSupabaseManager({
      habits: [{ id: 1, name: "Read", color: "#3498db" }],
    });

    renderWithProviders(<HabitList />, { manager });

    await waitFor(() => expect(screen.getByText("Read")).toBeInTheDocument());
    expect(screen.getByRole("checkbox", { name: "Read" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete habit" })).toBeInTheDocument();
  });
});
