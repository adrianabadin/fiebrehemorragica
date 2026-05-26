import { prisma } from "@/lib/db/prisma";
import { assignSlotsForBatch } from "@/lib/calendar/schedule";
import { loadBlockedDates } from "@/lib/calendar/calendar";
import { updateAssignedTurnRow } from "@/lib/sheets/google-sheets";
import { sendTurnoEmail } from "@/lib/email/send-turno-email";

export async function processBatch(batch: { id: string }) {
  console.log(`[BATCH] Starting processBatch for batch ${batch.id}`);

  const reserved = await prisma.batch.findUnique({
    where: { id: batch.id },
    include: {
      requests: true,
    },
  });

  if (!reserved) {
    throw new Error(`Batch ${batch.id} not found`);
  }

  console.log(`[BATCH] Found batch with ${reserved.requests.length} requests`);

  const totalAssignedBeforeBatch = await prisma.appointmentRequest.count({
    where: { status: "completed" },
  });
  const batchYear = new Date().getFullYear();
  console.log(`[BATCH] totalAssignedBeforeBatch=${totalAssignedBeforeBatch}, year=${batchYear}`);

  const blockedDates = await loadBlockedDates(batchYear);
  console.log(`[BATCH] Loaded ${blockedDates.length} blocked dates`);

  const slots = await assignSlotsForBatch({ totalAssignedBeforeBatch, blockedDates });
  console.log(`[BATCH] Assigned ${slots.length} slots`);

  for (const [index, request] of reserved.requests.entries()) {
    const slot = slots[index];
    console.log(`[BATCH] Processing request ${index + 1}/${reserved.requests.length}: id=${request.id} email=${request.email} slot=${slot.date} ${slot.time}`);

    if (!request.sheetRowNumber) {
      console.error(`[BATCH] Missing sheetRowNumber for request ${request.id}`);
      throw new Error(`Missing sheet row for request ${request.id}`);
    }

    console.log(`[BATCH] Updating sheet row ${request.sheetRowNumber} for request ${request.id}`);
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

    await prisma.appointmentRequest.update({
      where: { id: request.id },
      data: {
        status: "completed",
        scheduledAt: new Date(`${slot.date}T${slot.time}:00`),
        slotNumber: slot.slotNumber,
      },
    });

    console.log(`[BATCH] Request ${index + 1} completed`);
  }

  await prisma.batch.update({
    where: { id: batch.id },
    data: { status: "completed" },
  });

  console.log(`[BATCH] Batch ${batch.id} completed successfully`);
}