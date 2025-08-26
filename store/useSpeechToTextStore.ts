import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transcription {
  id: string;
  fileName: string;
  title?: string;
  description?: string;
  text: string;
  model: string;
  language: string;
  timestamp: string;
  fileSize: number;
  originalFileType?: 'audio' | 'video';
}

interface SpeechToTextStore {
  transcriptions: Transcription[];
  addTranscription: (transcription: Transcription) => void;
  removeTranscription: (id: string) => void;
  clearTranscriptions: () => void;
}

export const useSpeechToTextStore = create<SpeechToTextStore>()(
  persist(
    (set) => ({
      transcriptions: [],
      addTranscription: (transcription) =>
        set((state) => ({
          transcriptions: [transcription, ...state.transcriptions],
        })),
      removeTranscription: (id) =>
        set((state) => ({
          transcriptions: state.transcriptions.filter((t) => t.id !== id),
        })),
      clearTranscriptions: () =>
        set(() => ({
          transcriptions: [],
        })),
    }),
    {
      name: 'speech-to-text-storage',
    }
  )
);
