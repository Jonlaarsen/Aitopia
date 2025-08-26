import React from "react";
import TextToSpeechConfigurations from "@/components/text-to-speech/TextToSpeechConfigurations";
import TextToSpeechGallery from "@/components/text-to-speech/TextToSpeechGallery";

export default function TextToSpeechPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Text to Speech</h1>
        <p className="text-muted-foreground">
          Convert your text into natural-sounding speech using advanced
          voice models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TextToSpeechConfigurations />
        <TextToSpeechGallery />
      </div>
    </div>
  );
}
