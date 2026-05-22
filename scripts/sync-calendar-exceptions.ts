import { prisma } from "../src/lib/db/prisma";

const CHIVILCOY_LOCAL_MONTH = 10;
const CHIVILCOY_LOCAL_DAY = 22;

async function main() {
  const year = Number(process.argv[2] ?? new Date().getFullYear());
  console.log(`Syncing calendar exceptions for ${year}`);

  const sourceUrl = `https://www.argentina.gob.ar/jefatura/feriados-nacionales-${year}`;
  console.log(`Fetching: ${sourceUrl}`);

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch holidays: ${response.status}`);
  }

  const html = await response.text();
  const matches = html.match(/\b\d{2}\/\d{2}\/\d{4}\b/g) ?? [];
  const uniqueDates = [...new Set(matches)].map((value) => {
    const [day, month, fullYear] = value.split("/");
    return `${fullYear}-${month}-${day}`;
  });

  console.log(`Found ${uniqueDates.length} holiday dates`);

  const chivilcoyDate = new Date(`${year}-${String(CHIVILCOY_LOCAL_MONTH).padStart(2, "0")}-${String(CHIVILCOY_LOCAL_DAY).padStart(2, "0")}T00:00:00.000Z`);

  await prisma.calendarException.upsert({
    where: { date: chivilcoyDate },
    update: {
      type: "local-chivilcoy",
      label: "Excepcion local Chivilcoy",
      sourceUrl: "manual-fixed-rule",
      year,
    },
    create: {
      date: chivilcoyDate,
      type: "local-chivilcoy",
      label: "Excepcion local Chivilcoy",
      sourceUrl: "manual-fixed-rule",
      year,
    },
  });

  console.log(`Upserted Chivilcoy exception for ${year}-${CHIVILCOY_LOCAL_MONTH}-${CHIVILCOY_LOCAL_DAY}`);

  for (const dateStr of uniqueDates) {
    const date = new Date(`${dateStr}T00:00:00.000Z`);

    await prisma.calendarException.upsert({
      where: { date },
      update: {
        type: "national",
        label: "Feriado nacional",
        sourceUrl,
        year,
      },
      create: {
        date,
        type: "national",
        label: "Feriado nacional",
        sourceUrl,
        year,
      },
    });
  }

  console.log(`Upserted ${uniqueDates.length} national holidays`);
  console.log("Calendar sync complete");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});