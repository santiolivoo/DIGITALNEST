'use client'
import { useOnboardingStore } from '../useOnboardingStore'

export default function Step1({ onNext }: { onNext: () => void }) {
  const setData = useOnboardingStore((s) => s.setData)

  const handleSelect = (value: boolean) => {
    setData({ quiereVender: value })
    onNext()
  }

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-[#FFD944]">¿Ya sabés qué querés vender?</h2>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => handleSelect(true)}
          className="bg-[#FFD944] text-gray-900 px-4 py-2 rounded hover:bg-yellow-300"
        >
          Sí
        </button>
        <button
          onClick={() => handleSelect(false)}
          className="bg-white/10 px-4 py-2 rounded border border-white/20 hover:bg-white/20"
        >
          No
        </button>
      </div>
    </div>
  )
}