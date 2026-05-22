import { describe, expect, it } from "vitest";
import { assignSlotsForBatch } from "./schedule";

describe("assignSlotsForBatch", () => {
  it("assigns 10 consecutive slots starting at 08:30", () => {
    const slots = assignSlotsForBatch({
      totalAssignedBeforeBatch: 0,
      blockedDates: [],
    });

    expect(slots[0].slotNumber).toBe(1);
    expect(slots[0].time).toBe("08:30");
    expect(slots[9].slotNumber).toBe(10);
    expect(slots[9].time).toBe("10:00");
  });

  it("uses the same Friday for slots 11 to 20", () => {
    const slots = assignSlotsForBatch({
      totalAssignedBeforeBatch: 10,
      blockedDates: [],
    });

    expect(slots[0].slotNumber).toBe(11);
    expect(slots[0].time).toBe("10:10");
    expect(slots[9].slotNumber).toBe(20);
    expect(slots[9].time).toBe("11:40");
  });

  it("skips a blocked Friday and moves the batch to the next Friday", () => {
    const slots = assignSlotsForBatch({
      totalAssignedBeforeBatch: 0,
      blockedDates: ["2026-10-23"],
      startFrom: "2026-10-01",
    });

    expect(slots[0].date).not.toBe("2026-10-23");
  });
});
