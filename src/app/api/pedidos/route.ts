import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { pedidos, Pedido } from './data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ mensaje: 'No autorizado' }, { status: 401 });
  }
  return NextResponse.json(pedidos);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ mensaje: 'No autorizado' }, { status: 401 });
  }
  const { cliente, total, estado } = await req.json();
  const nuevo: Pedido = {
    id: Date.now().toString(),
    cliente,
    total,
    estado,
    fecha: new Date().toISOString(),
  };
  pedidos.push(nuevo);
  return NextResponse.json(nuevo, { status: 201 });
}