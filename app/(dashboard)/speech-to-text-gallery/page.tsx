import TranscriptionsGallery from "@/components/speech-to-text/TranscriptionsGallery";
import React from "react";

const SpeechToTextGalleryPage = () => {
  return (
    <section className="w-full h-full mx-auto p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Speech-to-Text Gallery</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all your speech-to-text transcriptions
          </p>
        </div>
        <TranscriptionsGallery />
      </div>
    </section>
  );
};

export default SpeechToTextGalleryPage;

