import { NextResponse } from 'next/server';
export async function POST() {
  try {
    // Crear respuesta de éxito
    const response = NextResponse.json(
      { mensaje: 'Sesión cerrada exitosamente' },
      { status: 200 }
    );

    // Eliminar la cookie de autenticación
    response.cookies.delete('isAuthenticated');
    
    // Opcional: eliminar otras cookies relacionadas con la sesión
    // response.cookies.delete('sessionToken');
    
    return response;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json(
      { mensaje: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}