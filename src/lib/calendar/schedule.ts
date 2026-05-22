import { isBlockedDate, nextFridayFrom } from "./calendar";

const SLOT_START_HOUR = 8;
const SLOT_START_MINUTE = 30;
const SLOT_SIZE_MINUTES = 10;
const MAX_SLOTS_PER_FRIDAY = 20;
const BATCH_SIZE = 10;

export function assignSlotsForBatch(input: {
  totalAssignedBeforeBatch: number;
  blockedDates: string[];
  startFrom?: string;
}) {
  const fridayIndex = Math.floor(input.totalAssignedBeforeBatch / MAX_SLOTS_PER_FRIDAY);
  const firstSlot = (input.totalAssignedBeforeBatch % MAX_SLOTS_PER_FRIDAY) + 1;
  const baseDate = input.startFrom
    ? (() => {
        const [year, month, day] = input.startFrom.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : new Date();
  let friday = nextFridayFrom(baseDate);

  for (let index = 0; index < fridayIndex; index += 1) {
    friday.setDate(friday.getDate() + 7);
  }

  let safetyCounter = 0;
  while (isBlockedDate(toLocalDateString(friday), input.blockedDates) && safetyCounter < 52) {
    friday.setDate(friday.getDate() + 7);
    safetyCounter += 1;
  }

  return Array.from({ length: BATCH_SIZE }, (_, index) => {
    const slotNumber = firstSlot + index;
    const zeroBasedSlot = slotNumber - 1;
    const totalMinutes = SLOT_START_HOUR * 60 + SLOT_START_MINUTE + zeroBasedSlot * SLOT_SIZE_MINUTES;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    return {
      slotNumber,
      date: toLocalDateString(friday),
      time: `${hours}:${minutes}`,
    };
  });
}

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
