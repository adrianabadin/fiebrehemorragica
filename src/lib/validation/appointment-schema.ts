import { z } from "zod";

export const DOCUMENT_TYPES = ["DNI", "LC", "LE", "Pasaporte", "Otro"] as const;

export const appointmentSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  documentType: z.enum(DOCUMENT_TYPES),
  documentNumber: z.string().trim().regex(/^\d{7,10}$/),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(30),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];
