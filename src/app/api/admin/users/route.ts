import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAuthUser } from "@/lib/auth/get-auth-user";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const user = await getAuthUser(request);
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: { id: true, username: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error && error.message === "No autenticado") {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

const patchSchema = z.object({
  userId: z.string(),
  role: z.enum(["admin", "user"]),
});

export async function PATCH(request: Request) {
  try {
    const user = await getAuthUser(request);
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = patchSchema.parse(body);

    // Prevent self-demotion (optional safety)
    if (parsed.userId === user.userId && parsed.role !== "admin") {
      return NextResponse.json({ error: "No podes quitarte el rol de admin a vos mismo" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: parsed.userId },
      data: { role: parsed.role },
      select: { id: true, username: true, role: true },
    });

    return NextResponse.json(updated);
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
