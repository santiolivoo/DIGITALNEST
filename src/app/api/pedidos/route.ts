import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ mensaje: 'No autorizado' }, { status: 401 });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return NextResponse.json({ mensaje: 'Token inválido' }, { status: 401 });
  }

  const tienda = await prisma.tienda.findFirst({ where: { userId } });
  if (!tienda) {
    return NextResponse.json([], { status: 200 });
  }

  const pedidos = await prisma.pedido.findMany({
    where: { tiendaId: tienda.id },
    include: { items: true },
  });

  return NextResponse.json(pedidos);
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ mensaje: 'No autorizado' }, { status: 401 });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ mensaje: 'Token inválido' }, { status: 401 });
    }

    const items: Array<{ productoId: string; cantidad: number }> = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ mensaje: 'Sin items' }, { status: 400 });
    }

    const productos = await prisma.producto.findMany({
      where: { id: { in: items.map((i) => i.productoId) } },
      select: { id: true, precio: true, tiendaId: true },
    });

    if (productos.length !== items.length) {
      return NextResponse.json({ mensaje: 'Producto inválido' }, { status: 400 });
    }

    const tiendaId = productos[0].tiendaId;
    if (!productos.every((p) => p.tiendaId === tiendaId)) {
      return NextResponse.json({ mensaje: 'Productos de distintas tiendas' }, { status: 400 });
    }

    const itemsData = items.map((i) => {
      const producto = productos.find((p) => p.id === i.productoId)!;
      return {
        productoId: i.productoId,
        cantidad: i.cantidad,
        subtotal: producto.precio * i.cantidad,
      };
    });

    const total = itemsData.reduce((acc, item) => acc + item.subtotal, 0);

    const pedido = await prisma.pedido.create({
      data: {
        total,
        tiendaId,
        items: { create: itemsData },
      },
      include: { items: true },
    });

    return NextResponse.json(pedido, { status: 201 });
  } catch (error) {
    console.error('Error creando pedido:', error);
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
}