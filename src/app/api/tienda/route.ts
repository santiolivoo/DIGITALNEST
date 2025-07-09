import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { Prisma } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

    const { nombre, plantilla } = await req.json();
    
    // Verificar si el usuario ya tiene tienda
    const tiendaExistente = await prisma.tienda.findFirst({
      where: { userId: user.id }
    });

    if (tiendaExistente) {
      // Actualizar tienda existente
            const dataUpdate: Prisma.TiendaUpdateInput = {
        ...(nombre !== undefined ? { nombre } : {}),
        ...(plantilla !== undefined ? { plantilla } : {}),
      };

      const tienda = await prisma.tienda.update({
        where: { id: tiendaExistente.id },
        data: dataUpdate
      });

      return NextResponse.json(tienda, { status: 200 });
    } else {
      // Crear nueva tienda para este usuario
            if (!nombre) {
        return NextResponse.json(
          { error: 'El nombre de la tienda es requerido' },
          { status: 400 },
        );
      }

      const dataCreate: Prisma.TiendaUncheckedCreateInput = {
        userId: user.id,
        nombre,
        ...(plantilla !== undefined ? { plantilla } : {}),
      };

      const tienda = await prisma.tienda.create({
        data: dataCreate,
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

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { plantilla } = await req.json();

    const tienda = await prisma.tienda.findFirst({
      where: { userId: user.id }
    });

    if (!tienda) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 }
      );
    }

    const dataUpdate: Prisma.TiendaUpdateInput = {
      ...(plantilla !== undefined ? { plantilla } : {}),
    };

    const updated = await prisma.tienda.update({
      where: { id: tienda.id },
      data: dataUpdate,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error actualizando plantilla:', error);
    return NextResponse.json(
      { error: 'Error actualizando plantilla' },
      { status: 500 }
    );
  }
}