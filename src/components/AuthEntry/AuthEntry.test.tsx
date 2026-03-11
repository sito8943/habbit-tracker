import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import AuthEntry from "./AuthEntry";

describe("AuthEntry", () => {
  it("navigates to auth route on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<AuthEntry />} />
          <Route path="/auth" element={<h2>Auth route</h2>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign up / Sign in" }));

    expect(screen.getByRole("heading", { level: 2, name: "Auth route" })).toBeInTheDocument();
  });
});
