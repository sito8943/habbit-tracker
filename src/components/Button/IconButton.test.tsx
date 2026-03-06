import { render, screen } from "@testing-library/react";
import IconButton from "./IconButton";

describe("IconButton", () => {
  it("renders without crashing", () => {
    render(
      <IconButton aria-label="Delete">
        <span>x</span>
      </IconButton>
    );

    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
