import { Resend } from "resend";
import { buildResetPasswordEmail } from "./reset-password-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(input: { to: string; resetUrl: string }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("[EMAIL] RESEND_API_KEY is not set");
  }

  const email = buildResetPasswordEmail({ resetUrl: input.resetUrl });

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Turnos <turnos@example.com>",
    to: input.to,
    subject: email.subject,
    html: email.html,
  });

  if (error) {
    console.error(`[EMAIL] Failed to send reset password email to ${input.to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  console.log(`[EMAIL] Reset password email sent to ${input.to}, messageId=${data?.id}`);
  return data;
}
