import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useOutletContext } from "react-router";
import View, { type ViewContextType } from "./View";

const ViewConsumer = () => {
  const { habits, logs, selectedDate, addHabit, deleteHabit, toggleLog, selectDate } =
    useOutletContext<ViewContextType>();
  const firstHabitId = habits[0]?.id;

  return (
    <section>
      <p data-testid="habits-count">{habits.length}</p>
      <p data-testid="logs-count">{logs.length}</p>
      <p data-testid="selected-date">{selectedDate}</p>
      <button type="button" onClick={() => addHabit("Read", "#3498db")}>
        add-habit
      </button>
      <button type="button" onClick={() => firstHabitId && toggleLog(firstHabitId)}>
        toggle-first
      </button>
      <button type="button" onClick={() => firstHabitId && deleteHabit(firstHabitId)}>
        delete-first
      </button>
      <button type="button" onClick={() => selectDate("2026-03-01")}>
        select-date
      </button>
    </section>
  );
};

const renderView = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<ViewConsumer />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("View layout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders main layout with navbar and outlet", () => {
    renderView();

    expect(screen.getByRole("heading", { level: 1, name: "Focus Habit" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Today" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Calendar" })).toBeInTheDocument();
    expect(screen.getByTestId("habits-count")).toHaveTextContent("0");
  });

  it("provides outlet context actions and syncs with localStorage", async () => {
    renderView();

    fireEvent.click(screen.getByRole("button", { name: "add-habit" }));
    expect(screen.getByTestId("habits-count")).toHaveTextContent("1");

    await waitFor(() => {
      const habits = localStorage.getItem("ht_habits");
      expect(habits).not.toBeNull();
      expect(habits).toContain('"name":"Read"');
    });

    fireEvent.click(screen.getByRole("button", { name: "toggle-first" }));
    expect(screen.getByTestId("logs-count")).toHaveTextContent("1");

    await waitFor(() => {
      const logs = localStorage.getItem("ht_logs");
      expect(logs).not.toBeNull();
      expect(logs).toContain('"habitId"');
    });

    fireEvent.click(screen.getByRole("button", { name: "select-date" }));
    expect(screen.getByTestId("selected-date")).toHaveTextContent("2026-03-01");

    fireEvent.click(screen.getByRole("button", { name: "delete-first" }));
    expect(screen.getByTestId("habits-count")).toHaveTextContent("0");
    expect(screen.getByTestId("logs-count")).toHaveTextContent("0");
  });
});
