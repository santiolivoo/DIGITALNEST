import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return NextResponse.json(
        { mensaje: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { mensaje: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = generateToken(user.id);

    const response = NextResponse.json(
      { 
        mensaje: 'Inicio de sesión exitoso',
        user: { id: user.id, email: user.email }
      },
      { status: 200 }
    );

    // Guardar token en cookie HTTP-only
    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { mensaje: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}