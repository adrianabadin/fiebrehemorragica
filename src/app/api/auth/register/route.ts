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
          { error: "Solo un administrador puede crear nuevos usuarios. Iniciá sesión primero." },
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
