# Turnos Identity And Document Fields Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `name` and `reason` with `firstName`, `lastName`, `documentType`, and `documentNumber` across database, validation, API, UI, Sheets, and email, then reset the local SQLite database and recreate the `Solicitudes` sheet layout.

**Architecture:** Keep the change narrow and explicit: drive the new request contract from Zod, mirror it in Prisma, and update the pure formatting helpers used by Google Sheets and email. Use small focused tests for validation, sheet row layout, route payload handling, and form rendering so the renamed fields are enforced end-to-end.

**Tech Stack:** Next.js App Router, TypeScript, Prisma + SQLite, Zod, Vitest, Testing Library, Google Sheets API

---

## File Structure

- Modify: `prisma/schema.prisma`
  - Replace `name` and `reason` with `firstName`, `lastName`, `documentType`, and `documentNumber` on `AppointmentRequest`.
- Modify: `src/lib/validation/appointment-schema.ts`
  - Export the closed set of allowed document types and validate the new payload shape.
- Create: `src/lib/validation/appointment-schema.test.ts`
  - Validate accepted/rejected payloads for document type and document number.
- Modify: `src/lib/sheets/google-sheets.ts`
  - Replace pending-row inputs with the new identity fields and expose pure row-building helpers.
- Modify: `src/lib/sheets/google-sheets.test.ts`
  - Keep JWT auth test and add row-layout assertions.
- Modify: `src/app/api/solicitar-turno/route.ts`
  - Accept and persist the new payload only.
- Create: `src/app/api/solicitar-turno/route.test.ts`
  - Mock Prisma and Sheets to verify 400 for old payload and 201 for new payload.
- Modify: `src/components/forms/appointment-form.tsx`
  - Remove `Motivo`, split name, add document type select and document number input.
- Create: `src/components/forms/appointment-form.test.tsx`
  - Verify the rendered fields and submitted payload.
- Modify: `src/lib/email/turno-email-template.ts`
  - Accept `fullName` instead of `name`.
- Modify: `src/lib/email/turno-email-template.test.ts`
  - Assert the greeting uses full name.
- Modify: `src/lib/email/send-turno-email.ts`
  - Pass `fullName` through to the template.
- Modify: `src/lib/queue/batch-processor.ts`
  - Build `fullName` from `firstName` and `lastName` when sending email.
- Modify: `README.md`
  - Document the reset requirement and the new sheet headers.

### Task 1: Replace The Validation Contract

**Files:**
- Create: `src/lib/validation/appointment-schema.test.ts`
- Modify: `src/lib/validation/appointment-schema.ts`

- [ ] **Step 1: Write the failing validation tests**

```ts
import { describe, expect, it } from "vitest";

import { appointmentSchema, DOCUMENT_TYPES } from "./appointment-schema";

describe("appointmentSchema", () => {
  const validPayload = {
    firstName: "Ana",
    lastName: "Perez",
    documentType: "DNI",
    documentNumber: "12345678",
    email: "ana@example.com",
    phone: "2346512345",
  };

  it("accepts the new identity payload", () => {
    const parsed = appointmentSchema.safeParse(validPayload);

    expect(parsed.success).toBe(true);
  });

  it("rejects document numbers with letters", () => {
    const parsed = appointmentSchema.safeParse({
      ...validPayload,
      documentNumber: "12A45678",
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects document numbers shorter than seven digits", () => {
    const parsed = appointmentSchema.safeParse({
      ...validPayload,
      documentNumber: "123456",
    });

    expect(parsed.success).toBe(false);
  });

  it("exports the exact document type options used by the form", () => {
    expect(DOCUMENT_TYPES).toEqual(["DNI", "LC", "LE", "Pasaporte", "Otro"]);
  });
});
```

- [ ] **Step 2: Run the validation test to verify it fails**

Run: `npm test -- src/lib/validation/appointment-schema.test.ts`

Expected: FAIL because `DOCUMENT_TYPES`, `firstName`, `lastName`, `documentType`, and `documentNumber` are not implemented yet.

- [ ] **Step 3: Implement the new schema and shared document type constants**

```ts
import { z } from "zod";

export const DOCUMENT_TYPES = ["DNI", "LC", "LE", "Pasaporte", "Otro"] as const;

export const appointmentSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  documentType: z.enum(DOCUMENT_TYPES),
  documentNumber: z.string().trim().regex(/^\d{7,10}$/),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(30),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];
```

- [ ] **Step 4: Run the validation test to verify it passes**

Run: `npm test -- src/lib/validation/appointment-schema.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation/appointment-schema.ts src/lib/validation/appointment-schema.test.ts
git commit -m "feat: replace request validation with identity fields"
```

### Task 2: Replace The Prisma Schema And Reset Local SQLite

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Update the Prisma model to match the new identity contract**

```prisma
model AppointmentRequest {
  id             String   @id @default(cuid())
  firstName      String
  lastName       String
  email          String
  phone          String
  documentType   String
  documentNumber String
  status         String   @default("pending")
  batchId        String?
  scheduledAt    DateTime?
  slotNumber     Int?
  sheetRowNumber Int?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  batch          Batch?   @relation(fields: [batchId], references: [id])

  @@index([batchId])
  @@index([status])
  @@index([createdAt])
}
```

- [ ] **Step 2: Generate Prisma client to catch schema errors early**

Run: `npm run prisma:generate`

Expected: PASS with a regenerated Prisma client.

- [ ] **Step 3: Force-reset the local SQLite database to apply the new schema cleanly**

Run: `npx prisma db push --force-reset`

Expected: database reset confirmation and updated schema pushed successfully.

- [ ] **Step 4: Verify the app still builds after schema regeneration**

Run: `npm run build`

Expected: FAIL or PASS depending on remaining code references to `name` and `reason`. If it fails, the failure should point to old field usage, confirming the schema changed.

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: replace appointment identity fields in prisma schema"
```

### Task 3: Reshape Google Sheets Rows For The New Columns

**Files:**
- Modify: `src/lib/sheets/google-sheets.ts`
- Modify: `src/lib/sheets/google-sheets.test.ts`

- [ ] **Step 1: Expand the Sheets test with row-layout assertions**

```ts
import { afterEach, describe, expect, it } from "vitest";

import {
  buildAssignedTurnRowValues,
  buildPendingRequestRowValues,
  createSheetsAuth,
} from "./google-sheets";

const ORIGINAL_ENV = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
};

describe("google-sheets helpers", () => {
  afterEach(() => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = ORIGINAL_ENV.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    process.env.GOOGLE_PRIVATE_KEY = ORIGINAL_ENV.GOOGLE_PRIVATE_KEY;
  });

  it("creates JWT auth from service account env vars", () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "bot@example.iam.gserviceaccount.com";
    process.env.GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----\n";

    const auth = createSheetsAuth();

    expect(auth.email).toBe("bot@example.iam.gserviceaccount.com");
    expect(auth.key).toContain("BEGIN PRIVATE KEY");
    expect(auth.scopes).toContain("https://www.googleapis.com/auth/spreadsheets");
  });

  it("builds the pending row with the new identity columns", () => {
    expect(
      buildPendingRequestRowValues({
        requestId: "req-1",
        createdAtIso: "2026-05-22T10:00:00.000Z",
        firstName: "Ana",
        lastName: "Perez",
        documentType: "DNI",
        documentNumber: "12345678",
        email: "ana@example.com",
        phone: "2346512345",
      }),
    ).toEqual([
      "req-1",
      "2026-05-22T10:00:00.000Z",
      "Ana",
      "Perez",
      "DNI",
      "12345678",
      "ana@example.com",
      "2346512345",
      "pendiente",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
  });

  it("builds the assigned row for the new final columns", () => {
    expect(
      buildAssignedTurnRowValues({
        scheduledDate: "2026-10-30",
        scheduledTime: "08:30",
      }),
    ).toEqual([
      "2026-10-30",
      "08:30",
      "Hijas de San Jose 145",
      "Region Sanitaria X",
      "Vacunacion de fiebre hemorragica",
      "turno asignado",
    ]);
  });
});
```

- [ ] **Step 2: Run the Sheets test to verify it fails**

Run: `npm test -- src/lib/sheets/google-sheets.test.ts`

Expected: FAIL because the new helper exports and field names do not exist yet.

- [ ] **Step 3: Implement pure row builders and switch the append/update code to the new fields**

```ts
export type AppendRequestRowInput = {
  requestId: string;
  createdAtIso: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
};

export function buildPendingRequestRowValues(input: AppendRequestRowInput) {
  return [
    input.requestId,
    input.createdAtIso,
    input.firstName,
    input.lastName,
    input.documentType,
    input.documentNumber,
    input.email,
    input.phone,
    "pendiente",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
}

export function buildAssignedTurnRowValues(input: UpdateAssignedTurnRowInput) {
  return [
    input.scheduledDate,
    input.scheduledTime,
    "Hijas de San Jose 145",
    "Region Sanitaria X",
    "Vacunacion de fiebre hemorragica",
    "turno asignado",
  ];
}

const response = await sheets.spreadsheets.values.append({
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  range: "Solicitudes!A:O",
  valueInputOption: "RAW",
  requestBody: { values: [buildPendingRequestRowValues(input)] },
});

const range = `Solicitudes!J${input.sheetRowNumber}:O${input.sheetRowNumber}`;
await sheets.spreadsheets.values.update({
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  range,
  valueInputOption: "RAW",
  requestBody: { values: [buildAssignedTurnRowValues(input)] },
});
```

- [ ] **Step 4: Run the Sheets test to verify it passes**

Run: `npm test -- src/lib/sheets/google-sheets.test.ts`

Expected: PASS

- [ ] **Step 5: Recreate the `Solicitudes` tab manually with the new headers**

Create or replace the tab with this header row:

```text
requestId | createdAtIso | firstName | lastName | documentType | documentNumber | email | phone | status | scheduledDate | scheduledTime | address | site | campaign | finalStatus
```

Expected: the sheet layout matches the new append range `A:O` and update range `J:O`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sheets/google-sheets.ts src/lib/sheets/google-sheets.test.ts
git commit -m "feat: reshape google sheets rows for identity fields"
```

### Task 4: Update The Request Intake Route

**Files:**
- Create: `src/app/api/solicitar-turno/route.test.ts`
- Modify: `src/app/api/solicitar-turno/route.ts`

- [ ] **Step 1: Write the failing route tests**

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    appointmentRequest: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/sheets/google-sheets", () => ({
  appendPendingRequestRow: vi.fn(),
}));

import { POST } from "./route";
import { prisma } from "@/lib/db/prisma";
import { appendPendingRequestRow } from "@/lib/sheets/google-sheets";

describe("POST /api/solicitar-turno", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects the old payload shape", async () => {
    const request = new Request("http://localhost/api/solicitar-turno", {
      method: "POST",
      body: JSON.stringify({
        name: "Ana Perez",
        reason: "Vacuna",
        email: "ana@example.com",
        phone: "2346512345",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("accepts the new identity payload", async () => {
    vi.mocked(prisma.appointmentRequest.create).mockResolvedValue({ id: "req-1" } as never);
    vi.mocked(appendPendingRequestRow).mockResolvedValue({ sheetRowNumber: 2 });

    const request = new Request("http://localhost/api/solicitar-turno", {
      method: "POST",
      body: JSON.stringify({
        firstName: "Ana",
        lastName: "Perez",
        documentType: "DNI",
        documentNumber: "12345678",
        email: "ana@example.com",
        phone: "2346512345",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(prisma.appointmentRequest.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          firstName: "Ana",
          lastName: "Perez",
          documentType: "DNI",
          documentNumber: "12345678",
        }),
      }),
    );
    expect(json).toEqual({ requestId: "req-1", sheetRowNumber: 2 });
  });
});
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `npm test -- src/app/api/solicitar-turno/route.test.ts`

Expected: FAIL because the route still expects `name` and `reason`.

- [ ] **Step 3: Implement the new route payload mapping**

```ts
const parsed = appointmentSchema.safeParse(body);

const [dbRequest, sheetsResult] = await Promise.all([
  prisma.appointmentRequest.create({
    data: {
      id: requestId,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      documentType: parsed.data.documentType,
      documentNumber: parsed.data.documentNumber,
      email: parsed.data.email,
      phone: parsed.data.phone,
      status: "pending",
      createdAt: new Date(createdAtIso),
    },
  }),
  appendPendingRequestRow({
    requestId,
    createdAtIso,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    documentType: parsed.data.documentType,
    documentNumber: parsed.data.documentNumber,
    email: parsed.data.email,
    phone: parsed.data.phone,
  }),
]);
```

- [ ] **Step 4: Run the route test to verify it passes**

Run: `npm test -- src/app/api/solicitar-turno/route.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/api/solicitar-turno/route.ts src/app/api/solicitar-turno/route.test.ts
git commit -m "feat: accept identity document payload in request route"
```

### Task 5: Update The Public Form

**Files:**
- Create: `src/components/forms/appointment-form.test.tsx`
- Modify: `src/components/forms/appointment-form.tsx`

- [ ] **Step 1: Write the failing form test**

```tsx
// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppointmentForm } from "./appointment-form";

describe("AppointmentForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ requestId: "req-1", sheetRowNumber: 2 }),
      }),
    );
  });

  it("renders the identity fields and omits motivo", async () => {
    render(<AppointmentForm />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de documento")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de documento")).toBeInTheDocument();
    expect(screen.queryByLabelText("Motivo")).toBeNull();
  });

  it("submits the new payload shape", async () => {
    render(<AppointmentForm />);

    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "Perez" } });
    fireEvent.change(screen.getByLabelText("Tipo de documento"), { target: { value: "DNI" } });
    fireEvent.change(screen.getByLabelText("Número de documento"), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "2346512345" } });

    fireEvent.submit(screen.getByRole("button", { name: "Enviar solicitud" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/solicitar-turno",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            firstName: "Ana",
            lastName: "Perez",
            documentType: "DNI",
            documentNumber: "12345678",
            email: "ana@example.com",
            phone: "2346512345",
          }),
        }),
      );
    });
  });
});
```

- [ ] **Step 2: Run the form test to verify it fails**

Run: `npm test -- src/components/forms/appointment-form.test.tsx`

Expected: FAIL because the form still renders `Motivo` and posts `name`/`reason`.

- [ ] **Step 3: Implement the new fields and payload in the form**

```tsx
import { useState } from "react";
import { DOCUMENT_TYPES } from "@/lib/validation/appointment-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";

const data = {
  firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
  lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
  documentType: (form.elements.namedItem("documentType") as HTMLSelectElement).value,
  documentNumber: (form.elements.namedItem("documentNumber") as HTMLInputElement).value,
  email: (form.elements.namedItem("email") as HTMLInputElement).value,
  phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
};

<label htmlFor="firstName">Nombre</label>
<Input id="firstName" name="firstName" required minLength={2} maxLength={100} />

<label htmlFor="lastName">Apellido</label>
<Input id="lastName" name="lastName" required minLength={2} maxLength={100} />

<label htmlFor="documentType">Tipo de documento</label>
<select id="documentType" name="documentType" defaultValue="DNI" required>
  {DOCUMENT_TYPES.map((documentType) => (
    <option key={documentType} value={documentType}>
      {documentType}
    </option>
  ))}
</select>

<label htmlFor="documentNumber">Número de documento</label>
<Input id="documentNumber" name="documentNumber" required inputMode="numeric" pattern="\\d{7,10}" />
```

- [ ] **Step 4: Add CSS for the new `select` element**

```css
.card form input,
.card form textarea,
.card form select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 16px;
  box-sizing: border-box;
}

.card form input:focus,
.card form textarea:focus,
.card form select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 164, 228, 0.2);
}
```

- [ ] **Step 5: Run the form test to verify it passes**

Run: `npm test -- src/components/forms/appointment-form.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/forms/appointment-form.tsx src/components/forms/appointment-form.test.tsx src/app/page.module.css
git commit -m "feat: replace motivo with identity document fields in form"
```

### Task 6: Update Email, Batch Processing, And Documentation

**Files:**
- Modify: `src/lib/email/turno-email-template.ts`
- Modify: `src/lib/email/turno-email-template.test.ts`
- Modify: `src/lib/email/send-turno-email.ts`
- Modify: `src/lib/queue/batch-processor.ts`
- Modify: `README.md`

- [ ] **Step 1: Write the failing full-name email test**

```ts
import { describe, expect, it } from "vitest";
import { buildTurnoEmail } from "./turno-email-template";

describe("buildTurnoEmail", () => {
  it("greets the patient with full name", () => {
    const email = buildTurnoEmail({
      fullName: "Ana Perez",
      scheduledDate: "2026-10-30",
      scheduledTime: "08:30",
    });

    expect(email.html).toContain("Hola Ana Perez");
    expect(email.html).toContain("Hijas de San Jose 145");
  });
});
```

- [ ] **Step 2: Run the email test to verify it fails**

Run: `npm test -- src/lib/email/turno-email-template.test.ts`

Expected: FAIL because the template still expects `name`.

- [ ] **Step 3: Update the email template, sender, and batch processor**

```ts
export function buildTurnoEmail(input: {
  fullName: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  return {
    subject: "Se le ha asignado un turno para vacunacion de fiebre hemorragica",
    html: `
      <p>Hola ${input.fullName},</p>
      <p>Se le ha asignado un turno para vacunacion de fiebre hemorragica.</p>
      <p>Fecha: ${input.scheduledDate}</p>
      <p>Hora: ${input.scheduledTime}</p>
      <p>Direccion: Hijas de San Jose 145</p>
      <p>Sede: Region Sanitaria X</p>
    `,
  };
}
```

```ts
export async function sendTurnoEmail(input: {
  to: string;
  fullName: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  const email = buildTurnoEmail(input);
```

```ts
await sendTurnoEmail({
  to: request.email,
  fullName: `${request.firstName} ${request.lastName}`,
  scheduledDate: slot.date,
  scheduledTime: slot.time,
});
```

- [ ] **Step 4: Document the new local reset and sheet headers in the README**

```md
## Reset After Identity Schema Change

1. `npx prisma db push --force-reset`
2. Recreate the `Solicitudes` tab with these headers:

`requestId | createdAtIso | firstName | lastName | documentType | documentNumber | email | phone | status | scheduledDate | scheduledTime | address | site | campaign | finalStatus`
```

- [ ] **Step 5: Run the email test to verify it passes**

Run: `npm test -- src/lib/email/turno-email-template.test.ts`

Expected: PASS

- [ ] **Step 6: Run the focused regression suite**

Run: `npm test -- src/lib/validation/appointment-schema.test.ts src/lib/sheets/google-sheets.test.ts src/app/api/solicitar-turno/route.test.ts src/components/forms/appointment-form.test.tsx src/lib/email/turno-email-template.test.ts`

Expected: PASS

- [ ] **Step 7: Run final build verification**

Run: `npm run build`

Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/lib/email/turno-email-template.ts src/lib/email/turno-email-template.test.ts src/lib/email/send-turno-email.ts src/lib/queue/batch-processor.ts README.md
git commit -m "feat: finish identity document rollout across notifications"
```

## Self-Review

- Spec coverage: covered database reset, new validation, new API payload, Google Sheets column reorder, form changes, full-name email, batch processor, tests, and README reset note.
- Placeholder scan: no TODO/TBD markers and every code-changing step includes concrete code or commands.
- Type consistency: all tasks use the same field names: `firstName`, `lastName`, `documentType`, `documentNumber`, and `fullName` only at the email boundary.
