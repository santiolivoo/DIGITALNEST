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
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="relative bg-white/10 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/20">
      <div className="flex flex-col">
        <Logo className="h-12 w-auto" />
        {nombreTienda && (
          <span className="text-sm text-gray-200">Tienda: {nombreTienda}</span>
        )}
      </div>
      <button
        className="sm:hidden p-2"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>
      <nav
        className={`${menuOpen ? 'flex' : 'hidden'} flex-col gap-2 absolute top-full left-0 w-full bg-white/10 backdrop-blur-md p-4 sm:static sm:flex sm:flex-row sm:items-center sm:gap-4 sm:bg-transparent sm:p-0`}
      >
        <Link href="/dashboard" className="hover:underline">
          Inicio
        </Link>
        <Link href="/dashboard/productos" className="hover:underline">
          Productos
        </Link>
        <Link href="/dashboard/pedidos" className="hover:underline">
          Pedidos
        </Link>
        <Link href="/dashboard/configuracion" className="hover:underline">
          Configuración
        </Link>
        {tiendaId && (
          <Link href={`/tienda/${tiendaId}`} className="hover:underline">
            Ver mi tienda
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="bg-[#FFD944] text-gray-900 px-3 py-1 rounded hover:bg-yellow-300 transition sm:ml-4"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}