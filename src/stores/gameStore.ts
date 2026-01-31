import { INITIAL_LIVES, INVINCIBILITY_DURATION_MS } from "@/_components/constants";
import { create } from "zustand";

type Status = "running" | "ended" | "paused";
interface GameStore {
  status: Status;
  score: number;
  lives: number;
  lastRespawnAt: number | null;
  setScore: (score: number) => void;
  setStatus: (status: Status) => void;
  setEndGame: () => void;
  reset: () => void;
  decrementLives: () => void;
  getLives: () => number;
  setRespawn: () => void;
  clearRespawn: () => void;
  tickRespawnExpiry: () => void;
  isInvincible: () => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: "running",
  lives: INITIAL_LIVES,
  score: 0,
  lastRespawnAt: null,
  setScore: (lastRowIndex: number) => set((state) => ({ score: Math.max(state.score, lastRowIndex) })),
  setStatus: (status: Status) => set({ status }),
  setEndGame: () => set({ status: "ended" }),
  reset: () => set({ status: "running", score: 0, lives: INITIAL_LIVES, lastRespawnAt: null }),
  decrementLives: () => set((state) => ({ lives: state.lives - 1 })),
  getLives: () => get().lives,
  setRespawn: () => set({ lastRespawnAt: Date.now() }),
  clearRespawn: () => set({ lastRespawnAt: null }),
  tickRespawnExpiry: () => {
    const at = get().lastRespawnAt;
    if (at !== null && Date.now() - at >= INVINCIBILITY_DURATION_MS) {
      set({ lastRespawnAt: null });
    }
  },
  isInvincible: () => {
    const at = get().lastRespawnAt;
    return at !== null && Date.now() - at < INVINCIBILITY_DURATION_MS;
  },
}));

