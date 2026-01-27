import type { MovementDirection } from "@/types";
import { endsUpInValidPosition } from "@/utils/endsUpInValidPosition";
import { useMapStore } from "./mapStore";
import { ROWS_PATCH_THRESHOLD } from "@/_components/constants";
import { useGameStore } from "./gameStore";
import * as THREE from "three";
import { create } from "zustand";

interface PlayerStore {
  currentRow: number;
  currentTile: number;
  movements: MovementDirection[];
  ref: THREE.Object3D | null;
  queueMovement: (direction: MovementDirection) => void;
  stepCompleted: () => void;
  setPlayerRef: (ref: THREE.Object3D) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentRow: 0,
  currentTile: 0,
  movements: [],
  ref: null,
  queueMovement: (direction: MovementDirection) => {
    const state = get();
    const isFinalPositionValid = endsUpInValidPosition(
      { rowIndex: state.currentRow, tileIndex: state.currentTile },
      [...state.movements, direction],
    );
    if (!isFinalPositionValid) {
      return;
    }
    set((state) => ({ movements: [...state.movements, direction] }));
  },
  stepCompleted: () => {
    const state = get();
    const direction = state.movements[0];
    if (!direction) return;

    const newMovements = state.movements.slice(1);
    let newRow = state.currentRow;
    let newTile = state.currentTile;

    if (direction === "forward") {
      newRow += 1;
    } else if (direction === "backward") {
      newRow -= 1;
    } else if (direction === "left") {
      newTile -= 1;
    } else if (direction === "right") {
      newTile += 1;
    }

    set({ currentRow: newRow, currentTile: newTile, movements: newMovements });

    if (newRow === useMapStore.getState().rows.length - ROWS_PATCH_THRESHOLD) {
      useMapStore.getState().setRows();
    }
    useGameStore.getState().setScore(newRow);
  },
  setPlayerRef: (ref: THREE.Object3D) => {
    set({ ref });
  },
  reset: () => {
    set({ currentRow: 0, currentTile: 0, movements: [] });
  },
}));