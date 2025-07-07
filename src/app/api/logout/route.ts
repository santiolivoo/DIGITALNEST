import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // necesario si usás cookies
export const dynamic = 'force-dynamic';

export async function GET() {
  const response = NextResponse.json({ mensaje: 'Sesión cerrada' });

  // ❌ Sobrescribe la cookie con vencimiento inmediato
  response.headers.set(
    'Set-Cookie',
    `authToken=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`
  );

  return response;
}
