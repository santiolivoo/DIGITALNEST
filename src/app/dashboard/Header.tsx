"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [nombreTienda, setNombreTienda] = useState<string>('');

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        router.replace('/');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    const fetchTienda = async () => {
      try {
        const res = await fetch('/api/tienda', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data?.nombre) {
          setNombreTienda(data.nombre);
        }
      } catch (error) {
        console.error('No se pudo cargar el nombre de la tienda');
      }
    };

    fetchTienda();
  }, []);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-blue-700">DIGITALNEST</h1>
        {nombreTienda && (
          <span className="text-sm text-gray-600">Tienda: {nombreTienda}</span>
        )}
      </div>
      <nav className="space-x-4 flex items-center">
        <Link href="/dashboard" className="text-blue-600 hover:underline">Inicio</Link>
        <Link href="/dashboard/productos" className="text-blue-600 hover:underline">Productos</Link>
        <Link href="/dashboard/pedidos" className="text-blue-600 hover:underline">Pedidos</Link>
        <Link href="/dashboard/configuracion" className="text-blue-600 hover:underline">Configuración</Link>
        <button
          onClick={handleLogout}
          className="ml-4 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
