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

    const result = await prisma.$transaction(async () => {
      const res = await reassignAppointmentsForDate(date);

      await prisma.calendarException.create({
        data: {
          date: dateObj,
          type: "cancelled",
          label: "Día eliminado por administrador",
          sourceUrl: "manual",
          year: dateObj.getFullYear(),
        },
      });

      return res;
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
