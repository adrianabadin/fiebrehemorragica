import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password", () => {
  it("hashes a password and verifies it correctly", async () => {
    const hash = await hashPassword("mypassword123");
    expect(hash).not.toBe("mypassword123");
    const isValid = await verifyPassword("mypassword123", hash);
    expect(isValid).toBe(true);
  });

  it("rejects wrong password", async () => {
    const hash = await hashPassword("mypassword123");
    const isValid = await verifyPassword("wrongpassword", hash);
    expect(isValid).toBe(false);
  });
});
