'use client'

import { useState, useCallback } from 'react'
import { URLInputProps, URLInputState } from '@/types'
import { validateYouTubeUrl, normalizeYouTubeUrl } from '@/lib/validation'

const EXAMPLE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export default function UrlInput({ 
  onSubmit, 
  disabled = false, 
  placeholder = `Enter YouTube URL (e.g., ${EXAMPLE_URL})` 
}: URLInputProps) {
  const [state, setState] = useState<URLInputState>({
    url: '',
    isValid: false,
    isLoading: false,
    error: null
  })

  const handleInputChange = useCallback((value: string) => {
    const validation = validateYouTubeUrl(value)
    
    setState(prev => ({
      ...prev,
      url: value,
      isValid: validation.isValid,
      error: value.trim() && !validation.isValid ? validation.error || null : null
    }))
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (!state.url.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a YouTube URL' }))
      return
    }

    const validation = validateYouTubeUrl(state.url)
    
    if (!validation.isValid) {
      setState(prev => ({ ...prev, error: validation.error || 'Invalid URL' }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const normalizedUrl = normalizeYouTubeUrl(state.url)
    onSubmit(normalizedUrl)
  }, [state.url, onSubmit])

  const inputClasses = `
    w-full px-4 py-3 border rounded-lg text-base transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${state.error 
      ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400' 
      : state.isValid && state.url.trim()
        ? 'border-green-300 bg-green-50'
        : 'border-gray-300 bg-white hover:border-gray-400'
    }
    ${(disabled || state.isLoading) ? 'opacity-50 cursor-not-allowed' : ''}
  `.trim()

  const buttonClasses = `
    px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200
    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600
    ${state.isLoading ? 'bg-blue-700' : ''}
  `.trim()

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">
            YouTube URL
          </label>
          <input
            id="youtube-url"
            type="url"
            value={state.url}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled || state.isLoading}
            className={inputClasses}
            autoComplete="url"
            spellCheck={false}
          />
          {state.error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {state.error}
            </p>
          )}
          {state.isValid && state.url.trim() && !state.error && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Valid YouTube URL
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!state.isValid || disabled || state.isLoading}
          className={buttonClasses}
        >
          {state.isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Start Translation'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Supported format:</strong> https://www.youtube.com/watch?v=VIDEO_ID
        </p>
        <p className="mt-1">
          The video will be processed through: Download → Transcribe → Translate → Synthesize
        </p>
      </div>
    </div>
  )
}