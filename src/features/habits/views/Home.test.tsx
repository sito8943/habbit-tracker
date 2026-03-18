import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import { COLORS } from "../../../shared/utils/constants";
import Home from "./Home";
import { createMockSupabaseManager } from "../../../test/mockSupabaseManager";
import { renderWithProviders } from "../../../test/renderWithProviders";
import { today } from "../utils/habits";
import fabStyles from "../../sync/components/SyncCodeFab/SyncCodeFab.module.css";

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

    expect(await screen.findByText("Read", {}, { timeout: 10_000 })).toBeInTheDocument();
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

    expect(await screen.findByText("Write tests", {}, { timeout: 10_000 })).toBeInTheDocument();

    const createHabitSpy = vi.spyOn(manager.habitsClient, "createHabit");
    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Read docs" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(createHabitSpy).toHaveBeenCalledWith(
        { name: "Read docs", color: COLORS[0] },
        expect.any(String)
      );
    });
  });

  it("shows recovery code prompt only after clicking the floating action button", async () => {
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

    expect(
      await screen.findByRole("checkbox", { name: "Read" }, { timeout: 10_000 })
    ).toBeInTheDocument();

    const openRecoveryCodeButton = screen.getByRole("button", { name: "Open recovery code" });
    expect(openRecoveryCodeButton).not.toHaveClass(fabStyles.buzz);

    fireEvent.click(screen.getByRole("checkbox", { name: "Read" }));
    expect(openRecoveryCodeButton).toHaveClass(fabStyles.buzz);

    await waitFor(() => expect(openRecoveryCodeButton).not.toHaveClass(fabStyles.buzz), {
      timeout: 2000,
    });

    expect(
      screen.queryByRole("heading", { level: 3, name: "Recovery code" })
    ).not.toBeInTheDocument();

    fireEvent.click(openRecoveryCodeButton);

    expect(
      await screen.findByRole("heading", { level: 3, name: "Recovery code" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Save this code. Use it on another device to recover and sync your habits.")
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("AB12")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Already have Code" }));
    expect(screen.getByPlaceholderText("AB12")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "Read" }));
    expect(openRecoveryCodeButton).not.toHaveClass(fabStyles.buzz);
  });
});
