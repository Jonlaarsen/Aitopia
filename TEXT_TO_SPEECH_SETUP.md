# Text-to-Speech Setup Guide

This guide explains how to set up and use the text-to-speech feature in your Aitopia application.

## Prerequisites

1. **OpenAI API Key**: You need an OpenAI API key to use the text-to-speech service.
2. **Node.js**: Ensure you have Node.js installed on your system.

## Environment Variables

Create a `.env.local` file in your project root and add the following:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

## Features

### Voice Options
- **Alloy**: A balanced, neutral voice
- **Echo**: A warm, friendly voice
- **Fable**: A clear, professional voice
- **Onyx**: A deep, authoritative voice
- **Nova**: A bright, energetic voice
- **Shimmer**: A soft, gentle voice

### Audio Formats
- **MP3**: Most compatible, good quality
- **Opus**: High quality, smaller file size
- **AAC**: Good quality, widely supported
- **FLAC**: Lossless quality, larger file size

### Speed Control
- Adjustable from 0.25x to 4.0x speed
- Default is 1.0x (normal speed)

## Usage

1. **Navigate** to the Text-to-Speech page in your dashboard
2. **Enter text** in the text area (supports multiple languages)
3. **Select voice** from the available options
4. **Adjust speed** using the slider
5. **Choose format** for your audio file
6. **Click Generate Speech** to create the audio
7. **Preview** the generated audio
8. **Download** the audio file

## API Endpoint

The text-to-speech feature uses the following API endpoint:

```
POST /api/text-to-speech
```

### Request Body
```json
{
  "text": "Your text here",
  "voice": "alloy",
  "speed": 1.0,
  "format": "mp3"
}
```

### Response
Returns an audio file in the specified format.

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Ensure your `.env.local` file contains the `OPENAI_API_KEY`
   - Restart your development server after adding the environment variable

2. **"Failed to generate speech"**
   - Check your OpenAI API key is valid
   - Ensure you have sufficient API credits
   - Verify the text input is not empty

3. **Audio not playing**
   - Check browser compatibility
   - Ensure the audio format is supported by your browser

### Rate Limits

OpenAI has rate limits on their API. If you encounter rate limit errors:
- Wait a few minutes before trying again
- Consider upgrading your OpenAI plan for higher limits

## Cost Considerations

- Text-to-speech API calls are charged per character
- Current pricing: $0.015 per 1K characters
- Monitor your usage in the OpenAI dashboard

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys secure and private
- Consider implementing user authentication and rate limiting for production use


