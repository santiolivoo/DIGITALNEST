import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { tiendaId: string } }
) {
  try {
    const productos = await prisma.producto.findMany({
      where: { tiendaId: params.tiendaId },
      select: { id: true, nombre: true, precio: true, stock: true, imagenUrl: true },
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error obteniendo productos publicos:', error);
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
}