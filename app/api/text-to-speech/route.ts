import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, voice, speed, format } = await request.json();

    if (!text || !voice) {
      return NextResponse.json(
        { error: "Text and voice are required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer",
      input: text,
      speed: speed || 1.0,
      response_format: format || "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": `audio/${format || "mp3"}`,
        "Content-Disposition": `attachment; filename="speech.${format || "mp3"}"`,
      },
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}

