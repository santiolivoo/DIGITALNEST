import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

// Usamos el mismo patrón singleton que en registro
const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { mensaje: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { mensaje: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return NextResponse.json(
        { mensaje: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Éxito - Aquí deberíamos crear una sesión o token JWT
    // Por ahora devolvemos una respuesta exitosa
    // En el éxito del login
return NextResponse.json(
  { 
    mensaje: 'Inicio de sesión exitoso',
    user: {
      id: user.id,
      email: user.email
    }
  },
  {
    status: 200,
    headers: {
      'Set-Cookie': `isAuthenticated=true; Path=/; HttpOnly; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    }
  }
)

  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { mensaje: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}