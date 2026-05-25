import { isBlockedDate, getActiveRule } from "./calendar";

const BATCH_SIZE = 10;

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function nextDayOfWeekFrom(date: Date, dayOfWeek: number): Date {
  const result = new Date(date);
  while (result.getDay() !== dayOfWeek) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export async function assignSlotsForBatch(input: {
  totalAssignedBeforeBatch: number;
  blockedDates: string[];
  startFrom?: string;
}) {
  const baseDate = input.startFrom
    ? (() => {
        const [year, month, day] = input.startFrom.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : new Date();

  const rule = await getActiveRule(baseDate);

  const startTimeMinutes = timeToMinutes(rule.startTime);
  const endTimeMinutes = timeToMinutes(rule.endTime);
  const slotDuration = (endTimeMinutes - startTimeMinutes) / rule.slotCount;

  const weekIndex = Math.floor(input.totalAssignedBeforeBatch / rule.slotCount);
  const firstSlot = (input.totalAssignedBeforeBatch % rule.slotCount) + 1;

  let targetDate = nextDayOfWeekFrom(baseDate, rule.dayOfWeek);

  for (let index = 0; index < weekIndex; index += 1) {
    targetDate.setDate(targetDate.getDate() + 7);
  }

  let safetyCounter = 0;
  while (
    isBlockedDate(toLocalDateString(targetDate), input.blockedDates) &&
    safetyCounter < 52
  ) {
    targetDate.setDate(targetDate.getDate() + 7);
    safetyCounter += 1;
  }

  return Array.from({ length: BATCH_SIZE }, (_, index) => {
    const slotNumber = firstSlot + index;
    const zeroBasedSlot = slotNumber - 1;
    const totalMinutes = startTimeMinutes + zeroBasedSlot * slotDuration;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(Math.round(totalMinutes % 60)).padStart(2, "0");

    return {
      slotNumber,
      date: toLocalDateString(targetDate),
      time: `${hours}:${minutes}`,
    };
  });
}
