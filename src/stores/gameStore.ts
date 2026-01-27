import { create } from "zustand";

interface GameStore {
  status: "running" | "ended" | "paused";
  score: number;
  setScore: (score: number) => void;
  setStatus: (status: "running" | "ended" | "paused") => void;
  setEndGame: () => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  status: "running",
  score: 0,
  setScore: (lastRowIndex: number) => set((state) => ({ score: Math.max(state.score, lastRowIndex) })),
  setStatus: (status: "running" | "ended" | "paused") => set({ status }),
  setEndGame: () => set({ status: "ended" }),
  reset: () => set({ status: "running", score: 0 }),
}));

