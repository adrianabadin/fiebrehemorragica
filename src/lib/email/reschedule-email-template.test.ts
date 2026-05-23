import { describe, expect, it } from "vitest";
import { buildRescheduleEmail } from "./reschedule-email-template";

describe("buildRescheduleEmail", () => {
  it("includes old and new dates and time", () => {
    const email = buildRescheduleEmail({
      fullName: "Ana Perez",
      oldDate: "2026-06-05",
      newDate: "2026-06-12",
      newTime: "09:30",
    });

    expect(email.subject).toContain("reprogramado");
    expect(email.html).toContain("Ana Perez");
    expect(email.html).toContain("2026-06-05");
    expect(email.html).toContain("2026-06-12");
    expect(email.html).toContain("09:30");
    expect(email.html).toContain("Hijas de San Jose 145");
  });
});
