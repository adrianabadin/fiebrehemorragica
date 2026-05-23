# Auth y Gestión de Calendario — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar autenticación con usuario/contraseña (register bootstrap + login) y gestión de calendario (bloquear/eliminar días con reprogramación automática y mail).

**Architecture:** Helper compartido `getAuthUser()` en cada endpoint protegido. JWT en cookie httpOnly firmado con `jose`. Hashing con `argon2`. Reprogramación busca próximo viernes con slots libres. Sin middleware Edge.

**Tech Stack:** Next.js App Router, Prisma/SQLite, argon2, jose, Resend, Zod, Vitest.

---

## File Structure

### Archivos nuevos
- `src/lib/auth/password.ts` — hashPassword, verifyPassword con argon2
- `src/lib/auth/get-auth-user.ts` — getAuthUser (verifica JWT de cookie)
- `src/lib/auth/auth.test.ts` — tests de password y getAuthUser
- `src/lib/validation/auth-schema.ts` — schemas Zod para register y login
- `src/lib/email/reschedule-email-template.ts` — template de reprogramación
- `src/lib/email/reschedule-email-template.test.ts` — test del template
- `src/lib/email/send-reschedule-email.ts` — envío via Resend
- `src/lib/calendar/reschedule.ts` — findNextAvailableFriday + reassignAppointmentsForDate
- `src/lib/calendar/reschedule.test.ts` — tests de reprogramación
- `src/app/api/auth/register/route.ts` — POST register
- `src/app/api/auth/login/route.ts` — POST login
- `src/app/api/admin/calendar/block/route.ts` — POST bloquear día
- `src/app/api/admin/calendar/day/route.ts` — DELETE eliminar día

### Archivos modificados
- `prisma/schema.prisma` — agregar modelo User
- `package.json` — agregar argon2, jose

---

### Task 1: Instalar dependencias y agregar modelo User

**Files:**
- Modify: `package.json`
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Instalar argon2 y jose**

Run:
```bash
npm install argon2 jose
```

Expected: ambos paquetes instalados sin errores.

- [ ] **Step 2: Agregar modelo User en prisma/schema.prisma**

Agregar al final de `prisma/schema.prisma`, después del modelo `CalendarException`:

```prisma
model User {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  role         String   @default("admin")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

- [ ] **Step 3: Generar cliente Prisma y migrar**

Run:
```bash
npx prisma migrate dev --name add-user-model
```

Expected: migración creada y aplicada sin errores.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json prisma/
git commit -m "feat: add User model and install argon2, jose"
```

---

### Task 2: password.ts — hash y verify

**Files:**
- Create: `src/lib/auth/password.ts`
- Create: `src/lib/auth/auth.test.ts`

- [ ] **Step 1: Escribir test de password**

Crear `src/lib/auth/auth.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password", () => {
  it("hashes a password and verifies it correctly", async () => {
    const hash = await hashPassword("mypassword123");
    expect(hash).not.toBe("mypassword123");
    const isValid = await verifyPassword("mypassword123", hash);
    expect(isValid).toBe(true);
  });

  it("rejects wrong password", async () => {
    const hash = await hashPassword("mypassword123");
    const isValid = await verifyPassword("wrongpassword", hash);
    expect(isValid).toBe(false);
  });
});
```

- [ ] **Step 2: Correr test y verificar que falla**

Run: `npx vitest run src/lib/auth/auth.test.ts`
Expected: FAIL — module `./password` not found.

- [ ] **Step 3: Implementar password.ts**

Crear `src/lib/auth/password.ts`:

```typescript
import * as argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return argon2.verify(hash, password);
}
```

- [ ] **Step 4: Correr test y verificar que pasa**

Run: `npx vitest run src/lib/auth/auth.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth/password.ts src/lib/auth/auth.test.ts
git commit -m "feat: add password hashing and verification with argon2"
```

---

### Task 3: get-auth-user.ts — verificación JWT

**Files:**
- Create: `src/lib/auth/get-auth-user.ts`
- Modify: `src/lib/auth/auth.test.ts` — agregar tests de getAuthUser

- [ ] **Step 1: Escribir tests de getAuthUser**

Agregar a `src/lib/auth/auth.test.ts`:

```typescript
import { SignJWT } from "jose";
import { getAuthUser } from "./get-auth-user";

const JWT_SECRET = new TextEncoder().encode("test-secret-key-for-tests");

describe("getAuthUser", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret-key-for-tests";
  });

  function makeRequestWithCookie(cookie: string): Request {
    return new Request("http://localhost/api/test", {
      headers: { cookie },
    });
  }

  async function signToken(payload: Record<string, unknown>): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(JWT_SECRET);
  }

  it("returns user from valid token", async () => {
    const token = await signToken({ userId: "user1", role: "admin" });
    const req = makeRequestWithCookie(`token=${token}`);
    const user = await getAuthUser(req);
    expect(user).toEqual({ userId: "user1", role: "admin" });
  });

  it("throws on missing cookie", async () => {
    const req = new Request("http://localhost/api/test");
    await expect(getAuthUser(req)).rejects.toThrow("No autenticado");
  });

  it("throws on invalid token", async () => {
    const req = makeRequestWithCookie("token=invalid-token-value");
    await expect(getAuthUser(req)).rejects.toThrow("No autenticado");
  });

  it("throws on expired token", async () => {
    const token = await new SignJWT({ userId: "user1", role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("0s")
      .sign(JWT_SECRET);
    const req = makeRequestWithCookie(`token=${token}`);
    await expect(getAuthUser(req)).rejects.toThrow("No autenticado");
  });
});
```

- [ ] **Step 2: Correr test y verificar que falla**

Run: `npx vitest run src/lib/auth/auth.test.ts`
Expected: FAIL — module `./get-auth-user` not found.

- [ ] **Step 3: Implementar get-auth-user.ts**

Crear `src/lib/auth/get-auth-user.ts`:

```typescript
import { jwtVerify } from "jose";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number = 401) {
    super(message);
    this.status = status;
  }
}

export async function getAuthUser(request: Request): Promise<{
  userId: string;
  role: string;
}> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);

  if (!tokenMatch?.[1]) {
    throw new AuthError("No autenticado");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(tokenMatch[1], secret);
    return {
      userId: payload.userId as string,
      role: payload.role as string,
    };
  } catch {
    throw new AuthError("No autenticado");
  }
}
```

- [ ] **Step 4: Correr test y verificar que pasa**

Run: `npx vitest run src/lib/auth/auth.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth/get-auth-user.ts src/lib/auth/auth.test.ts
git commit -m "feat: add JWT auth helper with cookie verification"
```

---

### Task 4: auth-schema.ts — validación Zod

**Files:**
- Create: `src/lib/validation/auth-schema.ts`

- [ ] **Step 1: Crear auth-schema.ts**

Crear `src/lib/validation/auth-schema.ts`:

```typescript
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(3).max(50),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export const blockDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const deleteDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/validation/auth-schema.ts
git commit -m "feat: add Zod schemas for auth and calendar endpoints"
```

---

### Task 5: POST /api/auth/register

**Files:**
- Create: `src/app/api/auth/register/route.ts`

- [ ] **Step 1: Implementar register/route.ts**

Crear `src/app/api/auth/register/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { getAuthUser, AuthError } from "@/lib/auth/get-auth-user";
import { registerSchema } from "@/lib/validation/auth-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const userCount = await prisma.user.count();

    if (userCount > 0) {
      try {
        const user = await getAuthUser(request);
        if (user.role !== "admin") {
          return NextResponse.json(
            { error: "Sin permisos" },
            { status: 403 },
          );
        }
      } catch (e) {
        const status = e instanceof AuthError ? e.status : 401;
        return NextResponse.json(
          { error: "No autenticado" },
          { status },
        );
      }
    }

    const existing = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });

    if (existing) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const role = userCount === 0 ? "admin" : "user";

    const newUser = await prisma.user.create({
      data: {
        username: parsed.data.username,
        passwordHash,
        role,
      },
    });

    return NextResponse.json(
      { userId: newUser.id, username: newUser.username, role: newUser.role },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/auth/register/route.ts
git commit -m "feat: add POST /api/auth/register with bootstrap logic"
```

---

### Task 6: POST /api/auth/login

**Files:**
- Create: `src/app/api/auth/login/route.ts`

- [ ] **Step 1: Implementar login/route.ts**

Crear `src/app/api/auth/login/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/validation/auth-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(parsed.data.password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    const response = NextResponse.json(
      { userId: user.id, username: user.username, role: user.role },
      { status: 200 },
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/auth/login/route.ts
git commit -m "feat: add POST /api/auth/login with JWT cookie"
```

---

### Task 7: findNextAvailableFriday en calendar.ts

**Files:**
- Modify: `src/lib/calendar/calendar.ts` — agregar findNextAvailableFriday
- Modify: `src/lib/calendar/reschedule.test.ts` — tests

- [ ] **Step 1: Escribir tests de findNextAvailableFriday y reassignAppointmentsForDate**

Crear `src/lib/calendar/reschedule.test.ts`:

```typescript
import { describe, expect, it, vi, beforeEach } from "vitest";
import { findNextAvailableFriday } from "./calendar";

describe("findNextAvailableFriday", () => {
  it("returns the next friday when no dates are blocked and no appointments", async () => {
    const result = await findNextAvailableFriday("2026-06-01", []);
    expect(result).toBe("2026-06-05");
  });

  it("skips a blocked friday", async () => {
    const result = await findNextAvailableFriday("2026-06-01", ["2026-06-05"]);
    expect(result).toBe("2026-06-12");
  });

  it("skips multiple blocked fridays", async () => {
    const result = await findNextAvailableFriday("2026-06-01", [
      "2026-06-05",
      "2026-06-12",
    ]);
    expect(result).toBe("2026-06-19");
  });

  it("returns null when all 52 fridays are blocked", async () => {
    const allFridays: string[] = [];
    const d = new Date(2026, 5, 5);
    for (let i = 0; i < 52; i++) {
      allFridays.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      );
      d.setDate(d.getDate() + 7);
    }
    const result = await findNextAvailableFriday("2026-06-01", allFridays);
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Correr test y verificar que falla**

Run: `npx vitest run src/lib/calendar/reschedule.test.ts`
Expected: FAIL — findNextAvailableFriday is not exported.

- [ ] **Step 3: Implementar findNextAvailableFriday en calendar.ts**

Agregar al final de `src/lib/calendar/calendar.ts`:

```typescript
export async function findNextAvailableFriday(
  afterDate: string,
  blockedDates: string[],
): Promise<string | null> {
  const [year, month, day] = afterDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  let friday = nextFridayFrom(start);

  for (let i = 0; i < 52; i++) {
    const fridayStr = friday.toLocaleDateString("en-CA");
    if (!isBlockedDate(fridayStr, blockedDates)) {
      const count = await prisma.appointmentRequest.count({
        where: {
          scheduledAt: {
            gte: new Date(fridayStr + "T00:00:00"),
            lt: new Date(
              new Date(fridayStr + "T00:00:00").getTime() + 86400000,
            ),
          },
          status: { not: "pending" },
        },
      });
      if (count < 20) {
        return fridayStr;
      }
    }
    friday.setDate(friday.getDate() + 7);
  }

  return null;
}
```

- [ ] **Step 4: Correr test y verificar que pasa**

Run: `npx vitest run src/lib/calendar/reschedule.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/calendar/calendar.ts src/lib/calendar/reschedule.test.ts
git commit -m "feat: add findNextAvailableFriday with slot capacity check"
```

---

### Task 8: Template y envío de mail de reprogramación

**Files:**
- Create: `src/lib/email/reschedule-email-template.ts`
- Create: `src/lib/email/reschedule-email-template.test.ts`
- Create: `src/lib/email/send-reschedule-email.ts`

- [ ] **Step 1: Escribir test del template**

Crear `src/lib/email/reschedule-email-template.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { buildRescheduleEmail } from "./reschedule-email-template";

describe("buildRescheduleEmail", () => {
  it("includes old and new dates and time", () => {
    const email = buildRescheduleEmail({
      fullName: "Ana Perez",
      oldDate: "2026-06-05",
      newDate: "2026-06-12",
      newTime: "09:30",
    });

    expect(email.subject).toContain("reprogramado");
    expect(email.html).toContain("Ana Perez");
    expect(email.html).toContain("2026-06-05");
    expect(email.html).toContain("2026-06-12");
    expect(email.html).toContain("09:30");
    expect(email.html).toContain("Hijas de San Jose 145");
  });
});
```

- [ ] **Step 2: Correr test y verificar que falla**

Run: `npx vitest run src/lib/email/reschedule-email-template.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implementar template**

Crear `src/lib/email/reschedule-email-template.ts`:

```typescript
export function buildRescheduleEmail(input: {
  fullName: string;
  oldDate: string;
  newDate: string;
  newTime: string;
}) {
  return {
    subject: "Su turno ha sido reprogramado",
    html: `
      <p>Hola ${input.fullName},</p>
      <p>Le informamos que su turno ha sido reprogramado.</p>
      <p><strong>Fecha anterior:</strong> ${input.oldDate}</p>
      <p><strong>Nueva fecha:</strong> ${input.newDate}</p>
      <p><strong>Nueva hora:</strong> ${input.newTime}</p>
      <p>Direccion: Hijas de San Jose 145</p>
      <p>Sede: Region Sanitaria X</p>
    `,
  };
}
```

- [ ] **Step 4: Correr test y verificar que pasa**

Run: `npx vitest run src/lib/email/reschedule-email-template.test.ts`
Expected: PASS.

- [ ] **Step 5: Implementar send-reschedule-email.ts**

Crear `src/lib/email/send-reschedule-email.ts`:

```typescript
import { Resend } from "resend";
import { buildRescheduleEmail } from "./reschedule-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRescheduleEmail(input: {
  to: string;
  fullName: string;
  oldDate: string;
  newDate: string;
  newTime: string;
}) {
  const email = buildRescheduleEmail(input);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Turnos <turnos@example.com>",
    to: input.to,
    subject: email.subject,
    html: email.html,
  });

  if (error) {
    throw new Error(`Failed to send reschedule email: ${error.message}`);
  }

  return data;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/email/reschedule-email-template.ts src/lib/email/reschedule-email-template.test.ts src/lib/email/send-reschedule-email.ts
git commit -m "feat: add reschedule email template and sender"
```

---

### Task 9: reschedule.ts — orquestador de reprogramación

**Files:**
- Create: `src/lib/calendar/reschedule.ts`

- [ ] **Step 1: Implementar reschedule.ts**

Crear `src/lib/calendar/reschedule.ts`:

```typescript
import { prisma } from "@/lib/db/prisma";
import { loadBlockedDates } from "./calendar";
import { findNextAvailableFriday } from "./calendar";
import { sendRescheduleEmail } from "@/lib/email/send-reschedule-email";

export async function reassignAppointmentsForDate(date: string): Promise<{
  rescheduledCount: number;
  newDate: string | null;
}> {
  const year = parseInt(date.split("-")[0], 10);
  const blockedDates = await loadBlockedDates(year);

  const appointments = await prisma.appointmentRequest.findMany({
    where: {
      scheduledAt: {
        gte: new Date(date + "T00:00:00"),
        lt: new Date(
          new Date(date + "T00:00:00").getTime() + 86400000,
        ),
      },
      status: { not: "pending" },
    },
  });

  if (appointments.length === 0) {
    return { rescheduledCount: 0, newDate: null };
  }

  const nextDate = await findNextAvailableFriday(date, blockedDates);

  if (!nextDate) {
    throw new Error("No hay fecha disponible");
  }

  const existingCount = await prisma.appointmentRequest.count({
    where: {
      scheduledAt: {
        gte: new Date(nextDate + "T00:00:00"),
        lt: new Date(
          new Date(nextDate + "T00:00:00").getTime() + 86400000,
        ),
      },
      status: { not: "pending" },
    },
  });

  const SLOT_START_HOUR = 8;
  const SLOT_START_MINUTE = 30;
  const SLOT_SIZE_MINUTES = 10;

  for (let i = 0; i < appointments.length; i++) {
    const appt = appointments[i];
    const slotNumber = existingCount + i + 1;
    const zeroBasedSlot = slotNumber - 1;
    const totalMinutes =
      SLOT_START_HOUR * 60 +
      SLOT_START_MINUTE +
      zeroBasedSlot * SLOT_SIZE_MINUTES;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    await prisma.appointmentRequest.update({
      where: { id: appt.id },
      data: {
        scheduledAt: new Date(nextDate + "T00:00:00"),
        slotNumber,
      },
    });

    try {
      await sendRescheduleEmail({
        to: appt.email,
        fullName: `${appt.firstName} ${appt.lastName}`,
        oldDate: date,
        newDate: nextDate,
        newTime: `${hours}:${minutes}`,
      });
    } catch (err) {
      console.error(`Failed to send reschedule email to ${appt.email}:`, err);
    }
  }

  return { rescheduledCount: appointments.length, newDate: nextDate };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/calendar/reschedule.ts
git commit -m "feat: add appointment rescheduling with email notification"
```

---

### Task 10: POST /api/admin/calendar/block

**Files:**
- Create: `src/app/api/admin/calendar/block/route.ts`

- [ ] **Step 1: Implementar block/route.ts**

Crear `src/app/api/admin/calendar/block/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAuthUser, AuthError } from "@/lib/auth/get-auth-user";
import { blockDateSchema } from "@/lib/validation/auth-schema";

export async function POST(request: Request) {
  try {
    let user;
    try {
      user = await getAuthUser(request);
    } catch (e) {
      const status = e instanceof AuthError ? e.status : 401;
      return NextResponse.json(
        { error: "No autenticado" },
        { status },
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Sin permisos" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = blockDateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { date } = parsed.data;
    const dateObj = new Date(date + "T00:00:00");

    const existing = await prisma.calendarException.findUnique({
      where: { date: dateObj },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Fecha ya bloqueada" },
        { status: 409 },
      );
    }

    await prisma.calendarException.create({
      data: {
        date: dateObj,
        type: "blocked",
        label: "Bloqueado por administrador",
        sourceUrl: "manual",
        year: dateObj.getFullYear(),
      },
    });

    return NextResponse.json({ date, type: "blocked" }, { status: 201 });
  } catch (error) {
    console.error("Block date error:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/calendar/block/route.ts
git commit -m "feat: add POST /api/admin/calendar/block endpoint"
```

---

### Task 11: DELETE /api/admin/calendar/day

**Files:**
- Create: `src/app/api/admin/calendar/day/route.ts`

- [ ] **Step 1: Implementar day/route.ts**

Crear `src/app/api/admin/calendar/day/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAuthUser, AuthError } from "@/lib/auth/get-auth-user";
import { deleteDateSchema } from "@/lib/validation/auth-schema";
import { reassignAppointmentsForDate } from "@/lib/calendar/reschedule";

export async function DELETE(request: Request) {
  try {
    let user;
    try {
      user = await getAuthUser(request);
    } catch (e) {
      const status = e instanceof AuthError ? e.status : 401;
      return NextResponse.json(
        { error: "No autenticado" },
        { status },
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Sin permisos" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = deleteDateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { date } = parsed.data;
    const dateObj = new Date(date + "T00:00:00");

    const result = await reassignAppointmentsForDate(date);

    await prisma.calendarException.create({
      data: {
        date: dateObj,
        type: "cancelled",
        label: "Día eliminado por administrador",
        sourceUrl: "manual",
        year: dateObj.getFullYear(),
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "No hay fecha disponible"
    ) {
      return NextResponse.json(
        { error: "No hay fecha disponible" },
        { status: 422 },
      );
    }
    console.error("Delete day error:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/calendar/day/route.ts
git commit -m "feat: add DELETE /api/admin/calendar/day with rescheduling"
```

---

### Task 12: Verificar build y tests

- [ ] **Step 1: Correr todos los tests**

Run: `npx vitest run`
Expected: todos los tests pasan (existentes + nuevos).

- [ ] **Step 2: Correr build**

Run: `npm run build`
Expected: build exitoso sin errores.

- [ ] **Step 3: Commit final si hay ajustes**

Si se necesitaron ajustes menores para pasar el build:

```bash
git add -A
git commit -m "fix: resolve build issues after auth feature"
```
