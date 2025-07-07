'use client'

import { useState } from 'react'

export default function RegistroPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acepto, setAcepto] = useState(false)
  const [negocioNombre, setNegocioNombre] = useState('')
  const [experiencia, setExperiencia] = useState('')
  const [tiposProducto, setTiposProducto] = useState('')
  const [referencia, setReferencia] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errores, setErrores] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
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
        experiencia,
        tiposProducto,
        referencia,
        negocioNombre,
        aceptoTerminos: acepto,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (res.ok) {
      setMensaje(data.mensaje)
      setNombre('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setAcepto(false)
      setNegocioNombre('')
      setExperiencia('')
      setTiposProducto('')
      setReferencia('')
    } else {
      setErrores(data.mensaje || 'Error en registro')
    }
  }

  const passwordValida = /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)
  const confirmaOK = password === confirmPassword && confirmPassword.length > 0

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Registrate en DIGITALNEST</h1>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          required
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black placeholder:text-black"
        />

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
          className="w-full p-3 mb-2 border border-gray-300 rounded-md text-black placeholder:text-black"
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
          className="w-full p-3 mb-2 border border-gray-300 rounded-md text-black placeholder:text-black"
        />
        {!confirmaOK && confirmPassword.length > 0 && (
          <p className="text-sm text-red-600 mb-2">Las contraseñas no coinciden</p>
        )}

        <label className="flex items-center mb-4">
          <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} className="mr-2" />
          <span className="text-black">Acepto los Términos y Condiciones</span>
        </label>

        <input
          type="text"
          placeholder="Nombre de tu negocio (opcional)"
          value={negocioNombre}
          onChange={(e) => setNegocioNombre(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black placeholder:text-black"
        />

        <select
          value={experiencia}
          onChange={(e) => setExperiencia(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black"
        >
          <option value="">tienes experiencia vendiendo online?</option>
          <option value="sí">Sí</option>
          <option value="no">No</option>
          <option value="algo">Algo</option>
        </select>

        <input
          type="text"
          placeholder="Tipos de producto (opcional)"
          value={tiposProducto}
          onChange={(e) => setTiposProducto(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black placeholder:text-black"
        />

        <input
          type="text"
          placeholder="¿Cómo conociste DIGITALNEST? (opcional)"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-black placeholder:text-black"
        />

        <button
          type="submit"
          disabled={!passwordValida || !confirmaOK}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50"
        >
          Crear cuenta
        </button>

        {errores && <p className="text-center mt-5 text-red-600">{errores}</p>}
        {mensaje && <p className="text-center mt-5 text-green-600">{mensaje}</p>}
      </form>
    </main>
  )
}