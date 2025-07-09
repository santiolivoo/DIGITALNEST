"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useOnboardingStore } from '../onboarding/useOnboardingStore';
// Update the path below to the correct relative path if needed
import Logo from '../../components/Logo';

export default function Header() {
  const router = useRouter();
  const [nombreTienda, setNombreTienda] = useState<string>('');
  const [tiendaId, setTiendaId] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.removeItem('onboardingCompleted');
        useOnboardingStore.getState().reset();
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
        if (res.ok && data) {
          if (data.nombre) {
            setNombreTienda(data.nombre);
          }
          if (data.id) {
            setTiendaId(data.id);
          }
        }
      } catch (error) {
      console.error('No se pudo cargar el nombre de la tienda:', error);
      }
    };

    fetchTienda();
  }, []);

  return (
    <header className="bg-white/10 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/20">
      <div className="flex flex-col">
        <Logo className="h-12 w-auto" />
        {nombreTienda && (
          <span className="text-sm text-gray-200">Tienda: {nombreTienda}</span>
        )}
      </div>
      <nav className="space-x-4 flex items-center">
        <Link href="/dashboard" className="hover:underline">Inicio</Link>
        <Link href="/dashboard/productos" className="hover:underline">Productos</Link>
        <Link href="/dashboard/pedidos" className="hover:underline">Pedidos</Link>
        <Link href="/dashboard/configuracion" className="hover:underline">Configuración</Link>
        {tiendaId && (
          <Link href={`/tienda/${tiendaId}`} className="hover:underline">
            Ver mi tienda
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="ml-4 bg-[#FFD944] text-gray-900 px-3 py-1 rounded hover:bg-yellow-300 transition"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}