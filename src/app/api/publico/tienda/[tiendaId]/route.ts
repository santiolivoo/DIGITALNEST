import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { tiendaId: string } }
) {
  try {
    const tienda = await prisma.tienda.findUnique({
      where: { id: params.tiendaId },
      select: { id: true, nombre: true, plantilla: true, color: true, fuente: true },
    });

    if (!tienda) {
      return NextResponse.json({ mensaje: 'Tienda no encontrada' }, { status: 404 });
    }

    return NextResponse.json(tienda);
  } catch (error) {
    console.error('Error obteniendo tienda publica:', error);
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
}
