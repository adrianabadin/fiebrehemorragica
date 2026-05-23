import { afterEach, describe, expect, it } from "vitest";

import {
  buildAssignedTurnRowValues,
  buildPendingRequestRowValues,
  createSheetsAuth,
} from "./google-sheets";

const ORIGINAL_ENV = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
};

describe("google-sheets helpers", () => {
  afterEach(() => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = ORIGINAL_ENV.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    process.env.GOOGLE_PRIVATE_KEY = ORIGINAL_ENV.GOOGLE_PRIVATE_KEY;
  });

  it("creates JWT auth from service account env vars", () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "bot@example.iam.gserviceaccount.com";
    process.env.GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----\n";

    const auth = createSheetsAuth();

    expect(auth.email).toBe("bot@example.iam.gserviceaccount.com");
    expect(auth.key).toContain("BEGIN PRIVATE KEY");
    expect(auth.scopes).toContain("https://www.googleapis.com/auth/spreadsheets");
  });

  it("builds the pending row with the new identity columns", () => {
    expect(
      buildPendingRequestRowValues({
        requestId: "req-1",
        createdAtIso: "2026-05-22T10:00:00.000Z",
        firstName: "Ana",
        lastName: "Perez",
        documentType: "DNI",
        documentNumber: "12345678",
        email: "ana@example.com",
        phone: "2346512345",
      }),
    ).toEqual([
      "req-1",
      "2026-05-22T10:00:00.000Z",
      "Ana",
      "Perez",
      "DNI",
      "12345678",
      "ana@example.com",
      "2346512345",
      "pendiente",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
  });

  it("builds the assigned row for the new final columns", () => {
    expect(
      buildAssignedTurnRowValues({
        scheduledDate: "2026-10-30",
        scheduledTime: "08:30",
      }),
    ).toEqual([
      "2026-10-30",
      "08:30",
      "Hijas de San Jose 145",
      "Region Sanitaria X",
      "Vacunacion de fiebre hemorragica",
      "turno asignado",
    ]);
  });
});