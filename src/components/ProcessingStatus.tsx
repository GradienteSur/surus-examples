'use client'

import { ProcessingStep } from '@/types'

interface ProcessingStatusProps {
  steps: ProcessingStep[]
  currentStep: string | null
  isProcessing: boolean
}

const STEP_ICONS = {
  download: '⬇️',
  transcribe: '🎵',
  translate: '🌐',
  synthesize: '🔊'
} as const

const STATUS_STYLES = {
  pending: 'bg-gray-100 text-gray-600 border-gray-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse',
  completed: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300'
} as const

export default function ProcessingStatus({ 
  steps, 
  currentStep, 
  isProcessing 
}: ProcessingStatusProps) {
  if (!isProcessing && !steps.some(step => step.status !== 'pending')) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Processing Status
          </h2>
          {isProcessing && (
            <div className="flex items-center text-blue-600">
              <div className="animate-spin mr-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" cy="12" r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Processing...</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id
            const isCompleted = step.status === 'completed'
            const hasError = step.status === 'error'
            
            return (
              <div
                key={step.id}
                className={`
                  flex items-center p-4 rounded-lg border-2 transition-all duration-300
                  ${STATUS_STYLES[step.status]}
                `}
              >
                <div className="flex items-center flex-1">
                  {/* Step Icon */}
                  <div className="text-2xl mr-4">
                    {STEP_ICONS[step.id]}
                  </div>
                  
                  {/* Step Info */}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-base">
                        {step.name}
                      </h3>
                      {isActive && (
                        <span className="ml-2 text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Bar for Active Step */}
                    {isActive && step.progress !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-1">
                          {step.progress}% complete
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Icon */}
                  <div className="ml-4">
                    {isCompleted && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    )}
                    {hasError && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path 
                            fillRule="evenodd" 
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    )}
                    {step.status === 'pending' && (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                    )}
                    {step.status === 'processing' && !isCompleted && (
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Overall Progress */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>
              {steps.filter(s => s.status === 'completed').length} of {steps.length} steps complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}