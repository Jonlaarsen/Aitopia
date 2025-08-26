# Speech-to-Text Setup Guide

## Overview
This project now includes OpenAI speech-to-text functionality using the Whisper model. Users can upload audio files and convert them to text with various configuration options.

## Features
- Audio and video file upload (supports mp3, mp4, mpeg, mpga, m4a, wav, webm, avi, mov, mkv)
- Automatic audio extraction from video files
- OpenAI Whisper model integration
- Multiple language support with auto-detection
- Various output formats (JSON, text, SRT, VTT, verbose JSON)
- Persistent storage of transcriptions
- Copy, download, and delete functionality

## Setup Requirements

### 1. Environment Variables
Add the following to your `.env.local` file:

```bash
# OpenAI API Key for Speech-to-Text
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

### 3. Database Schema
The current implementation uses the existing `image_generation_count` field for credits. For production, you may want to add dedicated speech-to-text credit fields:

```sql
-- Optional: Add dedicated speech-to-text credit fields
ALTER TABLE credits 
ADD COLUMN speech_to_text_count INTEGER DEFAULT 0,
ADD COLUMN max_speech_to_text_count INTEGER DEFAULT 0;
```

## Usage

### For Users
1. Navigate to the Speech-to-Text page in the dashboard
2. Upload an audio or video file (max 25MB)
3. Select desired options (model, language, output format)
4. Click "Transcribe Audio" (or "Extract Audio & Transcribe" for videos)
5. View, copy, download, or delete transcriptions

### For Developers
The implementation includes:
- `SpeechToTextConfigurations` component for file upload and settings
- `TranscriptionsList` component for displaying results
- `useSpeechToTextStore` Zustand store for state management
- `/api/speech-to-text` API route for OpenAI integration
- Credit deduction system integrated with existing infrastructure

## File Structure
```
components/speech-to-text/
├── SpeechToTextConfigurations.tsx  # Upload and configuration UI
└── TranscriptionsList.tsx          # Results display and management

store/
└── useSpeechToTextStore.ts         # State management

app/api/speech-to-text/
└── route.ts                        # OpenAI API integration

app/(dashboard)/speech-to-text/
└── page.tsx                        # Main page component
```

## API Endpoints

### POST /api/speech-to-text
Handles audio and video file transcription requests.

**Request:**
- `file`: Audio or video file (FormData)
- `model`: Whisper model (default: "whisper-1")
- `language`: Language code or "auto" (optional)
- `response_format`: Output format (optional)

**Response:**
```json
{
  "success": true,
  "text": "Transcribed text content",
  "model": "whisper-1",
  "language": "en",
  "response_format": "json"
}
```



## Error Handling
- File type validation (audio and video files)
- File size limits (25MB max)
- OpenAI API error handling
- User authentication verification

## Future Enhancements
- Dedicated speech-to-text credit fields
- Batch processing support
- Real-time transcription
- Custom model fine-tuning
- Advanced audio preprocessing options
- Integration with other AI services

## Troubleshooting

### Common Issues
1. **"File size too large"** - Audio or video file exceeds 25MB limit
2. **"Invalid file type"** - Ensure file is an audio or video format
3. **API errors** - Check OpenAI API key and quota

### Debug Steps
1. Verify environment variables are set correctly
2. Check browser console for client-side errors
3. Review server logs for API errors
4. Confirm OpenAI API key has sufficient quota
5. Verify user authentication

## Security Considerations
- File upload validation and sanitization
- User authentication required for all requests
- File size limits prevent DoS attacks
- Secure API key storage in environment variables
