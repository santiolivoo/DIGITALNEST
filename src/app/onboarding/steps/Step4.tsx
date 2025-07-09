'use client'
import { useState } from 'react'
import { useOnboardingStore } from '../useOnboardingStore'

export default function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setData, data } = useOnboardingStore()
  const [nombre, setNombre] = useState(data.nombre || '')
  const [color, setColor] = useState(data.color || '#FFD944')

  const handleNext = () => {
    setData({ nombre, color })
    onNext()
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-[#FFD944]">Personaliza tu tienda</h2>
      <input
        type="text"
        placeholder="Nombre de la tienda"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-60 p-2 rounded bg-transparent border border-white/30"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-20 h-10 rounded border border-white/30"
      />
      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="underline text-gray-300"
        >
          Volver
        </button>
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