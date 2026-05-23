import { Resend } from "resend";
import { buildRescheduleEmail } from "./reschedule-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRescheduleEmail(input: {
  to: string;
  fullName: string;
  oldDate: string;
  newDate: string;
  newTime: string;
}) {
  const email = buildRescheduleEmail(input);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Turnos <turnos@example.com>",
    to: input.to,
    subject: email.subject,
    html: email.html,
  });

  if (error) {
    throw new Error(`Failed to send reschedule email: ${error.message}`);
  }

  return data;
}
