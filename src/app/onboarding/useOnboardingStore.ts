'use client'
import { create } from 'zustand'

export interface OnboardingData {
  quiereVender?: boolean
  tipoNegocio?: string
  plantilla?: string
  nombre?: string
  color?: string
  modulos?: string[]
}

interface OnboardingState {
  step: number
  data: OnboardingData
  setStep: (step: number) => void
  setData: (data: Partial<OnboardingData>) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  data: {},
  setStep: (step) => set({ step }),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: 1, data: {} }),
}))