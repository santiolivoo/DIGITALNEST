import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Solución singleton para Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ mensaje: 'El usuario ya existe' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Cifrar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ mensaje: 'Usuario creado exitosamente' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return new Response(JSON.stringify({ mensaje: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}