import { create } from "zustand";

export interface TextToSpeechEntry {
  id: string;
  text: string;
  voice: string;
  speed: number;
  format: string;
  audioUrl: string;
  createdAt: Date;
}

interface TextToSpeechStore {
  entries: TextToSpeechEntry[];
  addEntry: (entry: Omit<TextToSpeechEntry, "id" | "createdAt">) => void;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
}

export const useTextToSpeechStore = create<TextToSpeechStore>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => ({
      entries: [
        {
          ...entry,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
        ...state.entries,
      ],
    })),
  removeEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
  clearEntries: () => set({ entries: [] }),
}));
