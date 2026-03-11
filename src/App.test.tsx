import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { createMockSupabaseManager } from "./test/mockSupabaseManager";
import { renderWithProviders } from "./test/renderWithProviders";

describe("App integration", () => {
  it("supports the core flow across Home and Calendar views", async () => {
    const now = new Date();
    const initialDate = now.toISOString().slice(0, 10);
    const expectedCalendarSelection = new Date(now.getFullYear(), now.getMonth(), 5)
      .toISOString()
      .slice(0, 10);
    const manager = createMockSupabaseManager();

    renderWithProviders(<App />, { manager });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${initialDate} — 0/0 done`
    );

    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Meditate" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        `${initialDate} — 0/1 done`
      )
    );
    await waitFor(() => expect(screen.getByText("Meditate")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("checkbox", { name: "Meditate" }));
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        `${initialDate} — 1/1 done`
      )
    );

    fireEvent.click(screen.getByRole("link", { name: "Calendar" }));
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "5" }));

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${expectedCalendarSelection} — 0/1 done`
    );
  }, 15_000);
});
