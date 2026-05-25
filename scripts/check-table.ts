import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  try {
    const count = await prisma.scheduleRule.count();
    console.log("ScheduleRule table exists. Count:", count);
  } catch (e) {
    console.error("ScheduleRule table missing:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
