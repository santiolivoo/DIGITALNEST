'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Tienda {
  id: string;
  nombre: string;
}

export default function TiendasPage() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerTiendas = async () => {
      try {
        const res = await fetch('/api/publico/tiendas');
        const data = await res.json();
        if (res.ok) {
          setTiendas(data);
        }
      } catch (error) {
        console.error('Error obteniendo tiendas publicas:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerTiendas();
  }, []);

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-semibold text-center text-[#FFD944] mb-8">
        Tiendas DigitalNest
      </h1>

      {loading ? (
        <p className="text-center text-gray-300">Cargando tiendas...</p>
      ) : tiendas.length === 0 ? (
        <p className="text-center text-gray-300">No hay tiendas disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiendas.map((tienda) => (
            <Link
              key={tienda.id}
              href={`/tienda/${tienda.id}`}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow hover:bg-white/20 transition text-center"
            >
              {tienda.nombre}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}