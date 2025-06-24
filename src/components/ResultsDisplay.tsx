'use client'

interface ResultsDisplayProps {
  transcription?: string
  translation?: string
  isVisible?: boolean
}

export default function ResultsDisplay({ 
  transcription, 
  translation, 
  isVisible = false 
}: ResultsDisplayProps) {
  if (!isVisible || (!transcription && !translation)) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Processing Results
          </h2>
          <p className="text-gray-600 mt-1">
            Review the transcription and translation below
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* English Transcription */}
          {transcription && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">EN</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  English Transcription
                </h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {transcription}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {transcription.split(' ').length} words
              </div>
            </div>
          )}
          
          {/* Spanish Translation */}
          {translation && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">ES</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Spanish Translation
                </h3>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {translation}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {translation.split(' ').length} palabras
              </div>
            </div>
          )}
        </div>
        
        {/* Copy to Clipboard Buttons */}
        <div className="px-6 pb-6">
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {transcription && (
              <button
                onClick={() => navigator.clipboard.writeText(transcription)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy English
              </button>
            )}
            {translation && (
              <button
                onClick={() => navigator.clipboard.writeText(translation)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Spanish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}