import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAuthUser } from "@/lib/auth/get-auth-user";
import { z } from "zod";
import { rescheduleAppointments } from "@/lib/calendar/reschedule";

const schema = z.object({
  validFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dayOfWeek: z.number().int().min(1).max(7),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  slotCount: z.number().int().min(1),
});

export async function POST(request: Request) {
  try {
    const user = await getAuthUser(request);
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = schema.parse(body);

    const rule = await prisma.scheduleRule.create({
      data: {
        validFrom: new Date(parsed.validFrom + "T00:00:00"),
        dayOfWeek: parsed.dayOfWeek,
        startTime: parsed.startTime,
        endTime: parsed.endTime,
        slotCount: parsed.slotCount,
      },
    });

    // Trigger reschedule for affected future appointments
    // Find appointments with scheduledAt >= validWhere the dayOfWeek doesn't match the new rule
    // Actually, the simplest approach: find all future appointments (>= validFrom) and reschedule them all
    const futureAppointments = await prisma.appointmentRequest.findMany({
      where: {
        scheduledAt: { gte: new Date(parsed.validFrom + "T00:00:00") },
        status: { not: "pending" },
      },
    });

    const validAppointments = futureAppointments
      .filter((a): a is typeof a & { scheduledAt: Date } => a.scheduledAt !== null)
      .map((a) => ({
        id: a.id,
        scheduledAt: a.scheduledAt,
        email: a.email,
        firstName: a.firstName,
        lastName: a.lastName,
      }));

    if (validAppointments.length > 0) {
      await rescheduleAppointments(validAppointments);
    }

    return NextResponse.json(rule);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof Error && error.message === "No autenticado") {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
