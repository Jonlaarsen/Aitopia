import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }



    const formData = await request.formData();
    const file = formData.get('file') as File;
    const model = formData.get('model') as string;
    const language = formData.get('language') as string;
    const responseFormat = formData.get('response_format') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an audio or video file.' },
        { status: 400 }
      );
    }

    // Validate file size (25MB limit for OpenAI)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 25MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Prepare OpenAI API request
    const openaiFormData = new FormData();
    openaiFormData.append('file', new Blob([buffer], { type: file.type }), file.name);
    openaiFormData.append('model', model || 'whisper-1');
    
    if (language && language !== 'auto') {
      openaiFormData.append('language', language);
    }
    
    if (responseFormat) {
      openaiFormData.append('response_format', responseFormat);
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: openaiFormData,
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to transcribe audio' },
        { status: 500 }
      );
    }

    let transcriptionResult;
    
    // Handle different response formats
    if (responseFormat === 'text' || responseFormat === 'srt' || responseFormat === 'vtt') {
      // For text formats, get the raw text
      transcriptionResult = await openaiResponse.text();
    } else {
      // For JSON formats, parse as JSON
      transcriptionResult = await openaiResponse.json();
    }

    return NextResponse.json({
      success: true,
      text: responseFormat === 'text' ? transcriptionResult : (transcriptionResult.text || transcriptionResult),
      model: model,
      language: language,
      response_format: responseFormat,
    });

  } catch (error) {
    console.error('Speech-to-text error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
