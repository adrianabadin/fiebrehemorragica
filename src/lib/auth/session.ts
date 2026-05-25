import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Asumimos que podemos obtener el nombre del usuario desde DB o payload
    // El payload del login ahora tiene { userId, role }
    // Vamos a retornar esto
    return {
      userId: payload.userId as string,
      role: payload.role as string,
      name: (payload.name as string) || "Usuario"
    };
  } catch (error) {
    return null;
  }
}
