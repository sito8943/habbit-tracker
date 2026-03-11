import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import { COLORS } from "../utils/constant";
import Home from "./Home";
import { createMockSupabaseManager } from "../test/mockSupabaseManager";
import { renderWithProviders } from "../test/renderWithProviders";
import { today } from "../utils/habits";

describe("Home view", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders habits and progress from habits context", async () => {
    const selectedDate = today();

    const manager = createMockSupabaseManager({
      habits: [
        { id: 1, name: "Read", color: "#3498db" },
        { id: 2, name: "Workout", color: "#2ecc71" },
      ],
      logs: [{ id: 1, habitId: 1, date: selectedDate }],
    });

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>,
      { manager }
    );

    await waitFor(() => expect(screen.getByText("Read")).toBeInTheDocument());
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${selectedDate} — 1/2 done`
    );
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("creates a new habit from form", async () => {
    const manager = createMockSupabaseManager();

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>,
      { manager }
    );

    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Write tests" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => expect(screen.getByText("Write tests")).toBeInTheDocument());

    const createHabitSpy = vi.spyOn(manager.habitsClient, "createHabit");
    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Read docs" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(createHabitSpy).toHaveBeenCalledWith({ name: "Read docs", color: COLORS[0] });
    });
  });

  it("shows auth prompt tooltip on first habits/logs interaction", async () => {
    const manager = createMockSupabaseManager({
      habits: [{ id: 1, name: "Read", color: "#3498db" }],
    });

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>,
      { manager }
    );

    await waitFor(() => expect(screen.getByRole("checkbox", { name: "Read" })).toBeInTheDocument());

    fireEvent.click(screen.getByRole("checkbox", { name: "Read" }));

    expect(screen.getByRole("heading", { level: 3, name: "Save your progress" })).toBeInTheDocument();
    expect(
      screen.getByText("Sign up so you can save and reopen your habits when you come back.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign In / Sign Up" })).toBeInTheDocument();
  });
});
