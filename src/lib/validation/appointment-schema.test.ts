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

    if (!parsed.success) {
      throw new Error("Expected payload to parse successfully");
    }

    expect(parsed.data).toEqual(validPayload);
  });

  it("rejects document numbers with letters", () => {
    const parsed = appointmentSchema.safeParse({
      ...validPayload,
      documentNumber: "12A45678",
    });

    expect(parsed.success).toBe(false);

    if (parsed.success) {
      throw new Error("Expected payload to fail document number validation");
    }

    expect(parsed.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["documentNumber"],
        }),
      ]),
    );
  });

  it("rejects document numbers shorter than seven digits", () => {
    const parsed = appointmentSchema.safeParse({
      ...validPayload,
      documentNumber: "123456",
    });

    expect(parsed.success).toBe(false);

    if (parsed.success) {
      throw new Error("Expected payload to fail document number validation");
    }

    expect(parsed.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["documentNumber"],
        }),
      ]),
    );
  });

  it("exports the exact document type options used by the form", () => {
    expect(DOCUMENT_TYPES).toEqual(["DNI", "LC", "LE", "Pasaporte", "Otro"]);
  });
});
