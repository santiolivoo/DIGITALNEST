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
        const res = await fetch('/api/tienda', {
          credentials: 'include',
        });

        const data = await res.json();
        if (res.ok && data && data.id && data.nombre) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        Cargando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold text-blue-700">DASHBOARD</h1>
        </header>

        <section className="mb-8 bg-white rounded-xl p-6 shadow">
          {tienda ? (
            <h2 className="text-2xl font-medium text-gray-800">
              Tu tienda: <span className="font-semibold text-blue-700">{tienda.nombre}</span>
            </h2>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">Aún no has configurado tu tienda.</p>
              <Link href="/dashboard/tienda" className="text-blue-600 hover:underline">
                Configurar ahora
              </Link>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/productos"
            className="bg-white rounded-xl p-5 shadow hover:shadow-md transition border border-blue-100"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Productos</h3>
            <p className="text-gray-600 text-sm">Administra tu catálogo</p>
          </Link>

          <Link
            href="/dashboard/pedidos"
            className="bg-white rounded-xl p-5 shadow hover:shadow-md transition border border-blue-100"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Pedidos</h3>
            <p className="text-gray-600 text-sm">Gestiona tus ventas</p>
          </Link>

          <Link
            href="/dashboard/configuracion"
            className="bg-white rounded-xl p-5 shadow hover:shadow-md transition border border-blue-100"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Configuración</h3>
            <p className="text-gray-600 text-sm">Personaliza tu tienda</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
