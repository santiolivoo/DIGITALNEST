'use client'
import { useOnboardingStore } from '../useOnboardingStore'

const tipos = ['Productos físicos', 'Ropa', 'Servicios']

export default function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const setData = useOnboardingStore((s) => s.setData)

  const handleSelect = (tipo: string) => {
    setData({ tipoNegocio: tipo })
    onNext()
  }

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-[#FFD944]">Selecciona tu tipo de negocio</h2>
      <div className="flex flex-col items-center gap-4">
        {tipos.map((t) => (
          <button
            key={t}
            onClick={() => handleSelect(t)}
            className="bg-white/10 px-4 py-2 rounded border border-white/20 hover:bg-white/20 w-60"
          >
            {t}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 underline text-gray-300">Volver</button>
    </div>
  )
}