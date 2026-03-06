import { render, screen } from "@testing-library/react";
import HabitList from "./HabitList";

describe("HabitList", () => {
  it("renders without crashing", () => {
    const habits = [{ id: "habit-1", name: "Read", color: "#3498db" }];
    const logs: { habitId: string; date: string }[] = [];

    render(
      <HabitList
        habits={habits}
        logs={logs}
        date="2026-03-06"
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete habit" })).toBeInTheDocument();
  });
});
