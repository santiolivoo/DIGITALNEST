import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tiendas = await prisma.tienda.findMany({
      select: { id: true, nombre: true },
    });
    return NextResponse.json(tiendas);
  } catch (error) {
    console.error('Error obteniendo tiendas publicas:', error);
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
}