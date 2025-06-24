'use client'

interface DownloadItem {
  label: string
  filename: string
  content?: string
  url?: string
  type: 'text' | 'audio'
}

interface DownloadButtonsProps {
  transcription?: string
  translation?: string
  originalAudioUrl?: string
  translatedAudioUrl?: string
  videoTitle?: string
  isVisible?: boolean
}

export default function DownloadButtons({
  transcription,
  translation,
  originalAudioUrl,
  translatedAudioUrl,
  videoTitle = 'youtube-audio',
  isVisible = false
}: DownloadButtonsProps) {
  const downloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const downloadAudio = (audioUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = audioUrl
    link.download = filename
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const sanitizeFilename = (name: string) => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }

  const baseFilename = sanitizeFilename(videoTitle)
  
  const downloadItems: DownloadItem[] = [
    {
      label: 'English Transcription',
      filename: `${baseFilename}_transcription.txt`,
      content: transcription,
      type: 'text' as const
    },
    {
      label: 'Spanish Translation',
      filename: `${baseFilename}_translation.txt`,
      content: translation,
      type: 'text' as const
    },
    {
      label: 'Original Audio',
      filename: `${baseFilename}_original.mp3`,
      url: originalAudioUrl,
      type: 'audio' as const
    },
    {
      label: 'Spanish Audio',
      filename: `${baseFilename}_spanish.wav`,
      url: translatedAudioUrl,
      type: 'audio' as const
    }
  ].filter(item => 
    (item.type === 'text' && item.content) || 
    (item.type === 'audio' && item.url)
  )

  if (!isVisible || downloadItems.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900">
            Download Results
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {downloadItems.map((item, index) => {
            const handleDownload = () => {
              if (item.type === 'text' && item.content) {
                downloadText(item.content, item.filename)
              } else if (item.type === 'audio' && item.url) {
                downloadAudio(item.url, item.filename)
              }
            }

            const Icon = item.type === 'text' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            )

            return (
              <button
                key={index}
                onClick={handleDownload}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-lg mb-3 transition-colors">
                  {Icon}
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500 mt-1 text-center">
                  {item.filename}
                </span>
              </button>
            )
          })}
        </div>

        {/* Download All Button */}
        {downloadItems.length > 1 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                downloadItems.forEach(item => {
                  if (item.type === 'text' && item.content) {
                    downloadText(item.content, item.filename)
                  } else if (item.type === 'audio' && item.url) {
                    downloadAudio(item.url, item.filename)
                  }
                })
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download All ({downloadItems.length} files)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}