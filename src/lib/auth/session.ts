import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/db/prisma";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.userId as string;
    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true, role: true },
    });

    if (!user) return null;

    return {
      userId,
      role: user.role,
      username: user.username,
    };
  } catch (error) {
    return null;
  }
}
