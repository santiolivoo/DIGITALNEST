import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Buscar la tienda del usuario específico
    const tienda = await prisma.tienda.findFirst({
      where: { userId: user.id },
      include: { productos: true }
    });

    return NextResponse.json(tienda || null);

  } catch (error) {
    console.error('Error obteniendo tienda:', error);
    return NextResponse.json(
      { error: 'Error obteniendo tienda' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { nombre } = await req.json();
    
    // Verificar si el usuario ya tiene tienda
    const tiendaExistente = await prisma.tienda.findFirst({
      where: { userId: user.id }
    });

    if (tiendaExistente) {
      // Actualizar tienda existente
      const tienda = await prisma.tienda.update({
        where: { id: tiendaExistente.id },
        data: { nombre }
      });

      return NextResponse.json(tienda, { status: 200 });
    } else {
      // Crear nueva tienda para este usuario
      const tienda = await prisma.tienda.create({
        data: {
          nombre,
          userId: user.id
        }
      });

      return NextResponse.json(tienda, { status: 201 });
    }
  } catch (error) {
        console.error('Error creando/actualizando tienda:', error);
    return NextResponse.json(
      { error: 'Error creando/actualizando tienda' },
      { status: 500 }
    );
  }
}