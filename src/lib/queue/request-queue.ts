import { prisma } from "@/lib/db/prisma";
import { requestQueueMutex } from "@/lib/mutex";

export async function reserveBatchIfReady() {
  return requestQueueMutex.runExclusive(async () => {
    const pendingRequests = await prisma.appointmentRequest.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    if (pendingRequests.length < 10) {
      return null;
    }

    const batch = await prisma.batch.create({
      data: {
        status: "processing",
      },
    });

    await prisma.appointmentRequest.updateMany({
      where: { id: { in: pendingRequests.map((request) => request.id) } },
      data: { status: "processing", batchId: batch.id },
    });

    return { batch, requests: pendingRequests };
  });
}