// src/app/api/productos/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
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
       return NextResponse.json([], { status: 200 });
     }
 
     const productos = await prisma.producto.findMany({
       where: { tiendaId: tienda.id },
       select: {
         id: true,
         nombre: true,
         precio: true,
         stock: true,
         imagenUrl: true,
       },
     });
 
     return NextResponse.json(productos);
   } catch (error) {
     console.error('Error al obtener productos:', error);
     return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
   }
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

   const tienda = await prisma.tienda.findFirst({ where: { userId } });
    if (!tienda) {
      return NextResponse.json(
        { mensaje: 'Tienda no encontrada' },
        { status: 404 }
      );
    }

    const { nombre, precio, stock, imagenUrl } = await req.json();

    const producto = await prisma.producto.create({
      data: {
        nombre,
        precio,
        stock,
        imagenUrl,
        tiendaId: tienda.id,
      },
    });

    return NextResponse.json(producto, { status: 201 });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      { mensaje: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
