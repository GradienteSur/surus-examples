# YouTube Audio Translation App - Project Plan

## Overview

This project will create a Next.js application that processes YouTube videos through a complete audio pipeline: download → transcribe → translate → synthesize speech using Surus AI models from Latin America.

## Core Functionality

1. **Input**: User provides YouTube URL
2. **Download**: Extract audio from YouTube video
3. **Transcribe**: Convert audio to English text using Surus transcription model
4. **Translate**: Convert English text to Spanish using Surus translation model
5. **Synthesize**: Generate Spanish speech from translated text using Surus TTS model
6. **Output**: Provide original transcription, translation, and synthesized Spanish audio

## Architecture Components

### Frontend (Next.js App Router)
- **Input Form**: YouTube URL input with validation
- **Progress Indicators**: Real-time status for each processing step
- **Audio Players**: Playback for original and translated audio
- **Text Display**: Show transcription and translation results
- **Download Options**: Allow users to download all outputs

### Backend (Next.js API Routes)
- **`/api/download`**: YouTube audio extraction endpoint
- **`/api/transcribe`**: Audio to text conversion using Surus
- **`/api/translate`**: English to Spanish translation using Surus
- **`/api/synthesize`**: Spanish text to speech using Surus

### External Dependencies
- **YouTube Downloader**: `yt-dlp` or similar tool
- **Surus AI Models**: Transcription, translation, and TTS services
- **File Storage**: Temporary file system for audio processing

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Audio Processing**: Web Audio API for playback
- **File Handling**: Node.js fs module for temporary files
- **AI Services**: Surus model APIs

## Project Structure

```
surus-youtube-translator/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Main application page
│   ├── globals.css                # Global styles and Tailwind
│   ├── components/
│   │   ├── AudioPlayer.tsx        # Reusable audio player component
│   │   ├── ProcessingStatus.tsx   # Step-by-step progress indicator
│   │   ├── UrlInput.tsx           # YouTube URL input with validation
│   │   ├── ResultsDisplay.tsx     # Display transcription and translation
│   │   └── DownloadButtons.tsx    # Download options for outputs
│   └── api/
│       ├── download/
│       │   └── route.ts           # YouTube audio download endpoint
│       ├── transcribe/
│       │   └── route.ts           # Surus transcription endpoint
│       ├── translate/
│       │   └── route.ts           # Surus translation endpoint
│       └── synthesize/
│           └── route.ts           # Surus TTS endpoint
├── lib/
│   ├── youtube-downloader.ts      # YouTube audio extraction utilities
│   ├── surus-client.ts            # Surus API integration
│   ├── file-utils.ts              # File handling utilities
│   └── validation.ts              # Input validation functions
├── types/
│   └── index.ts                   # TypeScript type definitions
├── public/
│   └── temp/                      # Temporary file storage
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── package.json                   # Dependencies and scripts
```

## Development Phases

### Phase 1: Project Setup
- [x] Create Next.js project with TypeScript
- [x] Set up Tailwind CSS configuration
- [x] Create basic project structure
- [x] Set up temporary file handling
- [x] Create TypeScript type definitions

### Phase 2: UI Components
- [ ] Build YouTube URL input component with validation
- [ ] Create processing status indicator
- [ ] Implement audio player components
- [ ] Build results display components
- [ ] Add download functionality UI

### Phase 3: YouTube Integration
- [ ] Implement YouTube URL validation
- [ ] Set up `yt-dlp` or similar audio download tool
- [ ] Create download API endpoint
- [ ] Handle different YouTube URL formats
- [ ] Add error handling for invalid/private videos

### Phase 4: Surus AI Integration
- [ ] Integrate Surus transcription service
- [ ] Implement Surus translation service
- [ ] Add Surus text-to-speech synthesis
- [ ] Create respective API endpoints
- [ ] Handle API errors and rate limiting

### Phase 5: Frontend-Backend Integration
- [ ] Connect UI to backend APIs
- [ ] Implement real-time progress tracking
- [ ] Add proper loading states
- [ ] Handle errors gracefully
- [ ] Test complete user flow

### Phase 6: Polish & Optimization
- [ ] Improve error messages and user feedback
- [ ] Add file cleanup mechanisms
- [ ] Optimize performance and loading times
- [ ] Add responsive design improvements
- [ ] Implement proper logging

## Key Features

### Core Features
- ✅ YouTube URL input with comprehensive validation
- ✅ Real-time processing status with step indicators
- ✅ Original audio extraction and playback
- ✅ AI-powered transcription display
- ✅ English to Spanish translation
- ✅ High-quality Spanish speech synthesis
- ✅ Synthesized audio playback
- ✅ Download options for all outputs

### User Experience Features
- ✅ Responsive design for mobile and desktop
- ✅ Progressive enhancement with loading states
- ✅ Clear error handling and user feedback
- ✅ Accessibility features for screen readers
- ✅ Clean, intuitive interface

### Technical Features
- ✅ Temporary file management and cleanup
- ✅ API rate limiting and error handling
- ✅ TypeScript for type safety
- ✅ Modular, maintainable code structure

## API Specifications

### POST /api/download
- **Input**: `{ url: string }`
- **Output**: `{ audioPath: string, title: string, duration: number }`
- **Function**: Downloads audio from YouTube URL

### POST /api/transcribe
- **Input**: `{ audioPath: string }`
- **Output**: `{ transcription: string, confidence: number }`
- **Function**: Transcribes audio using Surus model

### POST /api/translate
- **Input**: `{ text: string, sourceLang: 'en', targetLang: 'es' }`
- **Output**: `{ translation: string, confidence: number }`
- **Function**: Translates text using Surus model

### POST /api/synthesize
- **Input**: `{ text: string, lang: 'es' }`
- **Output**: `{ audioPath: string, duration: number }`
- **Function**: Generates speech using Surus TTS

## Dependencies

### Core Dependencies
```json
{
  "next": "^15.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0"
}
```

### UI Dependencies
```json
{
  "tailwindcss": "^3.0.0",
  "@tailwindcss/forms": "^0.5.0",
  "lucide-react": "^0.300.0"
}
```

### Processing Dependencies
```json
{
  "ytdl-core": "^4.11.0",
  "fluent-ffmpeg": "^2.1.0",
  "multer": "^1.4.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^15.0.0"
}
```

## Surus Integration Points

The following integration points will be implemented once Surus API specifications are provided:

1. **Transcription Service**: Audio file → English text
2. **Translation Service**: English text → Spanish text  
3. **Text-to-Speech Service**: Spanish text → Spanish audio

Each service will include:
- Authentication handling
- Error handling and retries
- Response validation
- Rate limiting compliance

## File Management Strategy

### Temporary Files
- Store uploaded and processed files in `/public/temp/`
- Use unique identifiers for each processing session
- Implement automatic cleanup after processing
- Set maximum file size limits for uploads

### File Formats
- **Input Audio**: Accept common formats (MP3, WAV, M4A)
- **Output Audio**: Provide MP3 format for compatibility
- **Text Files**: UTF-8 encoded for proper Spanish character support

## Error Handling Strategy

### User-Facing Errors
- Invalid YouTube URLs
- Private or restricted videos
- Network connectivity issues
- Processing failures

### Technical Errors
- API rate limiting
- File system errors
- Service timeouts
- Invalid audio formats

## Security Considerations

- Input validation for all user-provided data
- File type validation for uploads
- Rate limiting on API endpoints
- Temporary file cleanup to prevent disk space issues
- Secure handling of Surus API credentials

## Performance Considerations

- Streaming audio processing where possible
- Parallel processing of independent tasks
- Caching of frequently requested content
- Optimized file formats and compression
- Progressive loading of results

## Testing Strategy

### Unit Tests
- YouTube URL validation
- File processing utilities
- API response handling

### Integration Tests
- Complete processing pipeline
- Surus API integration
- File upload and download

### User Acceptance Tests
- End-to-end user flows
- Error handling scenarios
- Cross-browser compatibility

## Deployment Considerations

### Environment Variables
- Surus API credentials
- File storage configuration
- Rate limiting settings

### Production Requirements
- Sufficient disk space for temporary files
- Network access to YouTube and Surus APIs
- Process monitoring and logging

---

## Next Steps

1. **Initialize Project**: Set up Next.js with TypeScript and Tailwind
2. **Create UI Components**: Build the user interface components
3. **Implement YouTube Integration**: Add audio download functionality
4. **Await Surus Integration Details**: Receive API specifications and examples
5. **Complete Integration**: Connect all services into working pipeline
6. **Testing & Polish**: Comprehensive testing and user experience improvements

This plan provides a solid foundation for building a robust YouTube audio translation application using Next.js and Surus AI models.


