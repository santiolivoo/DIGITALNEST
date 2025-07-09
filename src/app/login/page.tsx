'use client';

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

useEffect(() => {
  async function checkAuth() {
    console.log("🔍 Verificando sesión con /api/session");
    try {
      const res = await fetch("/api/session", {
        method: "GET",
        credentials: "include", // para incluir cookies
      });

      const data = await res.json();
      console.log("📬 Resultado /api/session:", data);

      if (data.authenticated) {
                const done = localStorage.getItem('onboardingCompleted') === 'true'
        router.replace(done ? '/dashboard' : '/onboarding')
      }
    } catch (error) {
      console.error("❌ Error al verificar sesión:", error);
    }
  }
  checkAuth();
}, [router]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setMensaje(""); // Limpiar mensaje previo

      try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

            if (res.ok) {
        setMensaje("Inicio de sesión exitoso. Redirigiendo...");
                const done = localStorage.getItem('onboardingCompleted') === 'true'
        router.replace(done ? '/dashboard' : '/onboarding')
      } else {
        setMensaje(data.mensaje || "Error al iniciar sesión.");
      }
      } catch (error) {
      setMensaje("Error de red al intentar iniciar sesión.");
      console.error(error);
      }
    }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md text-white"
      >
        <Logo className="mx-auto mb-6 h-20 w-auto" />
        <h1 className="text-3xl font-bold mb-6 text-center">Inicia sesión</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-white/30 rounded-md bg-transparent text-white placeholder:text-gray-300"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-white/30 rounded-md bg-transparent text-white placeholder:text-gray-300"
        />

        <button
          type="submit"
          className="w-full bg-[#FFD944] text-gray-900 py-3 rounded-md hover:bg-yellow-300 transition font-medium"
        >
          Iniciar sesión
        </button>

        {mensaje && (
          <p
            className={`text-center mt-5 text-base ${
              mensaje.includes("exitoso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje}
          </p>
        )}

        <div className="text-center mt-4">
          <span className="text-gray-200">¿No tienes cuenta? </span>
          <Link href="/registro" className="text-[#FFD944] hover:underline">
            Regístrate
          </Link>
        </div>
      </form>
    </main>
  );
}
