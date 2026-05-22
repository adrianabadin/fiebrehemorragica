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

  return exceptions.map((exception) =>
    exception.date.toLocaleDateString("en-CA"),
  );
}
