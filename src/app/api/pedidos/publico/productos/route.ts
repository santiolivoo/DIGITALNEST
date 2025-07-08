import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ItemInput {
  productoId: string;
  cantidad: number;
}

export async function POST(req: Request) {
  try {
    const { cliente, items } = await req.json();

    if (!cliente?.nombre || !cliente?.email) {
      return NextResponse.json({ mensaje: 'Datos de cliente incompletos' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ mensaje: 'Sin items' }, { status: 400 });
    }

    const productos = await prisma.producto.findMany({
      where: { id: { in: items.map((i: ItemInput) => i.productoId) } },
      select: { id: true, precio: true, tiendaId: true },
    });

    if (productos.length !== items.length) {
      return NextResponse.json({ mensaje: 'Producto inválido' }, { status: 400 });
    }

    const tiendaId = productos[0].tiendaId;
    if (!productos.every((p) => p.tiendaId === tiendaId)) {
      return NextResponse.json({ mensaje: 'Productos de distintas tiendas' }, { status: 400 });
    }

    const itemsData = items.map((i: ItemInput) => {
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
        nombre: cliente.nombre,
        email: cliente.email,
        items: { create: itemsData },
      },
      include: { items: true },
    });

    return NextResponse.json(pedido, { status: 201 });
  } catch (error) {
    console.error('Error creando pedido publico:', error);
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
}