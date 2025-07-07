'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
          console.log("✅ Usuario autenticado. Redirigiendo a /dashboard...");
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error("❌ Error al verificar sesión:", error);
      }
    }

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🚀 Enviando login...");
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
      console.log("📥 Resultado login:", data);
      console.log("📦 Headers:", res.headers);
      console.log("🍪 Set-Cookie:", res.headers.get("set-cookie"));

      if (res.ok) {
        setMensaje("Inicio de sesión exitoso! Redirigiendo...");
        console.log("✅ Login OK. Redirigiendo en 500ms...");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      } else {
        setMensaje(data.mensaje || "Error en inicio de sesión");
      }
    } catch (error) {
      console.error("❌ Error en conexión al login:", error);
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
          <p
            className={`text-center mt-5 text-base ${
              mensaje.includes("exitoso") ? "text-green-600" : "text-red-600"
            }`}
          >
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
