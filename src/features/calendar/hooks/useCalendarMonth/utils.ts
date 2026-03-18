import type { CalendarDayViewModel } from "./types";

export const resolveCalendarDayAppearance = (
  isSelected: boolean,
  hasLog: boolean,
  isToday: boolean
): Pick<CalendarDayViewModel, "color" | "variant"> => {
  const color: CalendarDayViewModel["color"] = isSelected
    ? "info"
    : hasLog
      ? "success"
      : isToday
        ? "warning"
        : "primary";

  const variant: CalendarDayViewModel["variant"] = isSelected || hasLog ? "filled" : "outlined";

  return { color, variant };
};
