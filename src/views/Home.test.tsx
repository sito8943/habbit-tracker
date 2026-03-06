import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { COLORS } from "../utils/constant";
import type { ViewContextType } from "../layouts/View";
import Home from "./Home";

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

const renderHome = (context: ViewContextType) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<ContextLayout context={context} />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("Home view", () => {
  it("renders without crashing with outlet context", () => {
    renderHome(
      buildContext({
        habits: [
          { id: "habit-1", name: "Read", color: "#3498db" },
          { id: "habit-2", name: "Workout", color: "#2ecc71" },
        ],
        logs: [{ habitId: "habit-1", date: "2026-03-06" }],
      })
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2026-03-06 — 1/2 done");
    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("uses addHabit action from outlet context", () => {
    const addHabit = vi.fn();
    renderHome(buildContext({ addHabit }));

    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Write tests" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(addHabit).toHaveBeenCalledWith("Write tests", COLORS[0]);
  });
});
