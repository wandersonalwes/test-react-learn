import { vi } from "vitest";
import "@testing-library/jest-dom";
import { useHotKey } from "./useHotKey";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("useHotKey", () => {
  const user = userEvent.setup();
  test("should listen to document events", async () => {
    const handler = vi.fn();
    renderHook(() => useHotKey("Enter", handler));
    await user.keyboard("[Enter]");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("should not fire when keys mismatch", async () => {
    const handler = vi.fn();
    renderHook(() => useHotKey("Shift", handler));
    await user.keyboard("[Enter]");
    expect(handler).not.toHaveBeenCalled();
  });
});
