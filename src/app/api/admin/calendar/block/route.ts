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
        { error: "Datos inv\u00e1lidos", details: parsed.error.flatten() },
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
