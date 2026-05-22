import { prisma } from "@/lib/db/prisma";
import { requestQueueMutex } from "@/lib/mutex";

export async function reserveBatchIfReady() {
  return requestQueueMutex.runExclusive(async () => {
    const pendingCount = await prisma.appointmentRequest.count({
      where: { status: "pending" },
    });

    if (pendingCount < 10) {
      return null;
    }

    const result = await prisma.$transaction(async (tx) => {
      const pendingRequests = await tx.appointmentRequest.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "asc" },
        take: 10,
      });

      if (pendingRequests.length < 10) {
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

      return { batch, requests: pendingRequests };
    });

    return result;
  });
}