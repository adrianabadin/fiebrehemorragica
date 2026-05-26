import { prisma } from "@/lib/db/prisma";
import { requestQueueMutex } from "@/lib/mutex";

export async function reserveBatchIfReady() {
  return requestQueueMutex.runExclusive(async () => {
    const pendingCount = await prisma.appointmentRequest.count({
      where: { status: "pending" },
    });

    console.log(`[QUEUE] Current pending count: ${pendingCount}`);

    if (pendingCount < 10) {
      return null;
    }

    console.log(`[QUEUE] Threshold reached (${pendingCount} pending), reserving batch`);

    const result = await prisma.$transaction(async (tx) => {
      const pendingRequests = await tx.appointmentRequest.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "asc" },
        take: 10,
      });

      if (pendingRequests.length < 10) {
        console.log(`[QUEUE] Race condition: only ${pendingRequests.length} pending inside transaction, aborting`);
        return null;
      }

      const batch = await tx.batch.create({
        data: {
          status: "processing",
        },
      });

      await tx.appointmentRequest.updateMany({
        where: { id: { in: pendingRequests.map((request) => request.id) } },
        data: { status: "processing", batchId: batch.id },
      });

      console.log(`[QUEUE] Batch ${batch.id} created with ${pendingRequests.length} requests`);
      return { batch, requests: pendingRequests };
    });

    return result;
  });
}