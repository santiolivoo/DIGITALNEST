'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function RegistroPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acepto, setAcepto] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [errores, setErrores] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrores(null)

    if (!acepto) {
      setErrores('Debes aceptar los términos')
      return
    }

    const res = await fetch('/api/registro', {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        email,
        password,
        confirmPassword,
        aceptoTerminos: acepto,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (res.ok) {
      // Registro exitoso, intentar login inmediatamente
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginRes.json()

      if (loginRes.ok) {
        // Limpiar formulario y redirigir solo si el login fue exitoso
        setMensaje(data.mensaje)
        setNombre('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAcepto(false)
        setTimeout(() => {
          const done = localStorage.getItem('onboardingCompleted') === 'true'
          router.replace(done ? '/dashboard' : '/onboarding')
        }, 500)
      } else {
        // Mostrar error de login
        setErrores(loginData.mensaje || 'Error en inicio de sesión')
      }
    } else {
      setErrores(data.mensaje || 'Error en registro')
    }
  }

  const passwordValida = /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)
  const confirmaOK = password === confirmPassword && confirmPassword.length > 0

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <Logo className="mx-auto mb-6 h-20 w-auto" />
        <h1 className="text-3xl font-bold mb-6 text-center">Regístrate</h1>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          required
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 mb-4 border border-white/30 rounded-md bg-transparent text-white placeholder:text-gray-300"
        />

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
          className="w-full p-3 mb-2 border border-white/30 rounded-md bg-transparent text-white placeholder:text-gray-300"
        />
        {!passwordValida && password.length > 0 && (
          <p className="text-sm text-red-600 mb-2">La contraseña debe tener al menos 6 caracteres, una may\u00fascula y un n\u00famero.</p>
        )}

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-2 border border-white/30 rounded-md bg-transparent text-white placeholder:text-gray-300"
        />
        {!confirmaOK && confirmPassword.length > 0 && (
          <p className="text-sm text-red-600 mb-2">Las contraseñas no coinciden</p>
        )}

        <label className="flex items-center mb-4">
          <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} className="mr-2" />
          <span className="text-white">Acepto los Términos y Condiciones</span>
        </label>


        <button
          type="submit"
          disabled={!passwordValida || !confirmaOK}
          className="w-full bg-[#FFD944] text-gray-900 py-3 rounded-md hover:bg-yellow-300 transition font-medium disabled:opacity-50"
        >
          Crear cuenta
        </button>

        {errores && <p className="text-center mt-5 text-red-600">{errores}</p>}
        {mensaje && <p className="text-center mt-5 text-green-600">{mensaje}</p>}
      </form>
    </main>
  )
}
