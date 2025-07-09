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

    const { nombre, plantilla } = await req.json();
    
    // Verificar si el usuario ya tiene tienda
    const tiendaExistente = await prisma.tienda.findFirst({
      where: { userId: user.id }
    });

    if (tiendaExistente) {
      // Actualizar tienda existente
      const dataUpdate: Record<string, any> = {};
      if (nombre !== undefined) dataUpdate.nombre = nombre;
      if (plantilla !== undefined) dataUpdate.plantilla = plantilla;

      const tienda = await prisma.tienda.update({
        where: { id: tiendaExistente.id },
        data: dataUpdate
      });

      return NextResponse.json(tienda, { status: 200 });
    } else {
      // Crear nueva tienda para este usuario
      const dataCreate: Record<string, any> = { userId: user.id };
      if (nombre !== undefined) dataCreate.nombre = nombre;
      if (plantilla !== undefined) dataCreate.plantilla = plantilla;

      const tienda = await prisma.tienda.create({
        data: dataCreate
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