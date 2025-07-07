import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { nombre, experiencia, tiposProducto, referencia, email } = user;
    return NextResponse.json({ nombre, experiencia, tiposProducto, referencia, email });
  } catch (error) {
    console.error('Error obteniendo configuración:', error);
    return NextResponse.json({ error: 'Error obteniendo configuración' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { nombre, experiencia, tiposProducto, referencia } = await req.json();

    await prisma.user.update({
      where: { id: user.id },
      data: { nombre, experiencia, tiposProducto, referencia },
    });

    return NextResponse.json({ mensaje: 'Configuración actualizada' });
  } catch (error) {
    console.error('Error actualizando configuración:', error);
    return NextResponse.json({ error: 'Error actualizando configuración' }, { status: 500 });
  }
}