'use client'
import { useOnboardingStore } from '../useOnboardingStore'

const plantillas = ['Clásica', 'Minimal', 'Moderna']

export default function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const setData = useOnboardingStore((s) => s.setData)

  const handleSelect = (p: string) => {
    setData({ plantilla: p })
    onNext()
  }

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-[#FFD944]">Elegí una plantilla</h2>
      <div className="flex flex-col items-center gap-4">
        {plantillas.map((p) => (
          <button
            key={p}
            onClick={() => handleSelect(p)}
            className="bg-white/10 px-4 py-2 rounded border border-white/20 hover:bg-white/20 w-60"
          >
            {p}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 underline text-gray-300">Volver</button>
    </div>
  )
}