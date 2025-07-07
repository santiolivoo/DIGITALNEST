'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoutParam = urlParams.get('logout');

    if (logoutParam === 'true') {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    const isAuthenticated = Cookies.get('isAuthenticated');
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Bienvenido a <span className="text-indigo-600">DigitalNest</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-600">
          Lanza tu tienda online en minutos. Simple, rápido y profesional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">¿Primera vez aquí?</h2>
            <p className="text-gray-600 mb-6">
              DigitalNest te permite crear y gestionar tu tienda sin necesidad de conocimientos técnicos.
            </p>
            <Link
              href="/registro"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition"
            >
              Crear mi tienda
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">¿Ya tenés cuenta?</h2>
            <p className="text-gray-600 mb-6">
              Accedé a tu panel para gestionar tus productos, pedidos y configuraciones.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
