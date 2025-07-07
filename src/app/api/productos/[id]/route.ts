import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const tienda = await prisma.tienda.findFirst({ where: { userId } });
    if (!tienda) {
      return NextResponse.json({ mensaje: 'Tienda no encontrada' }, { status: 404 });
    }

    const producto = await prisma.producto.findFirst({
      where: { id: params.id, tiendaId: tienda.id },
      select: {
        id: true,
        nombre: true,
        precio: true,
        stock: true,
        imagenUrl: true,
      },
    });

    if (!producto) {
      return NextResponse.json({ mensaje: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return NextResponse.json(
      { mensaje: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const tienda = await prisma.tienda.findFirst({ where: { userId } });
    if (!tienda) {
      return NextResponse.json({ mensaje: 'Tienda no encontrada' }, { status: 404 });
    }

    const exists = await prisma.producto.findFirst({
      where: { id: params.id, tiendaId: tienda.id },
    });

    if (!exists) {
      return NextResponse.json({ mensaje: 'Producto no encontrado' }, { status: 404 });
    }

    const { nombre, precio, stock, imagenUrl } = await req.json();

    const productoActualizado = await prisma.producto.update({
      where: { id: params.id },
      data: {
        nombre,
        precio,
        stock,
        imagenUrl,
      },
    });

    return NextResponse.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json(
      { mensaje: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
