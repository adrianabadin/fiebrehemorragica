import { prisma } from "@/lib/db/prisma";
import { assignSlotsForBatch } from "@/lib/calendar/schedule";
import { loadBlockedDates } from "@/lib/calendar/calendar";
import { updateAssignedTurnRow } from "@/lib/sheets/google-sheets";
import { sendTurnoEmail } from "@/lib/email/send-turno-email";

export async function processBatch(batch: { id: string }) {
  const reserved = await prisma.batch.findUnique({
    where: { id: batch.id },
    include: {
      requests: true,
    },
  });

  if (!reserved) {
    throw new Error(`Batch ${batch.id} not found`);
  }

  const totalAssignedBeforeBatch = await prisma.appointmentRequest.count({
    where: { status: "completed" },
  });
  const batchYear = new Date().getFullYear();
  const blockedDates = await loadBlockedDates(batchYear);

  const slots = await assignSlotsForBatch({ totalAssignedBeforeBatch, blockedDates });

  for (const [index, request] of reserved.requests.entries()) {
    const slot = slots[index];

    await prisma.appointmentRequest.update({
      where: { id: request.id },
      data: {
        status: "completed",
        scheduledAt: new Date(`${slot.date}T${slot.time}:00`),
        slotNumber: slot.slotNumber,
      },
    });

    if (!request.sheetRowNumber) {
      throw new Error(`Missing sheet row for request ${request.id}`);
    }

    await updateAssignedTurnRow({
      sheetRowNumber: request.sheetRowNumber,
      scheduledDate: slot.date,
      scheduledTime: slot.time,
    });

    await sendTurnoEmail({
      to: request.email,
      fullName: `${request.firstName} ${request.lastName}`,
      scheduledDate: slot.date,
      scheduledTime: slot.time,
    });
  }

  await prisma.batch.update({
    where: { id: batch.id },
    data: { status: "completed" },
  });
}