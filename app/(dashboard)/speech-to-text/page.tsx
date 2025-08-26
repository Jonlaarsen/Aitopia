import SpeechToTextConfigurations from "@/components/speech-to-text/SpeechToTextConfigurations";
import TranscriptionsList from "@/components/speech-to-text/TranscriptionsList";
import React from "react";

const SpeechToTextPage = () => {
  return (
    <section className="w-full h-full mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden">
      <SpeechToTextConfigurations />
      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center">
        <TranscriptionsList />
      </div>
    </section>
  );
};

export default SpeechToTextPage;

