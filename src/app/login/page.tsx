'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir al dashboard
    const isAuthenticated = Cookies.get('isAuthenticated');
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMensaje("Inicio de sesión exitoso! Redirigiendo...");
        
        // Guardar cookie de autenticación
        Cookies.set('isAuthenticated', 'true', { 
          expires: 7, // 7 días
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/'
        });
        
        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        setMensaje(data.mensaje || "Error en inicio de sesión");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión");
    }
  };


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Inicia sesión en DIGITALNEST
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black placeholder:text-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black placeholder:text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Iniciar sesión
        </button>

        {mensaje && (
          <p className={`text-center mt-5 text-base ${
            mensaje.includes("exitoso") ? "text-green-600" : "text-red-600"
          }`}>
            {mensaje}
          </p>
        )}

        <div className="text-center mt-4">
          <span className="text-gray-600">¿No tienes cuenta? </span>
          <Link href="/registro" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </div>
      </form>
    </main>
  );
}
