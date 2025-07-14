'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '../onboarding/useOnboardingStore';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(min-width: 640px)').matches) {
      setOpen(false);
    }
  }, []);
  const router = useRouter();

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

  return (
    <aside
      className={`${open ? 'sm:w-64' : 'sm:w-16'} border-b border-white/20 sm:border-b-0 sm:border-r`}
    >
      <button
        className="p-2"
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
        className={`${open ? 'block' : 'hidden'} bg-white/10 backdrop-blur-md p-4 sm:h-screen sm:bg-transparent`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="#" className="hover:underline">
              Notificaciones
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Ajustes
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Perfil
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Ayuda
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Comunidad
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:underline">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}