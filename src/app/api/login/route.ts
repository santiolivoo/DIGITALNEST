import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

export const runtime = 'nodejs'; // 👈 importante
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ mensaje: 'Credenciales inválidas' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ mensaje: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = generateToken(user.id);

    const response = NextResponse.json({
      mensaje: 'Inicio de sesión exitoso',
      user: { id: user.id, email: user.email },
    });

    // ✅ Set-Cookie en Node runtime sí funciona
    response.headers.set(
      'Set-Cookie',
      `authToken=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    );

    return response;
  } catch (error) {
    console.error('❌ Error en login:', error);
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
}
