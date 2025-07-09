'use client'
import { useEffect } from 'react'
import { useOnboardingStore } from './useOnboardingStore'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import { useRouter } from 'next/navigation'

export default function OnboardingWrapper() {
  const { step, setStep } = useOnboardingStore()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('onboardingCompleted')
      if (completed === 'true') {
        router.replace('/dashboard')
      }
    }
  }, [router])

  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white">
      {step === 1 && <Step1 onNext={next} />}
      {step === 2 && <Step2 onNext={next} onBack={back} />}
      {step === 3 && <Step3 onNext={next} onBack={back} />}
      {step === 4 && <Step4 onNext={next} onBack={back} />}
      {step === 5 && <Step5 onNext={next} onBack={back} />}
      {step === 6 && <Step6 onBack={back} />}
    </div>
  )
}