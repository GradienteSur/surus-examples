'use client'

import { useState, useCallback } from 'react'
import { ProcessingState, ProcessingStep } from '@/types'

const INITIAL_STEPS: ProcessingStep[] = [
  {
    id: 'download',
    name: 'Download Audio',
    status: 'pending'
  },
  {
    id: 'transcribe',
    name: 'Transcribe to English',
    status: 'pending'
  },
  {
    id: 'translate',
    name: 'Translate to Spanish',
    status: 'pending'
  },
  {
    id: 'synthesize',
    name: 'Generate Spanish Audio',
    status: 'pending'
  }
]

const STEP_DURATIONS = {
  download: 3000,
  transcribe: 5000,
  translate: 2000,
  synthesize: 4000
} as const

export function useProcessing() {
  const [state, setState] = useState<ProcessingState>({
    steps: INITIAL_STEPS,
    currentStep: null,
    isProcessing: false
  })

  const simulateProcessing = useCallback(async (url: string) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      currentStep: 'download',
      steps: INITIAL_STEPS.map(step => ({ ...step }))
    }))

    // Process each step with simulation
    for (const step of INITIAL_STEPS) {
      // Mark current step as processing
      setState(prev => ({
        ...prev,
        currentStep: step.id,
        steps: prev.steps.map(s => 
          s.id === step.id 
            ? { ...s, status: 'processing', progress: 0 }
            : s
        )
      }))

      // Simulate progress
      const duration = STEP_DURATIONS[step.id]
      const progressInterval = duration / 20 // 20 updates per step
      
      for (let i = 0; i <= 20; i++) {
        await new Promise(resolve => setTimeout(resolve, progressInterval))
        
        setState(prev => ({
          ...prev,
          steps: prev.steps.map(s => 
            s.id === step.id 
              ? { ...s, progress: Math.min(100, (i / 20) * 100) }
              : s
          )
        }))
      }

      // Mark step as completed
      setState(prev => ({
        ...prev,
        steps: prev.steps.map(s => 
          s.id === step.id 
            ? { ...s, status: 'completed', progress: 100 }
            : s
        )
      }))

      // Small delay between steps
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Mark processing as complete
    setState(prev => ({
      ...prev,
      isProcessing: false,
      currentStep: null
    }))

  }, [])

  const resetProcessing = useCallback(() => {
    setState({
      steps: INITIAL_STEPS.map(step => ({ ...step })),
      currentStep: null,
      isProcessing: false
    })
  }, [])

  return {
    ...state,
    startProcessing: simulateProcessing,
    resetProcessing
  }
}