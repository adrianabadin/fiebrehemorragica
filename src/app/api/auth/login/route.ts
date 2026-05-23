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
    const token = await new SignJWT({ userId: user.id, role: user.role, name: user.name || user.username })
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
      path: "/",
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
