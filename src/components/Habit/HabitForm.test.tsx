import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HabitForm from "./HabitForm";
import { COLORS } from "../../utils/constant";
import { createMockSupabaseManager } from "../../test/mockSupabaseManager";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("HabitForm", () => {
  it("renders and submits without crashing", async () => {
    const manager = createMockSupabaseManager();
    const createHabitSpy = vi.spyOn(manager.habitsClient, "createHabit");

    renderWithProviders(<HabitForm />, { manager });

    fireEvent.change(screen.getByPlaceholderText("New habit..."), {
      target: { value: "Read book" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(createHabitSpy).toHaveBeenCalledWith(
        { name: "Read book", color: COLORS[0] },
        expect.any(String)
      );
    });
  });
});
