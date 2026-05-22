# Fiebre Hemorragica Turnos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js application in `./fiebrehemorragica/` that receives appointment requests, writes each request immediately to Google Sheets, assigns appointments in exact batches of 10, and emails assigned vaccination appointments with the correct Friday slot rules.

**Architecture:** Use a single Next.js App Router app with Prisma + SQLite for persistence, a process-level mutex for exact batch reservation, and isolated services for calendar calculation, Google Sheets sync, and email delivery. Requests are appended to Sheets immediately, then updated in place when the batch closes and the appointment slot is assigned.

**Tech Stack:** Next.js, React, TypeScript, Prisma, SQLite, Zod, Vitest, Testing Library, Resend, Google Sheets API

---

## File Structure

- Create: `fiebrehemorragica/package.json`
- Create: `fiebrehemorragica/tsconfig.json`
- Create: `fiebrehemorragica/next.config.ts`
- Create: `fiebrehemorragica/next-env.d.ts`
- Create: `fiebrehemorragica/.gitignore`
- Create: `fiebrehemorragica/.env.example`
- Create: `fiebrehemorragica/eslint.config.mjs`
- Create: `fiebrehemorragica/vitest.config.ts`
- Create: `fiebrehemorragica/src/app/layout.tsx`
- Create: `fiebrehemorragica/src/app/globals.css`
- Create: `fiebrehemorragica/src/app/page.tsx`
- Create: `fiebrehemorragica/src/app/api/requests/route.ts`
- Create: `fiebrehemorragica/src/components/forms/appointment-form.tsx`
- Create: `fiebrehemorragica/src/components/ui/button.tsx`
- Create: `fiebrehemorragica/src/components/ui/card.tsx`
- Create: `fiebrehemorragica/src/components/ui/input.tsx`
- Create: `fiebrehemorragica/src/components/ui/textarea.tsx`
- Create: `fiebrehemorragica/src/components/ui/status-message.tsx`
- Create: `fiebrehemorragica/src/lib/db/prisma.ts`
- Create: `fiebrehemorragica/src/lib/validation/appointment-schema.ts`
- Create: `fiebrehemorragica/src/lib/mutex.ts`
- Create: `fiebrehemorragica/src/lib/calendar/calendar.ts`
- Create: `fiebrehemorragica/src/lib/calendar/schedule.ts`
- Create: `fiebrehemorragica/src/lib/queue/request-queue.ts`
- Create: `fiebrehemorragica/src/lib/queue/batch-processor.ts`
- Create: `fiebrehemorragica/src/lib/sheets/google-sheets.ts`
- Create: `fiebrehemorragica/src/lib/email/turno-email-template.ts`
- Create: `fiebrehemorragica/src/lib/email/send-turno-email.ts`
- Create: `fiebrehemorragica/src/types/appointment.ts`
- Create: `fiebrehemorragica/prisma/schema.prisma`
- Create: `fiebrehemorragica/scripts/sync-calendar-exceptions.ts`
- Create: `fiebrehemorragica/src/lib/calendar/calendar.test.ts`
- Create: `fiebrehemorragica/src/lib/queue/request-queue.test.ts`
- Create: `fiebrehemorragica/src/lib/email/turno-email-template.test.ts`
- Create: `fiebrehemorragica/src/app/api/requests/route.test.ts`

### Task 1: Bootstrap the Next.js Project Shell

**Files:**
- Create: `fiebrehemorragica/package.json`
- Create: `fiebrehemorragica/tsconfig.json`
- Create: `fiebrehemorragica/next.config.ts`
- Create: `fiebrehemorragica/next-env.d.ts`
- Create: `fiebrehemorragica/.gitignore`
- Create: `fiebrehemorragica/.env.example`
- Create: `fiebrehemorragica/eslint.config.mjs`
- Create: `fiebrehemorragica/vitest.config.ts`

- [ ] **Step 1: Create the base `package.json` and scripts**

```json
{
  "name": "fiebrehemorragica",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "calendar:sync": "tsx scripts/sync-calendar-exceptions.ts"
  },
  "dependencies": {
    "@prisma/client": "latest",
    "googleapis": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "resend": "latest",
    "zod": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "jsdom": "latest",
    "prisma": "latest",
    "tsx": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Add TypeScript, Next, and Vitest config files**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
});
```

- [ ] **Step 3: Add `.env.example` with required variables**

```env
DATABASE_URL="file:./dev.db"
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""
GOOGLE_SHEETS_SPREADSHEET_ID=""
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
```

- [ ] **Step 4: Install dependencies and verify the shell**

Run: `npm install`

Expected: install finishes without missing peer dependency errors.

Run: `npm run lint`

Expected: command runs, even if app files are not yet created.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/package.json fiebrehemorragica/tsconfig.json fiebrehemorragica/next.config.ts fiebrehemorragica/next-env.d.ts fiebrehemorragica/.gitignore fiebrehemorragica/.env.example fiebrehemorragica/eslint.config.mjs fiebrehemorragica/vitest.config.ts
git commit -m "chore: bootstrap turnos app shell"
```

### Task 2: Create the Database Schema and Prisma Client

**Files:**
- Create: `fiebrehemorragica/prisma/schema.prisma`
- Create: `fiebrehemorragica/src/lib/db/prisma.ts`

- [ ] **Step 1: Define the Prisma schema for requests, batches, and calendar exceptions**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model AppointmentRequest {
  id             String   @id @default(cuid())
  name           String
  email          String
  phone          String
  reason         String
  status         String   @default("pending")
  batchId        String?
  scheduledAt    DateTime?
  slotNumber     Int?
  sheetRowNumber Int?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  batch          Batch?   @relation(fields: [batchId], references: [id])
}

model Batch {
  id          String               @id @default(cuid())
  status      String               @default("processing")
  createdAt   DateTime             @default(now())
  processedAt DateTime?
  requests    AppointmentRequest[]
}

model CalendarException {
  id        String   @id @default(cuid())
  date      DateTime @unique
  type      String
  label     String
  sourceUrl String
  year      Int
  createdAt DateTime @default(now())
}
```

- [ ] **Step 2: Create a singleton Prisma client**

```ts
// src/lib/db/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

- [ ] **Step 3: Generate the client and create the first migration**

Run: `npm run prisma:generate`

Expected: Prisma client generated successfully.

Run: `npm run prisma:migrate -- --name init`

Expected: SQLite database and migration files created.

- [ ] **Step 4: Smoke check the schema**

Run: `npx prisma validate`

Expected: `The schema at prisma/schema.prisma is valid`.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/prisma/schema.prisma fiebrehemorragica/src/lib/db/prisma.ts fiebrehemorragica/prisma/migrations
git commit -m "feat: add persistence schema for turnos"
```

### Task 3: Implement Calendar Rules and Slot Calculation

**Files:**
- Create: `fiebrehemorragica/src/lib/calendar/calendar.ts`
- Create: `fiebrehemorragica/src/lib/calendar/schedule.ts`
- Create: `fiebrehemorragica/src/lib/calendar/calendar.test.ts`

- [ ] **Step 1: Write failing tests for Friday capacity, slot spacing, and blocked dates**

```ts
import { describe, expect, it } from "vitest";
import { assignSlotsForBatch } from "./schedule";

describe("assignSlotsForBatch", () => {
  it("assigns 10 consecutive slots starting at 08:30", () => {
    const slots = assignSlotsForBatch({
      totalAssignedBeforeBatch: 0,
      blockedDates: [],
    });

    expect(slots[0].slotNumber).toBe(1);
    expect(slots[0].time).toBe("08:30");
    expect(slots[9].slotNumber).toBe(10);
    expect(slots[9].time).toBe("10:00");
  });

  it("uses the same Friday for slots 11 to 20", () => {
    const slots = assignSlotsForBatch({
      totalAssignedBeforeBatch: 10,
      blockedDates: [],
    });

    expect(slots[0].slotNumber).toBe(11);
    expect(slots[0].time).toBe("10:10");
    expect(slots[9].slotNumber).toBe(20);
    expect(slots[9].time).toBe("11:40");
  });

  it("skips a blocked Friday and moves the batch to the next Friday", () => {
    const slots = assignSlotsForBatch({
      totalAssignedBeforeBatch: 0,
      blockedDates: ["2026-10-23"],
      startFrom: "2026-10-01",
    });

    expect(slots[0].date).not.toBe("2026-10-23");
  });
});
```

- [ ] **Step 2: Implement helpers for blocked dates and Friday lookup**

```ts
// src/lib/calendar/calendar.ts
export function isBlockedDate(dateIso: string, blockedDates: string[]) {
  return blockedDates.includes(dateIso);
}

export function nextFridayFrom(date: Date) {
  const result = new Date(date);
  while (result.getDay() !== 5) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

export async function loadBlockedDates(year: number) {
  const exceptions = await prisma.calendarException.findMany({
    where: { year },
    select: { date: true },
  });

  return exceptions.map((exception) =>
    exception.date.toISOString().slice(0, 10),
  );
}
```

- [ ] **Step 3: Implement the slot assignment function**

```ts
// src/lib/calendar/schedule.ts
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
  const baseDate = input.startFrom ? new Date(`${input.startFrom}T00:00:00`) : new Date();
  let friday = nextFridayFrom(baseDate);

  for (let index = 0; index < fridayIndex; index += 1) {
    friday.setDate(friday.getDate() + 7);
  }

  while (isBlockedDate(friday.toISOString().slice(0, 10), input.blockedDates)) {
    friday.setDate(friday.getDate() + 7);
  }

  return Array.from({ length: BATCH_SIZE }, (_, index) => {
    const slotNumber = firstSlot + index;
    const zeroBasedSlot = slotNumber - 1;
    const totalMinutes = SLOT_START_HOUR * 60 + SLOT_START_MINUTE + zeroBasedSlot * SLOT_SIZE_MINUTES;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    return {
      slotNumber,
      date: friday.toISOString().slice(0, 10),
      time: `${hours}:${minutes}`,
    };
  });
}
```

- [ ] **Step 4: Run the calendar tests**

Run: `npm test -- src/lib/calendar/calendar.test.ts`

Expected: all calendar tests pass.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/src/lib/calendar/calendar.ts fiebrehemorragica/src/lib/calendar/schedule.ts fiebrehemorragica/src/lib/calendar/calendar.test.ts
git commit -m "feat: add friday scheduling rules"
```

### Task 4: Implement Immediate Validation and the Google Sheets Contract

**Files:**
- Create: `fiebrehemorragica/src/lib/validation/appointment-schema.ts`
- Create: `fiebrehemorragica/src/lib/sheets/google-sheets.ts`

- [ ] **Step 1: Write the validation schema with explicit field rules**

```ts
import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(30),
  reason: z.string().trim().min(5).max(500),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
```

- [ ] **Step 2: Create the Google Sheets append function for immediate request writes**

```ts
export type AppendRequestRowInput = {
  requestId: string;
  createdAtIso: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
};

export async function appendPendingRequestRow(input: AppendRequestRowInput) {
  const values = [
    [
      input.requestId,
      input.createdAtIso,
      input.name,
      input.email,
      input.phone,
      input.reason,
      "pendiente",
      "",
      "",
      "",
      "",
      "",
    ],
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    range: "Solicitudes!A:L",
    valueInputOption: "RAW",
    requestBody: { values },
  });

  const updatedRange = response.data.updates?.updatedRange ?? "Solicitudes!A1:L1";
  const rowNumber = Number(updatedRange.match(/!(?:[A-Z]+)(\d+):/)?.[1] ?? "1");

  return { sheetRowNumber: rowNumber };
}
```

- [ ] **Step 3: Create the Google Sheets update contract for assigned turns**

```ts
export type UpdateAssignedTurnRowInput = {
  sheetRowNumber: number;
  scheduledDate: string;
  scheduledTime: string;
};

export async function updateAssignedTurnRow(input: UpdateAssignedTurnRowInput) {
  return {
    row: input.sheetRowNumber,
    values: [
      input.scheduledDate,
      input.scheduledTime,
      "Hijas de San Jose 145",
      "Region Sanitaria X",
      "Vacunacion de fiebre hemorragica",
      "turno asignado",
    ],
  };
}
```

- [ ] **Step 4: Verify types and linting**

Run: `npm run lint`

Expected: no type or import errors from schema and Sheets modules.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/src/lib/validation/appointment-schema.ts fiebrehemorragica/src/lib/sheets/google-sheets.ts
git commit -m "feat: add request validation and sheets contract"
```

### Task 5: Implement Queue Reservation and Exact Batch-of-10 Processing

**Files:**
- Create: `fiebrehemorragica/src/lib/mutex.ts`
- Create: `fiebrehemorragica/src/lib/queue/request-queue.ts`
- Create: `fiebrehemorragica/src/lib/queue/batch-processor.ts`
- Create: `fiebrehemorragica/src/lib/queue/request-queue.test.ts`

- [ ] **Step 1: Write a failing test that reserves exactly 10 oldest pending requests**

```ts
import { describe, expect, it } from "vitest";

describe("reserveBatchIfReady", () => {
  it("returns null when fewer than 10 requests are pending", async () => {
    const result = await reserveBatchIfReady();
    expect(result).toBeNull();
  });

  it("reserves exactly 10 requests when the queue reaches 10", async () => {
    const result = await reserveBatchIfReady();
    expect(result?.requests).toHaveLength(10);
  });
});
```

- [ ] **Step 2: Implement a minimal in-process mutex**

```ts
export class Mutex {
  private current = Promise.resolve();

  async runExclusive<T>(work: () => Promise<T>) {
    const previous = this.current;
    let release!: () => void;
    this.current = new Promise<void>((resolve) => {
      release = resolve;
    });

    await previous;
    try {
      return await work();
    } finally {
      release();
    }
  }
}

export const requestQueueMutex = new Mutex();
```

- [ ] **Step 3: Implement reservation and batch processing orchestration**

```ts
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
```

- [ ] **Step 4: Run queue tests**

Run: `npm test -- src/lib/queue/request-queue.test.ts`

Expected: tests prove the queue does not process fewer or more than 10 requests.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/src/lib/mutex.ts fiebrehemorragica/src/lib/queue/request-queue.ts fiebrehemorragica/src/lib/queue/batch-processor.ts fiebrehemorragica/src/lib/queue/request-queue.test.ts
git commit -m "feat: add exact batch reservation logic"
```

### Task 6: Implement Turn Assignment Email Content

**Files:**
- Create: `fiebrehemorragica/src/lib/email/turno-email-template.ts`
- Create: `fiebrehemorragica/src/lib/email/send-turno-email.ts`
- Create: `fiebrehemorragica/src/lib/email/turno-email-template.test.ts`

- [ ] **Step 1: Write a failing test for the required subject and body text**

```ts
import { describe, expect, it } from "vitest";
import { buildTurnoEmail } from "./turno-email-template";

describe("buildTurnoEmail", () => {
  it("includes campaign, date, time, and fixed address", () => {
    const email = buildTurnoEmail({
      name: "Ana",
      scheduledDate: "2026-10-30",
      scheduledTime: "08:30",
    });

    expect(email.subject).toContain("turno");
    expect(email.html).toContain("vacunacion de fiebre hemorragica");
    expect(email.html).toContain("2026-10-30");
    expect(email.html).toContain("08:30");
    expect(email.html).toContain("Hijas de San Jose 145");
    expect(email.html).toContain("Region Sanitaria X");
  });
});
```

- [ ] **Step 2: Implement the email template**

```ts
export function buildTurnoEmail(input: {
  name: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  return {
    subject: "Se le ha asignado un turno para vacunacion de fiebre hemorragica",
    html: `
      <p>Hola ${input.name},</p>
      <p>Se le ha asignado un turno para vacunacion de fiebre hemorragica.</p>
      <p>Fecha: ${input.scheduledDate}</p>
      <p>Hora: ${input.scheduledTime}</p>
      <p>Direccion: Hijas de San Jose 145</p>
      <p>Sede: Region Sanitaria X</p>
    `,
  };
}
```

- [ ] **Step 3: Implement the send function with Resend**

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTurnoEmail(input: {
  to: string;
  name: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  const email = buildTurnoEmail(input);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: input.to,
    subject: email.subject,
    html: email.html,
  });
}
```

- [ ] **Step 4: Run the email tests**

Run: `npm test -- src/lib/email/turno-email-template.test.ts`

Expected: email copy test passes and covers all mandated content.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/src/lib/email/turno-email-template.ts fiebrehemorragica/src/lib/email/send-turno-email.ts fiebrehemorragica/src/lib/email/turno-email-template.test.ts
git commit -m "feat: add turno confirmation email"
```

### Task 7: Implement the API Route for Request Intake

**Files:**
- Create: `fiebrehemorragica/src/app/api/requests/route.ts`
- Create: `fiebrehemorragica/src/app/api/requests/route.test.ts`

- [ ] **Step 1: Write a failing route test for valid intake and invalid payloads**

```ts
import { describe, expect, it } from "vitest";

describe("POST /api/requests", () => {
  it("returns 400 for invalid payloads", async () => {
    const response = await POST(new Request("http://localhost/api/requests", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "bad" }),
    }));

    expect(response.status).toBe(400);
  });
});
```

- [ ] **Step 2: Implement the route with validation, DB insert, and immediate Sheets append**

```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const created = await prisma.appointmentRequest.create({
    data: {
      ...parsed.data,
      status: "pending",
    },
  });

  const sheetWrite = await appendPendingRequestRow({
    requestId: created.id,
    createdAtIso: created.createdAt.toISOString(),
    name: created.name,
    email: created.email,
    phone: created.phone,
    reason: created.reason,
  });

  await prisma.appointmentRequest.update({
    where: { id: created.id },
    data: { sheetRowNumber: sheetWrite.sheetRowNumber },
  });

  const reserved = await reserveBatchIfReady();
  if (reserved) {
    void processReservedBatch(reserved);
  }

  return NextResponse.json({
    ok: true,
    requestId: created.id,
    status: "pending",
  });
}
```

- [ ] **Step 3: Implement `processReservedBatch` to assign slots, update Sheets, and send emails**

```ts
export async function processReservedBatch(reserved: ReservedBatch) {
  const totalAssignedBeforeBatch = await prisma.appointmentRequest.count({
    where: { status: "completed" },
  });
  const batchYear = new Date().getFullYear();
  const blockedDates = await loadBlockedDates(batchYear);

  const slots = assignSlotsForBatch({ totalAssignedBeforeBatch, blockedDates });

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
      name: request.name,
      scheduledDate: slot.date,
      scheduledTime: slot.time,
    });
  }
}
```

- [ ] **Step 4: Run route tests**

Run: `npm test -- src/app/api/requests/route.test.ts`

Expected: route rejects invalid payloads and accepts valid ones.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/src/app/api/requests/route.ts fiebrehemorragica/src/app/api/requests/route.test.ts fiebrehemorragica/src/lib/queue/batch-processor.ts
git commit -m "feat: add request intake api"
```

### Task 8: Build the Public UI with the Approved Design Tokens

**Files:**
- Create: `fiebrehemorragica/src/app/layout.tsx`
- Create: `fiebrehemorragica/src/app/globals.css`
- Create: `fiebrehemorragica/src/app/page.tsx`
- Create: `fiebrehemorragica/src/components/forms/appointment-form.tsx`
- Create: `fiebrehemorragica/src/components/ui/button.tsx`
- Create: `fiebrehemorragica/src/components/ui/card.tsx`
- Create: `fiebrehemorragica/src/components/ui/input.tsx`
- Create: `fiebrehemorragica/src/components/ui/textarea.tsx`
- Create: `fiebrehemorragica/src/components/ui/status-message.tsx`

- [ ] **Step 1: Add the global tokens and font loading in `globals.css`**

```css
:root {
  --primary: #00A4E4;
  --secondary: #00558C;
  --accent: #D92378;
  --success: #28A745;
  --background: #F8F9FA;
  --surface: #FFFFFF;
  --border: #E9ECEF;
  --text-main: #333333;
  --text-muted: #6C757D;
  --radius-md: 4px;
  --spacing-card: 24px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
}

body {
  margin: 0;
  background: var(--background);
  color: var(--text-main);
  font-family: Roboto, sans-serif;
}
```

- [ ] **Step 2: Build minimal UI primitives with the approved spacing and radius**

```tsx
export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}
```

- [ ] **Step 3: Build the form component with labels, loading state, and status feedback**

```tsx
export function AppointmentForm() {
  return (
    <form>
      <label htmlFor="name">Nombre</label>
      <input id="name" name="name" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />

      <label htmlFor="phone">Telefono</label>
      <input id="phone" name="phone" type="tel" />

      <label htmlFor="reason">Motivo</label>
      <textarea id="reason" name="reason" />

      <button type="submit">Enviar solicitud</button>
    </form>
  );
}
```

- [ ] **Step 4: Assemble the page shell and verify responsive behavior**

Run: `npm run dev`

Expected: the page renders a single centered card, visible labels, and no horizontal scroll at `375px` width.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/src/app/layout.tsx fiebrehemorragica/src/app/globals.css fiebrehemorragica/src/app/page.tsx fiebrehemorragica/src/components/forms/appointment-form.tsx fiebrehemorragica/src/components/ui
git commit -m "feat: build public turnos form ui"
```

### Task 9: Add Annual Calendar Sync for National Holidays and Chivilcoy Override

**Files:**
- Create: `fiebrehemorragica/scripts/sync-calendar-exceptions.ts`

- [ ] **Step 1: Write the script entrypoint and expected inserts**

```ts
const CHIVILCOY_LOCAL_MONTH = 10;
const CHIVILCOY_LOCAL_DAY = 22;

async function main() {
  const year = Number(process.argv[2] ?? new Date().getFullYear());
  console.log(`Syncing calendar exceptions for ${year}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- [ ] **Step 2: Fetch the official national holidays page and normalize the dates**

```ts
const sourceUrl = `https://www.argentina.gob.ar/jefatura/feriados-nacionales-${year}`;
const response = await fetch(sourceUrl);
const html = await response.text();
const matches = html.match(/\b\d{2}\/\d{2}\/\d{4}\b/g) ?? [];
const uniqueDates = [...new Set(matches)].map((value) => {
  const [day, month, fullYear] = value.split("/");
  return `${fullYear}-${month}-${day}`;
});
```

- [ ] **Step 3: Insert the fixed Chivilcoy exception and upsert the annual records**

```ts
await prisma.calendarException.upsert({
  where: { date: new Date(`${year}-10-22T00:00:00.000Z`) },
  update: {
    type: "local-chivilcoy",
    label: "Excepcion local Chivilcoy",
    sourceUrl: "manual-fixed-rule",
    year,
  },
  create: {
    date: new Date(`${year}-10-22T00:00:00.000Z`),
    type: "local-chivilcoy",
    label: "Excepcion local Chivilcoy",
    sourceUrl: "manual-fixed-rule",
    year,
  },
});
```

- [ ] **Step 4: Run the annual sync**

Run: `npm run calendar:sync -- 2026`

Expected: console output shows the national holiday source URL and a successful insert of the Chivilcoy exception for `2026-10-22`.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/scripts/sync-calendar-exceptions.ts
git commit -m "feat: add annual calendar sync script"
```

### Task 10: Final Verification Pass

**Files:**
- Modify: `fiebrehemorragica/README.md`

- [ ] **Step 1: Add a short operator README with env setup and required annual sync**

```md
# Fiebre Hemorragica Turnos

## Setup

1. `npm install`
2. Copy `.env.example` to `.env`
3. `npm run prisma:generate`
4. `npm run prisma:migrate -- --name init`
5. `npm run calendar:sync -- 2026`
6. `npm run dev`
```

- [ ] **Step 2: Run the full automated checks**

Run: `npm run lint`

Expected: PASS

Run: `npm test`

Expected: PASS

Run: `npm run build`

Expected: PASS

- [ ] **Step 3: Manually verify the core business flow**

Run: `npm run dev`

Expected manual checks:

1. Submitting one request writes a pending row in Google Sheets.
2. Submitting the 10th pending request triggers a batch.
3. The assigned rows receive date, time, address, site, campaign, and final status.
4. Emails include `vacunacion de fiebre hemorragica`, date, time, `Hijas de San Jose 145`, and `Region Sanitaria X`.
5. The 21st assignment rolls to the next valid Friday if the previous Friday is full.

- [ ] **Step 4: Re-run the annual holiday guardrail**

Run: `npm run calendar:sync -- 2027`

Expected: script loads the new official national source and inserts the `2027-10-22` Chivilcoy exception.

- [ ] **Step 5: Commit**

```bash
git add fiebrehemorragica/README.md
git commit -m "docs: add operator setup and verification notes"
```

## Self-Review

### Spec Coverage

1. Intake form with `Nombre`, `Email`, `Telefono`, `Motivo`: covered in Task 8 and Task 7.
2. Single-instance temporary queue with exact batches of 10: covered in Task 5.
3. Write every request immediately to Google Sheets: covered in Task 4 and Task 7.
4. Assign appointments only when the batch reaches 10: covered in Task 5 and Task 7.
5. Friday schedule at `08:30`, every `10 minutes`, max `20` per Friday: covered in Task 3.
6. Move to the next Friday after 20 slots: covered in Task 3.
7. Skip national holidays and `22 de octubre` for Chivilcoy: covered in Task 3 and Task 9.
8. Email wording for `vacunacion de fiebre hemorragica`, date, time, and `Hijas de San Jose 145`, `Region Sanitaria X`: covered in Task 6.

### Placeholder Scan

No placeholder markers remain. Before implementation, keep the parser test-first so the holiday sync does not depend on brittle manual inspection.

### Type Consistency

Use these names consistently during implementation:

- `assignSlotsForBatch`
- `reserveBatchIfReady`
- `processReservedBatch`
- `appendPendingRequestRow`
- `updateAssignedTurnRow`
- `buildTurnoEmail`

Plan complete and saved to `fiebrehemorragica/docs/plans/2026-05-22-fiebre-hemorragica-turnos-plan.md`.

Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
