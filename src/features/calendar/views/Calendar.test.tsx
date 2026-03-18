import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import Home from "./Home";
import Calendar from "./Calendar";
import { createMockSupabaseManager } from "../test/mockSupabaseManager";
import { renderWithProviders } from "../test/renderWithProviders";

describe("Calendar view", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders without crashing", async () => {
    const manager = createMockSupabaseManager();

    renderWithProviders(
      <MemoryRouter initialEntries={["/calendar"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </MemoryRouter>,
      { manager }
    );

    await waitFor(() => expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument());
    expect(screen.getByText("Su")).toBeInTheDocument();
  });

  it("selects a date and navigates back to home", async () => {
    const now = new Date();
    const expectedDate = new Date(now.getFullYear(), now.getMonth(), 5).toISOString().slice(0, 10);

    const manager = createMockSupabaseManager({
      habits: [{ id: 1, name: "Read", color: "#3498db" }],
    });

    renderWithProviders(
      <MemoryRouter initialEntries={["/calendar"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </MemoryRouter>,
      { manager }
    );

    fireEvent.click(screen.getByRole("button", { name: "5" }));

    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        `${expectedDate} — 0/1 done`
      )
    );
  });
});
