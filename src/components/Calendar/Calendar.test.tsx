import { render, screen } from "@testing-library/react";
import { today } from "../../utils/habits";
import Calendar from "./Calendar";

describe("Calendar", () => {
  it("renders without crashing", () => {
    render(<Calendar logs={[]} selectedDate={today()} onSelectDate={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(28);
  });
});
