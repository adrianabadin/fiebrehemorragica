import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sendResetPasswordEmail } from "@/lib/email/send-reset-password-email";
import { forgotPasswordSchema } from "@/lib/validation/auth-schema";

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hora

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Email inválido", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });

    // Respuesta genérica para no revelar si el email existe
    if (!user) {
      return NextResponse.json(
        { message: "Si el email está registrado, recibirás un enlace para restablecer tu contraseña." },
        { status: 200 },
      );
    }

    const resetToken = crypto.randomUUID();
    const resetTokenExpiresAt = new Date(Date.now() + TOKEN_EXPIRY_MS);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiresAt },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;

    await sendResetPasswordEmail({ to: user.username, resetUrl });

    return NextResponse.json(
      { message: "Si el email está registrado, recibirás un enlace para restablecer tu contraseña." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
