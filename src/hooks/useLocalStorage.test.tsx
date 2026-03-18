import { act, renderHook, waitFor } from "@testing-library/react";
import useLocalStorage from "../shared/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns initial value when key is not present", () => {
    const { result } = renderHook(() => useLocalStorage<string[]>("missing-key", []));

    expect(result.current[0]).toEqual([]);
  });

  it("uses saved localStorage value when key exists", () => {
    localStorage.setItem("saved-key", JSON.stringify(["read"]));

    const { result } = renderHook(() => useLocalStorage<string[]>("saved-key", []));

    expect(result.current[0]).toEqual(["read"]);
  });

  it("persists updates in localStorage", async () => {
    const { result } = renderHook(() => useLocalStorage<string[]>("persist-key", []));

    act(() => {
      result.current[1]((prev) => [...prev, "write tests"]);
    });

    await waitFor(() => {
      expect(localStorage.getItem("persist-key")).toBe(JSON.stringify(["write tests"]));
    });
  });
});
