'use client';
import Link from 'next/link';
import Logo from '@/components/Logo';
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
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="text-center max-w-3xl">
        <Logo className="mx-auto mb-8 h-20 w-auto" />
        <h1 className="text-5xl font-bold mb-6">
          Bienvenido a <span className="text-[#FFD944]">DigitalNest</span>
        </h1>
        <p className="text-xl text-gray-200">
          Lanza tu tienda online en minutos. Simple, rápido y profesional.
        </p>

        <ul className="mt-10 mb-16 space-y-4 text-left text-lg">
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-[#FFD944]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M16 7a4 4 0 0 0-8 0" />
            </svg>
            <span>Gestiona productos sin complicaciones</span>
          </li>
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-[#FFD944]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-5-9-5-9 5 9 5zM12 12V4m0 8l9-5M3 7l9 5" />
            </svg>
            <span>Diseño profesional sin saber programar</span>
          </li>
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-[#FFD944]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>Listo para vender en minutos</span>
          </li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-3">¿Primera vez aquí?</h2>
            <p className="text-gray-200 mb-6">
              DigitalNest te permite crear y gestionar tu tienda sin necesidad de
              conocimientos técnicos.
            </p>
            <Link
              href="/registro"
              className="inline-block px-6 py-3 rounded-xl font-medium bg-[#FFD944] text-gray-900 hover:bg-yellow-300 transition"
            >
              Crear mi tienda
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-3">¿Ya tenés cuenta?</h2>
            <p className="text-gray-200 mb-6">
              Accedé a tu panel para gestionar tus productos, pedidos y
              configuraciones.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-xl font-medium bg-white text-gray-900 hover:bg-gray-200 transition"
            >
              Iniciar sesión
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-3">¿Querés comprar?</h2>
            <p className="text-gray-200 mb-6">
              Explorá los negocios creados en nuestra plataforma y realizá tu compra.
            </p>
            <Link
              href="/tiendas"
              className="inline-block px-6 py-3 rounded-xl font-medium bg-[#FFD944] text-gray-900 hover:bg-yellow-300 transition"
            >
              Comprar en Tiendas DigitalNest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
