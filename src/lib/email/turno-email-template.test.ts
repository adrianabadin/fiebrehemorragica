import { describe, expect, it } from "vitest";
import { buildTurnoEmail } from "./turno-email-template";

describe("buildTurnoEmail", () => {
  it("includes campaign, date, time, and fixed address", () => {
    const email = buildTurnoEmail({
      name: "Ana",
      scheduledDate: "2026-10-30",
      scheduledTime: "08:30",
    });

    expect(email.subject).toContain("turno");
    expect(email.html).toContain("vacunacion de fiebre hemorragica");
    expect(email.html).toContain("2026-10-30");
    expect(email.html).toContain("08:30");
    expect(email.html).toContain("Hijas de San Jose 145");
    expect(email.html).toContain("Region Sanitaria X");
  });
});