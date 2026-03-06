import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import type { ViewContextType } from "../layouts/View";
import Calendar from "./Calendar";

type ContextLayoutProps = {
  context: ViewContextType;
};

const ContextLayout = ({ context }: ContextLayoutProps) => <Outlet context={context} />;

const buildContext = (overrides: Partial<ViewContextType> = {}): ViewContextType => ({
  habits: [],
  logs: [],
  selectedDate: "2026-03-06",
  addHabit: vi.fn(),
  deleteHabit: vi.fn(),
  toggleLog: vi.fn(),
  selectDate: vi.fn(),
  ...overrides,
});

const renderCalendar = (context: ViewContextType) =>
  render(
    <MemoryRouter initialEntries={["/calendar"]}>
      <Routes>
        <Route path="/" element={<ContextLayout context={context} />}>
          <Route index element={<p>home-route</p>} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("Calendar view", () => {
  it("renders without crashing with outlet context", () => {
    renderCalendar(buildContext());

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Su")).toBeInTheDocument();
  });

  it("calls selectDate and navigates to home when a day is selected", () => {
    const selectDate = vi.fn();
    renderCalendar(buildContext({ selectDate }));

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(selectDate).toHaveBeenCalledTimes(1);
    expect(selectDate.mock.calls[0][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(screen.getByText("home-route")).toBeInTheDocument();
  });
});
