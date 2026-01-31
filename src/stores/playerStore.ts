import type { MovementDirection, MoveHistoryEntry } from "@/types";
import { endsUpInValidPosition } from "@/utils/endsUpInValidPosition";
import * as THREE from "three";
import { create } from "zustand";

const INITIAL_HISTORY: MoveHistoryEntry[] = [{ rowIndex: 0, tileIndex: 0 }];

interface PlayerStore {
  currentRow: number;
  currentTile: number;
  movements: MovementDirection[];
  moveHistory: MoveHistoryEntry[];
  ref: THREE.Object3D | null;
  queueMovement: (direction: MovementDirection) => void;
  stepCompleted: () => void;
  setPlayerRef: (ref: THREE.Object3D) => void;
  setPosition: (rowIndex: number, tileIndex?: number) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentRow: 0,
  currentTile: 0,
  movements: [],
  moveHistory: INITIAL_HISTORY,
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

    set({
      currentRow: newRow,
      currentTile: newTile,
      movements: newMovements,
      moveHistory: [
        ...get().moveHistory,
        { rowIndex: newRow, tileIndex: newTile, direction },
      ],
    });
  },
  setPlayerRef: (ref: THREE.Object3D) => {
    set({ ref });
  },
  setPosition: (rowIndex: number, tileIndex = 0) => {
    set({
      currentRow: rowIndex,
      currentTile: tileIndex,
      movements: [],
      moveHistory: [{ rowIndex, tileIndex }],
    });
  },
  reset: () => {
    set({ currentRow: 0, currentTile: 0, movements: [], moveHistory: INITIAL_HISTORY });
  },
}));