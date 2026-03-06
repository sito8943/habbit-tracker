import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatDate,
  generateId,
  getMonthDays,
  getStreak,
  hasAnyLog,
  isLogged,
  today,
  type LogEntry,
} from "./habits";

describe("habits utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-06T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("smoke: module helpers can be called", () => {
    expect(typeof generateId()).toBe("string");
    expect(formatDate(new Date("2026-03-06T00:00:00.000Z"))).toBe("2026-03-06");
    expect(today()).toBe("2026-03-06");
  });

  it("checks habit logs by habit and date", () => {
    const logs: LogEntry[] = [
      { habitId: "h1", date: "2026-03-06" },
      { habitId: "h2", date: "2026-03-05" },
    ];

    expect(isLogged(logs, "h1", "2026-03-06")).toBe(true);
    expect(isLogged(logs, "h1", "2026-03-05")).toBe(false);
    expect(hasAnyLog(logs, "2026-03-05")).toBe(true);
    expect(hasAnyLog(logs, "2026-03-04")).toBe(false);
  });

  it("computes streak for consecutive days ending today", () => {
    const logs: LogEntry[] = [
      { habitId: "h1", date: "2026-03-06" },
      { habitId: "h1", date: "2026-03-05" },
      { habitId: "h1", date: "2026-03-04" },
      { habitId: "h2", date: "2026-03-06" },
    ];

    expect(getStreak(logs, "h1")).toBe(3);
  });

  it("returns zero streak when today is not logged", () => {
    const logs: LogEntry[] = [
      { habitId: "h1", date: "2026-03-05" },
      { habitId: "h1", date: "2026-03-04" },
    ];

    expect(getStreak(logs, "h1")).toBe(0);
  });

  it("returns all days for a month", () => {
    const februaryLeapYearDays = getMonthDays(2024, 1);

    expect(februaryLeapYearDays).toHaveLength(29);
    expect(februaryLeapYearDays[0].getDate()).toBe(1);
    expect(februaryLeapYearDays[28].getDate()).toBe(29);
  });
});
