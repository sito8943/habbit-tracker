import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import type { ReactElement } from "react";
import View from "./View";
import { createMockSupabaseManager } from "../test/mockSupabaseManager";
import { AppProviders } from "../providers";

const renderView = (indexElement: ReactElement = <p data-testid="outlet-content">outlet</p>) =>
  render(
    <AppProviders manager={createMockSupabaseManager()}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={indexElement} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>
  );

describe("View layout", () => {
  it("renders main layout with navbar", () => {
    renderView();

    expect(screen.getByRole("heading", { level: 1, name: "Focus Habit" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Today" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Calendar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign In / Sign Up" })).toBeInTheDocument();
  });

  it("renders nested route content", () => {
    renderView(<p data-testid="custom-outlet">custom-outlet</p>);

    expect(screen.getByTestId("custom-outlet")).toBeInTheDocument();
  });
});
