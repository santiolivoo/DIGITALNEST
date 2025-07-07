import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  // Rutas públicas
  const publicPaths = ['/', '/login', '/registro'];
  
  // Rutas protegidas
  const protectedPaths = ['/dashboard', '/mi-tienda'];

  // Si no está autenticado y accede a ruta protegida
  if (!isAuthenticated && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si está autenticado y accede a ruta pública (excepto home)
  if (isAuthenticated && publicPaths.includes(pathname) && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}