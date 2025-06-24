// URL Input Types
export interface URLInputState {
  url: string
  isValid: boolean
  isLoading: boolean
  error: string | null
}

export interface URLInputProps {
  onSubmit: (url: string) => void
  disabled?: boolean
  placeholder?: string
}

// YouTube URL validation
export interface YouTubeUrlValidation {
  isValid: boolean
  videoId?: string
  error?: string
}

// Processing Pipeline Types
export interface ProcessingStep {
  id: 'download' | 'transcribe' | 'translate' | 'synthesize'
  name: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress?: number
}

export interface ProcessingState {
  steps: ProcessingStep[]
  currentStep: string | null
  isProcessing: boolean
}