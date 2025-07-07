import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const userId = token ? verifyToken(token) : null;
  const isAuthenticated = !!userId;
  
  const { pathname } = request.nextUrl;
  
  // Rutas públicas
  const publicPaths = ['/', '/login', '/registro'];
  
  // Rutas protegidas
  const protectedPaths = ['/dashboard', '/dashboard/tienda'];

  // Redirigir si no está autenticado y accede a ruta protegida
  if (!isAuthenticated && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirigir si está autenticado y accede a ruta pública (excepto home)
  if (isAuthenticated && publicPaths.includes(pathname) && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}