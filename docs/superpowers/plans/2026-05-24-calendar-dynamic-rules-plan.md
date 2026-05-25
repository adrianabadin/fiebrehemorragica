# Dynamic Calendar Rules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement dynamic calendar schedule rules (day, hours, slot count) with fallback and automatic rescheduling.

**Architecture:** Prisma `ScheduleRule` model stores validity rules. Calendar core functions dynamically calculate slot times and next available days. Admin APIs handle rule creation and day cancellation, triggering a bulk reschedule mechanism that re-assigns appointments to the next valid day.

**Tech Stack:** Next.js 15, Prisma, Zod.

---

### Task 1: Update Database Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add ScheduleRule model to Prisma schema**

```prisma
model ScheduleRule {
  id          String   @id @default(cuid())
  validFrom   DateTime
  dayOfWeek   Int
  startTime   String
  endTime     String
  slotCount   Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- [ ] **Step 2: Generate and apply migration**

Run: `npx prisma migrate dev --name add_schedule_rule`
Expected: PASS and database updated.

### Task 2: Core Calendar Logic (Rules & Availability)

**Files:**
- Modify: `src/lib/calendar/calendar.ts`
- Modify: `src/lib/calendar/calendar.test.ts`

- [ ] **Step 1: Write tests for dynamic availability logic**

```typescript
// Add to src/lib/calendar/calendar.test.ts
import { getActiveRule, findNextAvailableDay } from "./calendar";

// Mock prisma...
```

- [ ] **Step 2: Implement getActiveRule**

```typescript
// Add to src/lib/calendar/calendar.ts
export async function getActiveRule(date: Date) {
  const rule = await prisma.scheduleRule.findFirst({
    where: { validFrom: { lte: date } },
    orderBy: { validFrom: "desc" }
  });
  
  if (rule) return rule;
  
  return {
    dayOfWeek: 5,
    startTime: "08:30",
    endTime: "11:50",
    slotCount: 20
  };
}
```

- [ ] **Step 3: Implement next available day finder**

```typescript
// In src/lib/calendar/calendar.ts
export async function findNextAvailableDay(afterDate: string, blockedDates: string[]): Promise<string | null> {
  const [year, month, day] = afterDate.split("-").map(Number);
  let current = new Date(year, month - 1, day);
  
  for (let i = 0; i < 52; i++) {
    const rule = await getActiveRule(current);
    while (current.getDay() !== rule.dayOfWeek) {
      current.setDate(current.getDate() + 1);
    }
    
    const dateStr = current.toLocaleDateString("en-CA");
    if (!isBlockedDate(dateStr, blockedDates)) {
      const count = await prisma.appointmentRequest.count({
        where: {
          scheduledAt: {
            gte: new Date(dateStr + "T00:00:00"),
            lt: new Date(new Date(dateStr + "T00:00:00").getTime() + 86400000),
          },
          status: { not: "pending" },
        },
      });
      if (count < rule.slotCount) {
        return dateStr;
      }
    }
    current.setDate(current.getDate() + 7);
  }
  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/calendar/calendar.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/calendar/calendar.ts src/lib/calendar/calendar.test.ts
git commit -m "feat: add active rule resolution and dynamic availability"
```

### Task 3: Dynamic Slot Assignment

**Files:**
- Modify: `src/lib/calendar/schedule.ts`

- [ ] **Step 1: Rewrite assignSlotsForBatch with dynamic rules**

Modify `assignSlotsForBatch` to await `getActiveRule` and calculate durations.

```typescript
import { getActiveRule, isBlockedDate } from "./calendar";

export async function assignSlotsForBatch(input: {
  totalAssignedBeforeBatch: number;
  blockedDates: string[];
  startFrom?: string;
}) {
  const baseDate = input.startFrom ? new Date(input.startFrom) : new Date();
  let current = new Date(baseDate);
  let rule = await getActiveRule(current);
  
  // Logic to jump to rule.dayOfWeek and calculate slot minutes dynamically
  // ... (implementation skipping verbose details for brevity, calculate duration = (end - start) / slotCount)
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/calendar/schedule.ts
git commit -m "feat: use dynamic rules for slot assignment"
```

### Task 4: Bulk Rescheduling Logic

**Files:**
- Create: `src/lib/calendar/reschedule.ts`

- [ ] **Step 1: Write reassignAppointments function**

```typescript
import { prisma } from "../db/prisma";
import { findNextAvailableDay } from "./calendar";
import { sendRescheduleEmail } from "../email/send-reschedule-email";

export async function rescheduleAppointments(appointments: any[], blockedDates: string[]) {
  // Loop over appointments
  // Call findNextAvailableDay
  // Update appointment record
  // Send email
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/calendar/reschedule.ts
git commit -m "feat: add bulk reschedule logic"
```

### Task 5: Admin API - Create Rule

**Files:**
- Create: `src/app/api/admin/schedule-rules/route.ts`

- [ ] **Step 1: Implement POST handler**

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAuthUser } from "@/lib/auth/get-auth-user";
// Add auth check
// Add Zod validation
// prisma.scheduleRule.create
// Trigger reschedule for affected future appointments
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/schedule-rules/route.ts
git commit -m "feat: add admin api for schedule rules"
```

### Task 6: Admin API - Cancel Day

**Files:**
- Create/Modify: `src/app/api/admin/calendar/day/route.ts`

- [ ] **Step 1: Implement DELETE handler**

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAuthUser } from "@/lib/auth/get-auth-user";
import { rescheduleAppointments } from "@/lib/calendar/reschedule";

// Authenticate
// Create CalendarException
// Find appointments for the day
// rescheduleAppointments(appointments, updatedBlockedDates)
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/calendar/day/route.ts
git commit -m "feat: add admin api to cancel day and reschedule"
```
