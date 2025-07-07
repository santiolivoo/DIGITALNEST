import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Solución singleton para Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  const {
    nombre,
    email,
    password,
    confirmPassword,
    experiencia,
    tiposProducto,
    referencia,
    negocioNombre,
    aceptoTerminos,
  } = await req.json();

  if (!nombre || !email || !password || !confirmPassword || !aceptoTerminos) {
    return new Response(
      JSON.stringify({ mensaje: 'Faltan campos requeridos' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({ mensaje: 'Las contrase\u00f1as no coinciden' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
    return new Response(
      JSON.stringify({ mensaje: 'La contrase\u00f1a es muy d\u00e9bil' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

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

    // Crear usuario con campos opcionales
    const user = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        experiencia,
        tiposProducto,
        referencia,
      },
    });

    // Crear tienda si se especifica nombre de negocio
    if (negocioNombre) {
      await prisma.tienda.create({
        data: {
          nombre: negocioNombre,
          userId: user.id,
        },
      });
    }

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