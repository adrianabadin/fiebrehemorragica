import { describe, expect, it, vi } from "vitest";
import { assignSlotsForBatch } from "./schedule";
import { getActiveRule, findNextAvailableDay } from "./calendar";

vi.mock("../db/prisma", () => ({
  prisma: {
    scheduleRule: {
      findFirst: vi.fn(),
    },
    appointmentRequest: {
      count: vi.fn().mockResolvedValue(0),
    },
  },
}));

const { prisma: mockPrisma } = await import("../db/prisma");

describe("assignSlotsForBatch", () => {
  it("assigns 10 consecutive slots starting at 08:30", async () => {
    const slots = await assignSlotsForBatch({
      totalAssignedBeforeBatch: 0,
      blockedDates: [],
    });

    expect(slots[0].slotNumber).toBe(1);
    expect(slots[0].time).toBe("08:30");
    expect(slots[9].slotNumber).toBe(10);
    expect(slots[9].time).toBe("10:00");
  });

  it("uses the same Friday for slots 11 to 20", async () => {
    const slots = await assignSlotsForBatch({
      totalAssignedBeforeBatch: 10,
      blockedDates: [],
    });

    expect(slots[0].slotNumber).toBe(11);
    expect(slots[0].time).toBe("10:10");
    expect(slots[9].slotNumber).toBe(20);
    expect(slots[9].time).toBe("11:40");
  });

  it("skips a blocked Friday and moves the batch to the next Friday", async () => {
    const slots = await assignSlotsForBatch({
      totalAssignedBeforeBatch: 0,
      blockedDates: ["2026-10-23"],
      startFrom: "2026-10-01",
    });

    expect(slots[0].date).toBe("2026-10-02");
    expect(slots[0].slotNumber).toBe(1);
    expect(slots[9].date).toBe("2026-10-02");
  });
});

describe("getActiveRule", () => {
  it("returns the active rule when one exists", async () => {
    const mockRule = {
      id: 1,
      dayOfWeek: 3,
      startTime: "09:00",
      endTime: "12:00",
      slotCount: 15,
      validFrom: new Date("2026-01-01"),
    };
    (mockPrisma.scheduleRule.findFirst as any).mockResolvedValue(mockRule);

    const result = await getActiveRule(new Date("2026-06-15"));
    expect(result).toEqual(mockRule);
  });

  it("returns default rule when no active rule exists", async () => {
    (mockPrisma.scheduleRule.findFirst as any).mockResolvedValue(null);

    const result = await getActiveRule(new Date("2026-06-15"));
    expect(result).toEqual({
      dayOfWeek: 5,
      startTime: "08:30",
      endTime: "11:50",
      slotCount: 20,
    });
  });
});

describe("findNextAvailableDay", () => {
  beforeEach(() => {
    (mockPrisma.scheduleRule.findFirst as any).mockResolvedValue(null);
    (mockPrisma.appointmentRequest.count as any).mockResolvedValue(0);
  });

  it("returns the next available day matching the rule", async () => {
    const result = await findNextAvailableDay("2026-06-01", []);
    // June 1, 2026 is Monday; next Friday is June 5
    expect(result).toBe("2026-06-05");
  });

  it("skips a blocked day and returns the next available one", async () => {
    const result = await findNextAvailableDay("2026-06-01", ["2026-06-05"]);
    expect(result).toBe("2026-06-12");
  });

  it("respects a custom rule dayOfWeek", async () => {
    (mockPrisma.scheduleRule.findFirst as any).mockResolvedValue({
      dayOfWeek: 3,
      startTime: "09:00",
      endTime: "12:00",
      slotCount: 15,
      validFrom: new Date("2026-01-01"),
    });

    const result = await findNextAvailableDay("2026-06-01", []);
    // June 1, 2026 is Monday; next Wednesday is June 3
    expect(result).toBe("2026-06-03");
  });

  it("skips a day when slots are full", async () => {
    (mockPrisma.appointmentRequest.count as any)
      .mockResolvedValueOnce(20)
      .mockResolvedValue(0);

    const result = await findNextAvailableDay("2026-06-01", []);
    // June 5 is full, so next Friday June 12
    expect(result).toBe("2026-06-12");
  });

  it("returns null when all matching days are blocked", async () => {
    const allFridays: string[] = [];
    const d = new Date(2026, 5, 5);
    for (let i = 0; i < 52; i++) {
      allFridays.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      );
      d.setDate(d.getDate() + 7);
    }
    const result = await findNextAvailableDay("2026-06-01", allFridays);
    expect(result).toBeNull();
  });
});
