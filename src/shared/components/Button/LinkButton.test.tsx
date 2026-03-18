import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LinkButton from "./LinkButton";

describe("LinkButton", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LinkButton to="/calendar">Calendar</LinkButton>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Calendar" })).toHaveAttribute("href", "/calendar");
  });
});
