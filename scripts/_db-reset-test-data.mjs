import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleted = await prisma.appointmentRequest.deleteMany({
  where: {
    OR: [
      { email: { contains: "testturno" } },
      { email: { contains: "mailsac.com" } },
      { sheetRowNumber: null, status: { in: ["pending", "processing"] } },
    ],
  },
});
console.log(`Deleted ${deleted.count} test/stuck requests`);

const deletedBatches = await prisma.batch.deleteMany({
  where: { status: "processing" },
});
console.log(`Deleted ${deletedBatches.count} orphaned batches`);

await prisma.$disconnect();
