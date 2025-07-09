'use client'
import { useOnboardingStore } from '../useOnboardingStore'
import { useRouter } from 'next/navigation'

export default function Step6({ onBack }: { onBack: () => void }) {
  const { data } = useOnboardingStore()
  const router = useRouter()

  const finish = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true')
    }
    router.replace('/dashboard')
  }


  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-[#FFD944]">Resumen</h2>
      <pre className="bg-white/5 p-4 rounded text-left whitespace-pre-wrap max-w-md mx-auto">
{JSON.stringify(data, null, 2)}
      </pre>
      <div className="flex justify-center gap-4">
        <button onClick={onBack} className="underline text-gray-300">Volver</button>
        <button
          onClick={finish}
          className="bg-[#FFD944] text-gray-900 px-4 py-2 rounded hover:bg-yellow-300"
        >
          Ir al dashboard
        </button>
      </div>
    </div>
  )
}