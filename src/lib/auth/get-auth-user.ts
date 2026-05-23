import { jwtVerify } from "jose";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number = 401) {
    super(message);
    this.status = status;
  }
}

export async function getAuthUser(request: Request): Promise<{
  userId: string;
  role: string;
}> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);

  if (!tokenMatch?.[1]) {
    throw new AuthError("No autenticado");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(tokenMatch[1], secret);
    return {
      userId: payload.userId as string,
      role: payload.role as string,
    };
  } catch {
    throw new AuthError("No autenticado");
  }
}
