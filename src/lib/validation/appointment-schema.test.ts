import { describe, expect, it } from "vitest";

import { appointmentSchema, DOCUMENT_TYPES } from "./appointment-schema";

describe("appointmentSchema", () => {
  const validPayload = {
    firstName: "Ana",
    lastName: "Perez",
    documentType: "DNI",
    documentNumber: "12345678",
    email: "ana@example.com",
    phone: "2346512345",
  };

  it("accepts the new identity payload", () => {
    const parsed = appointmentSchema.safeParse(validPayload);

    expect(parsed.success).toBe(true);
  });

  it("rejects document numbers with letters", () => {
    const parsed = appointmentSchema.safeParse({
      ...validPayload,
      documentNumber: "12A45678",
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects document numbers shorter than seven digits", () => {
    const parsed = appointmentSchema.safeParse({
      ...validPayload,
      documentNumber: "123456",
    });

    expect(parsed.success).toBe(false);
  });

  it("exports the exact document type options used by the form", () => {
    expect(DOCUMENT_TYPES).toEqual(["DNI", "LC", "LE", "Pasaporte", "Otro"]);
  });
});
