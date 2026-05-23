import { SignJWT } from "jose";
import { beforeAll, describe, expect, it } from "vitest";
import { getAuthUser } from "./get-auth-user";
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

const JWT_SECRET = new TextEncoder().encode("test-secret-key-for-tests");

describe("getAuthUser", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret-key-for-tests";
  });

  function makeRequestWithCookie(cookie: string): Request {
    return new Request("http://localhost/api/test", {
      headers: { cookie },
    });
  }

  async function signToken(payload: Record<string, unknown>): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(JWT_SECRET);
  }

  it("returns user from valid token", async () => {
    const token = await signToken({ userId: "user1", role: "admin" });
    const req = makeRequestWithCookie(`token=${token}`);
    const user = await getAuthUser(req);
    expect(user).toEqual({ userId: "user1", role: "admin" });
  });

  it("throws on missing cookie", async () => {
    const req = new Request("http://localhost/api/test");
    await expect(getAuthUser(req)).rejects.toThrow("No autenticado");
  });

  it("throws on invalid token", async () => {
    const req = makeRequestWithCookie("token=invalid-token-value");
    await expect(getAuthUser(req)).rejects.toThrow("No autenticado");
  });

  it("throws on expired token", async () => {
    const token = await new SignJWT({ userId: "user1", role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("0s")
      .sign(JWT_SECRET);
    const req = makeRequestWithCookie(`token=${token}`);
    await expect(getAuthUser(req)).rejects.toThrow("No autenticado");
  });
});
