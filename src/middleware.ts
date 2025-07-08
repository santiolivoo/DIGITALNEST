import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ❌ No redirige ni verifica sesión. Útil para desarrollo.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

// ⛔ Desactivamos protección
export const config = {
  matcher: [], // No aplica a ninguna ruta por ahora
};