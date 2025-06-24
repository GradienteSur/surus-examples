'use client'

import { useState } from 'react'
import UrlInput from '@/components/UrlInput'
import ProcessingStatus from '@/components/ProcessingStatus'
import { useProcessing } from '@/lib/useProcessing'

export default function Home() {
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null)
  const { steps, currentStep, isProcessing, startProcessing, resetProcessing } = useProcessing()

  const handleUrlSubmit = async (url: string) => {
    console.log('URL submitted:', url)
    setSubmittedUrl(url)
    await startProcessing(url)
  }

  const handleReset = () => {
    setSubmittedUrl(null)
    resetProcessing()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            YouTube Audio Translator
          </h1>
          <p className="text-lg text-gray-600">
            Convert YouTube videos from English to Spanish using Surus AI
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <UrlInput 
              onSubmit={handleUrlSubmit} 
              disabled={isProcessing}
            />
          </div>
          
          <ProcessingStatus 
            steps={steps}
            currentStep={currentStep}
            isProcessing={isProcessing}
          />
          
          {submittedUrl && !isProcessing && steps.every(s => s.status === 'completed') && (
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-green-900 mb-2">
                      ✅ Processing Complete!
                    </h2>
                    <p className="text-green-700 text-sm">
                      URL: {submittedUrl}
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      Results, audio players, and downloads will be implemented in the next PBIs.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Process Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}