'use client'
import Image from 'next/image'
import { useOnboardingStore } from '../useOnboardingStore'

const templatesByType: Record<string, { name: string; preview: string }[]> = {
  'Productos físicos': [
    { name: 'Clásica', preview: '/digitalnest.svg.svg' },
    { name: 'Minimal', preview: '/next.svg' },
    { name: 'Moderna', preview: '/vercel.svg' },
  ],
  Ropa: [
    { name: 'Fashion', preview: '/digitalnest2.svg' },
    { name: 'Lookbook', preview: '/next.svg' },
    { name: 'Trendy', preview: '/vercel.svg' },
  ],
  Servicios: [
    { name: 'Profesional', preview: '/digitalnest2.svg' },
    { name: 'Portfolio', preview: '/next.svg' },
    { name: 'Agencia', preview: '/vercel.svg' },
  ],
}

export default function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setData, data } = useOnboardingStore()
  const opciones =
    templatesByType[data.tipoNegocio as keyof typeof templatesByType] || templatesByType['Productos físicos']

  const handleSelect = (p: string) => {
    setData({ plantilla: p })
    onNext()
  }

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-[#FFD944]">Elegí una plantilla</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {opciones.map((p) => (
          <button
            key={p.name}
            onClick={() => handleSelect(p.name)}
            className="bg-white/10 rounded border border-white/20 hover:bg-white/20 w-40 overflow-hidden"
          >
            <Image
              src={p.preview}
              alt={p.name}
              width={160}
              height={90}
              className="w-full h-24 object-cover"
            />
            <span className="block py-2">{p.name}</span>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 underline text-gray-300">Volver</button>
    </div>
  )
}