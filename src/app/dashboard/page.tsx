'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tienda {
  id: string;
  nombre: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerTienda = async () => {
      try {
        const res = await fetch('/api/tienda');
        const data = await res.json();
        
        if (res.ok && data) {
          setTienda(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo tienda:', error);
        setLoading(false);
      }
    };

    obtenerTienda();
  }, []);

  const handleLogout = async () => {
    // ... (código de logout existente)
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Control</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cerrar sesión
          </button>
        </div>

        {tienda ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Tu tienda: {tienda.nombre}</h2>
          </div>
        ) : (
          <div className="mb-6">
            <p>Aún no has configurado tu tienda.</p>
            <Link href="/dashboard/tienda" className="text-blue-600">
              Configurar ahora
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/productos" className="border p-4 rounded-lg hover:bg-gray-50 transition">
            <h3 className="font-medium">Productos</h3>
            <p className="text-gray-600">Administra tu catálogo</p>
          </Link>
          
          <Link href="/dashboard/pedidos" className="border p-4 rounded-lg hover:bg-gray-50 transition">
            <h3 className="font-medium">Pedidos</h3>
            <p className="text-gray-600">Gestiona tus ventas</p>
          </Link>
          
          <Link href="/dashboard/configuracion" className="border p-4 rounded-lg hover:bg-gray-50 transition">
            <h3 className="font-medium">Configuración</h3>
            <p className="text-gray-600">Personaliza tu tienda</p>
          </Link>
        </div>
      </div>
    </main>
  );
}