import { Resend } from "resend";
import { buildTurnoEmail } from "./turno-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTurnoEmail(input: {
  to: string;
  fullName: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  console.log(`[EMAIL] Sending turno email to ${input.to} (${input.fullName}) for ${input.scheduledDate} ${input.scheduledTime}`);

  if (!process.env.RESEND_API_KEY) {
    throw new Error("[EMAIL] RESEND_API_KEY is not set");
  }

  const email = buildTurnoEmail(input);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Turnos <turnos@example.com>",
    to: input.to,
    subject: email.subject,
    html: email.html,
  });

  if (error) {
    console.error(`[EMAIL] Failed to send to ${input.to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  console.log(`[EMAIL] Successfully sent to ${input.to}, messageId=${data?.id}`);
  return data;
}