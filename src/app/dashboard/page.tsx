'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Tienda {
  id: string;
  nombre: string;
}

export default function DashboardPage() {
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
      <div className="min-h-screen flex items-center justify-center text-gray-200">
        Cargando...
      </div>
    );
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold text-[#FFD944]">DASHBOARD</h1>
        </header>

        <section className="mb-8 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow">
          {tienda ? (
            <div className="space-y-2">
              <h2 className="text-2xl font-medium text-gray-200">
                Tu tienda: <span className="font-semibold text-[#FFD944]">{tienda.nombre}</span>
              </h2>
              <Link
                href={`/tienda/${tienda.id}`}
                className="text-[#FFD944] hover:underline block"
              >
                Ver mi tienda
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-2">Aún no has configurado tu tienda.</p>
              <Link href="/dashboard/tienda" className="text-[#FFD944] hover:underline">
                Configurar ahora
              </Link>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/productos"
            className="bg-white/10 backdrop-blur-md rounded-xl p-5 hover:bg-white/20 transition border border-white/20"
          >
            <h3 className="text-xl font-semibold text-[#FFD944] mb-1">Productos</h3>
            <p className="text-gray-200 text-sm">Administra tu catálogo</p>
          </Link>

          <Link
            href="/dashboard/pedidos"
            className="bg-white/10 backdrop-blur-md rounded-xl p-5 hover:bg-white/20 transition border border-white/20"
          >
            <h3 className="text-xl font-semibold text-[#FFD944] mb-1">Pedidos</h3>
            <p className="text-gray-200 text-sm">Gestiona tus ventas</p>
          </Link>

          <Link
            href="/dashboard/configuracion"
            className="bg-white/10 backdrop-blur-md rounded-xl p-5 hover:bg-white/20 transition border border-white/20"
          >
            <h3 className="text-xl font-semibold text-[#FFD944] mb-1">Configuración</h3>
            <p className="text-gray-200 text-sm">Personaliza tu tienda</p>
          </Link>
        </section>
      </div>
    </main>
  );
}