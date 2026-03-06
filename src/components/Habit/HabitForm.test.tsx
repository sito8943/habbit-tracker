import { fireEvent, render, screen } from "@testing-library/react";
import { COLORS } from "../../utils/constant";
import HabitForm from "./HabitForm";

describe("HabitForm", () => {
  it("renders and submits without crashing", () => {
    const onAdd = vi.fn();

    render(<HabitForm onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Read book" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(onAdd).toHaveBeenCalledWith("Read book", COLORS[0]);
  });
});
