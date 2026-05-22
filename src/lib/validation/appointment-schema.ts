import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(30),
  reason: z.string().trim().min(5).max(500),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;