import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'; // ✅ fuerza que el handler lea cookies dinámicamente


export async function GET() {
  console.log("📥 Entrando a /api/session");

  const cookieStore = await cookies(); // ✅ usar await si da error
  const token = cookieStore.get('authToken')?.value;
  console.log("🧁 Cookie recibida:", token);

  if (!token) {
    console.log("❌ No hay token en la cookie");
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  try {
    console.log("🔐 Verificando token...");
const userId = verifyToken(token);
console.log("✅ Token válido, userId:", userId);


    if (!userId) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true, userId }, { status: 200 });

  } catch (error) {
    console.error("Error al verificar token:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
