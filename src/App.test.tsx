import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App integration", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-06T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("supports the core flow across Home and Calendar views", async () => {
    const now = new Date();
    const initialDate = now.toISOString().slice(0, 10);
    const expectedCalendarSelection = new Date(now.getFullYear(), now.getMonth(), 5)
      .toISOString()
      .slice(0, 10);

    render(<App />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${initialDate} — 0/0 done`
    );

    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Meditate" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${initialDate} — 0/1 done`
    );
    expect(screen.getByText("Meditate")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "Meditate" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${initialDate} — 1/1 done`
    );

    fireEvent.click(screen.getByRole("link", { name: "Calendar" }));
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "5" }));

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${expectedCalendarSelection} — 0/1 done`
    );

    const storedHabitsRaw = localStorage.getItem("ht_habits");
    const storedLogsRaw = localStorage.getItem("ht_logs");
    expect(storedHabitsRaw).not.toBeNull();
    expect(storedLogsRaw).not.toBeNull();

    const storedHabits = JSON.parse(storedHabitsRaw as string) as Array<{
      id: string;
      name: string;
      color: string;
    }>;
    const storedLogs = JSON.parse(storedLogsRaw as string) as Array<{
      habitId: string;
      date: string;
    }>;

    expect(storedHabits).toHaveLength(1);
    expect(storedHabits[0].name).toBe("Meditate");
    expect(storedLogs).toHaveLength(1);
    expect(storedLogs[0].habitId).toBe(storedHabits[0].id);
    expect(storedLogs[0].date).toBe(initialDate);
  });
});
