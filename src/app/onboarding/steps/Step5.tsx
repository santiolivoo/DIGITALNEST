'use client'
import { useState } from 'react'
import { useOnboardingStore } from '../useOnboardingStore'

const opciones = ['Pagos', 'Envíos', 'Marketing']

export default function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setData, data } = useOnboardingStore()
  const [mods, setMods] = useState<string[]>(data.modulos || [])

  const toggle = (m: string) => {
    setMods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m])
  }

  const handleNext = () => {
    setData({ modulos: mods })
    onNext()
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-[#FFD944]">Configuraciones adicionales</h2>
      <div className="flex flex-col items-center gap-2">
        {opciones.map((m) => (
          <label key={m} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={mods.includes(m)}
              onChange={() => toggle(m)}
            />
            <span>{m}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={onBack} className="underline text-gray-300">Volver</button>
        <button
          onClick={handleNext}
          className="bg-[#FFD944] text-gray-900 px-4 py-2 rounded hover:bg-yellow-300"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}