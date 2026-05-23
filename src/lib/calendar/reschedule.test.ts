import { describe, expect, it, vi } from "vitest";
import { findNextAvailableFriday } from "./calendar";

vi.mock("../db/prisma", () => ({
  prisma: {
    appointmentRequest: {
      count: vi.fn().mockResolvedValue(0),
    },
  },
}));

describe("findNextAvailableFriday", () => {
  it("returns the next friday when no dates are blocked and no appointments", async () => {
    const result = await findNextAvailableFriday("2026-06-01", []);
    expect(result).toBe("2026-06-05");
  });

  it("skips a blocked friday", async () => {
    const result = await findNextAvailableFriday("2026-06-01", ["2026-06-05"]);
    expect(result).toBe("2026-06-12");
  });

  it("skips multiple blocked fridays", async () => {
    const result = await findNextAvailableFriday("2026-06-01", [
      "2026-06-05",
      "2026-06-12",
    ]);
    expect(result).toBe("2026-06-19");
  });

  it("returns null when all 52 fridays are blocked", async () => {
    const allFridays: string[] = [];
    const d = new Date(2026, 5, 5);
    for (let i = 0; i < 52; i++) {
      allFridays.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      );
      d.setDate(d.getDate() + 7);
    }
    const result = await findNextAvailableFriday("2026-06-01", allFridays);
    expect(result).toBeNull();
  });
});
