import { prisma } from "../db/prisma";

export function isBlockedDate(dateIso: string, blockedDates: string[]) {
  return blockedDates.includes(dateIso);
}

export function nextFridayFrom(date: Date): Date {
  const result = new Date(date);
  while (result.getDay() !== 5) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

export async function loadBlockedDates(year: number): Promise<string[]> {
  const exceptions = await prisma.calendarException.findMany({
    where: { year },
    select: { date: true },
  });

  return exceptions.map((exception: { date: Date }) =>
    exception.date.toLocaleDateString("en-CA"),
  );
}

export async function getActiveRule(date: Date) {
  const rule = await prisma.scheduleRule.findFirst({
    where: { validFrom: { lte: date } },
    orderBy: { validFrom: "desc" }
  });

  if (rule) return rule;

  return {
    dayOfWeek: 5,
    startTime: "08:30",
    endTime: "11:50",
    slotCount: 20
  };
}

export async function findNextAvailableFriday(
  afterDate: string,
  blockedDates: string[],
): Promise<string | null> {
  const [year, month, day] = afterDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  let friday = nextFridayFrom(start);

  for (let i = 0; i < 52; i++) {
    const fridayStr = friday.toLocaleDateString("en-CA");
    if (!isBlockedDate(fridayStr, blockedDates)) {
      const count = await prisma.appointmentRequest.count({
        where: {
          scheduledAt: {
            gte: new Date(fridayStr + "T00:00:00"),
            lt: new Date(
              new Date(fridayStr + "T00:00:00").getTime() + 86400000,
            ),
          },
          status: { not: "pending" },
        },
      });
      if (count < 20) {
        return fridayStr;
      }
    }
    friday.setDate(friday.getDate() + 7);
  }

  return null;
}

export async function findNextAvailableDay(
  afterDate: string,
  blockedDates: string[],
): Promise<string | null> {
  const [year, month, day] = afterDate.split("-").map(Number);
  let current = new Date(year, month - 1, day);

  for (let i = 0; i < 52; i++) {
    const rule = await getActiveRule(current);
    while (current.getDay() !== rule.dayOfWeek) {
      current.setDate(current.getDate() + 1);
    }

    const dateStr = current.toLocaleDateString("en-CA");
    if (!isBlockedDate(dateStr, blockedDates)) {
      const count = await prisma.appointmentRequest.count({
        where: {
          scheduledAt: {
            gte: new Date(dateStr + "T00:00:00"),
            lt: new Date(new Date(dateStr + "T00:00:00").getTime() + 86400000),
          },
          status: { not: "pending" },
        },
      });
      if (count < rule.slotCount) {
        return dateStr;
      }
    }
    current.setDate(current.getDate() + 7);
  }
  return null;
}
