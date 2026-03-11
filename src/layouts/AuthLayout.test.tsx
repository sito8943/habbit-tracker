import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import AuthLayout from "./AuthLayout";

describe("AuthLayout", () => {
  it("renders auth navigation and nested view", () => {
    render(
      <MemoryRouter initialEntries={["/auth/password-recovery"]}>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<p>Sign In content</p>} />
            <Route path="password-recovery" element={<p>Password Recovery content</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1, name: "Focus Habit" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Auth navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Password Recovery" })).toBeInTheDocument();
    expect(screen.getByText("Password Recovery content")).toBeInTheDocument();
  });
});
