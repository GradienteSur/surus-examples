import { YouTubeUrlValidation } from '@/types'

const YOUTUBE_URL_REGEX = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(&.*)?$/

/**
 * Validates YouTube URL and extracts video ID
 * Only supports youtube.com format as per requirements
 */
export function validateYouTubeUrl(url: string): YouTubeUrlValidation {
  if (!url.trim()) {
    return {
      isValid: false,
      error: 'URL is required'
    }
  }

  const match = url.match(YOUTUBE_URL_REGEX)
  
  if (!match) {
    return {
      isValid: false,
      error: 'Please enter a valid youtube.com URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)'
    }
  }

  const videoId = match[2]
  
  return {
    isValid: true,
    videoId,
  }
}

/**
 * Normalizes YouTube URL to standard format
 */
export function normalizeYouTubeUrl(url: string): string {
  const validation = validateYouTubeUrl(url)
  if (!validation.isValid || !validation.videoId) {
    return url
  }
  
  return `https://www.youtube.com/watch?v=${validation.videoId}`
}