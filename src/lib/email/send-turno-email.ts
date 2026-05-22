import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTurnoEmail(input: {
  to: string;
  name: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  const email = buildTurnoEmail(input);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Turnos <turnos@example.com>",
    to: input.to,
    subject: email.subject,
    html: email.html,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}