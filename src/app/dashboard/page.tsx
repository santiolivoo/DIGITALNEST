'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Cookies.get('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST'
      });
      Cookies.remove('isAuthenticated');
      window.location.href = `/?logout=true&t=${Date.now()}`;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Panel de Control
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido a tu Dashboard</h2>
          <p className="text-gray-600 mb-8">
            Aquí puedes administrar los aspectos principales de tu tienda online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1">Productos</h3>
              <p className="text-gray-600">Administra tu catálogo</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1">Pedidos</h3>
              <p className="text-gray-600">Gestiona tus ventas</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1">Configuración</h3>
              <p className="text-gray-600">Personaliza tu tienda</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
