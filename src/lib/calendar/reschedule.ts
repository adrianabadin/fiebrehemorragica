import { prisma } from "@/lib/db/prisma";
import {
  loadBlockedDates,
  findNextAvailableFriday,
  findNextAvailableDay,
  getActiveRule,
} from "./calendar";
import { sendRescheduleEmail } from "@/lib/email/send-reschedule-email";

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export async function reassignAppointmentsForDate(date: string): Promise<{
  rescheduledCount: number;
  newDate: string | null;
}> {
  const year = parseInt(date.split("-")[0], 10);
  const nextYear = year + 1;
  const blockedDates = [
    ...(await loadBlockedDates(year)),
    ...(await loadBlockedDates(nextYear)),
    date,
  ];

  const appointments = await prisma.appointmentRequest.findMany({
    where: {
      scheduledAt: {
        gte: new Date(date + "T00:00:00"),
        lt: new Date(
          new Date(date + "T00:00:00").getTime() + 86400000,
        ),
      },
      status: { not: "pending" },
    },
  });

  if (appointments.length === 0) {
    return { rescheduledCount: 0, newDate: null };
  }

  const nextDate = await findNextAvailableFriday(date, blockedDates);

  if (!nextDate) {
    throw new Error("No hay fecha disponible");
  }

  const existingCount = await prisma.appointmentRequest.count({
    where: {
      scheduledAt: {
        gte: new Date(nextDate + "T00:00:00"),
        lt: new Date(
          new Date(nextDate + "T00:00:00").getTime() + 86400000,
        ),
      },
      status: { not: "pending" },
    },
  });

  const SLOT_START_HOUR = 8;
  const SLOT_START_MINUTE = 30;
  const SLOT_SIZE_MINUTES = 10;

  for (let i = 0; i < appointments.length; i++) {
    const appt = appointments[i];
    const slotNumber = existingCount + i + 1;
    const zeroBasedSlot = slotNumber - 1;
    const totalMinutes =
      SLOT_START_HOUR * 60 +
      SLOT_START_MINUTE +
      zeroBasedSlot * SLOT_SIZE_MINUTES;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    await prisma.appointmentRequest.update({
      where: { id: appt.id },
      data: {
        scheduledAt: new Date(nextDate + "T00:00:00"),
        slotNumber,
      },
    });

    try {
      await sendRescheduleEmail({
        to: appt.email,
        fullName: `${appt.firstName} ${appt.lastName}`,
        oldDate: date,
        newDate: nextDate,
        newTime: `${hours}:${minutes}`,
      });
    } catch (err) {
      console.error(`Failed to send reschedule email to ${appt.email}:`, err);
    }
  }

  return { rescheduledCount: appointments.length, newDate: nextDate };
}

export async function rescheduleAppointments(
  appointments: {
    id: string;
    scheduledAt: Date;
    email: string;
    firstName: string;
    lastName: string;
  }[],
) {
  const currentYear = new Date().getFullYear();
  const blockedDates = [
    ...(await loadBlockedDates(currentYear)),
    ...(await loadBlockedDates(currentYear + 1)),
  ];

  const results: {
    id: string;
    oldDate: string;
    newDate: string;
    newTime: string;
    slotNumber: number;
  }[] = [];

  for (const appt of appointments) {
    const oldDate = appt.scheduledAt.toLocaleDateString("en-CA");
    const newDate = await findNextAvailableDay(oldDate, blockedDates);

    if (!newDate) {
      console.error(`No available day found for appointment ${appt.id}`);
      continue;
    }

    const existingCount = await prisma.appointmentRequest.count({
      where: {
        scheduledAt: {
          gte: new Date(newDate + "T00:00:00"),
          lt: new Date(
            new Date(newDate + "T00:00:00").getTime() + 86400000,
          ),
        },
        status: { not: "pending" },
      },
    });

    const rule = await getActiveRule(new Date(newDate + "T00:00:00"));
    const startTimeMinutes = timeToMinutes(rule.startTime);
    const endTimeMinutes = timeToMinutes(rule.endTime);
    const slotDuration =
      (endTimeMinutes - startTimeMinutes) / rule.slotCount;

    const slotNumber = existingCount + 1;
    const zeroBasedSlot = slotNumber - 1;
    const totalMinutes = startTimeMinutes + zeroBasedSlot * slotDuration;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(Math.round(totalMinutes % 60)).padStart(2, "0");
    const newTime = `${hours}:${minutes}`;

    await prisma.appointmentRequest.update({
      where: { id: appt.id },
      data: {
        scheduledAt: new Date(newDate + "T00:00:00"),
        slotNumber,
      },
    });

    try {
      await sendRescheduleEmail({
        to: appt.email,
        fullName: `${appt.firstName} ${appt.lastName}`,
        oldDate,
        newDate,
        newTime,
      });
    } catch (err) {
      console.error(
        `Failed to send reschedule email to ${appt.email}:`,
        err,
      );
    }

    results.push({ id: appt.id, oldDate, newDate, newTime, slotNumber });
  }

  return results;
}
