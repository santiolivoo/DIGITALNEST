'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [tiendaId, setTiendaId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTienda = async () => {
      try {
        const res = await fetch('/api/tienda', { credentials: 'include' });
        const data = await res.json();
        if (res.ok && data && data.id) {
          setTiendaId(data.id);
        }
      } catch (error) {
        console.error('Error obteniendo tienda:', error);
      }
    };

    fetchTienda();
  }, []);

  return (
    <aside className="sm:w-64 border-b border-white/20 sm:border-b-0 sm:border-r">
      <button
        className="sm:hidden p-2"
        aria-label="Toggle sidebar"
        onClick={() => setOpen(!open)}
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
        className={`${open ? 'block' : 'hidden'} bg-white/10 backdrop-blur-md p-4 sm:block sm:h-screen sm:bg-transparent`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/dashboard" className="hover:underline">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/dashboard/productos" className="hover:underline">
              Productos
            </Link>
          </li>
          <li>
            <Link href="/dashboard/pedidos" className="hover:underline">
              Pedidos
            </Link>
          </li>
          <li>
            <Link href="/dashboard/configuracion" className="hover:underline">
              Configuración
            </Link>
          </li>
          {tiendaId && (
            <li>
              <Link href={`/tienda/${tiendaId}`} className="hover:underline">
                Ver mi tienda
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}