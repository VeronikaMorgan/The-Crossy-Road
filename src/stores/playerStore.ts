import { ROWS_PATCH_THRESHOLD, TREES } from "@/_components/constants";
import { useGameStore } from "@/stores/gameStore";
import { useInventoryStore } from "@/stores/inventoryStore";
import { useMapStore } from "@/stores/mapStore";
import type { MovementDirection, MoveHistoryEntry } from "@/types";
import { endsUpInValidPosition } from "@/utils/endsUpInValidPosition";
import { getNearestFreeTileOnTreesRow } from "@/utils/getNearestFreeTileOnTreesRow";
import type { Object3D } from "three";
import { create } from "zustand";

const INITIAL_HISTORY: MoveHistoryEntry[] = [{ rowIndex: 0, tileIndex: 0 }];

type JumpInProgress = {
  targetRow: number;
  targetTile: number;
  startRow: number;
  startTile: number;
  startTime: number;
};

interface PlayerStore {
  currentRow: number;
  currentTile: number;
  movements: MovementDirection[];
  moveHistory: MoveHistoryEntry[];
  ref: Object3D | null;
  jumpInProgress: JumpInProgress | null;
  queueMovement: (direction: MovementDirection) => void;
  stepCompleted: () => void;
  setPlayerRef: (ref: Object3D) => void;
  setPosition: (rowIndex: number, tileIndex?: number) => void;
  jumpToNextTrees: () => void;
  completeJump: () => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentRow: 0,
  currentTile: 0,
  movements: [],
  moveHistory: INITIAL_HISTORY,
  ref: null,
  jumpInProgress: null,
  queueMovement: (direction: MovementDirection) => {
    const state = get();
    if (state.jumpInProgress) return;
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
  setPlayerRef: (ref: Object3D) => {
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
  jumpToNextTrees: () => {
    const hasLightning = useInventoryStore.getState().hasLightning();
    if (!hasLightning) return;

    const state = get();
    if (state.jumpInProgress) return;

    const rows = useMapStore.getState().rows;
    if (!state.ref) return;

    let targetRow = -1;
    for (let i = state.currentRow; i < rows.length; i++) {
      if (rows[i]?.type === TREES) {
        targetRow = i + 1;
        break;
      }
    }

    if (targetRow === -1 || targetRow <= state.currentRow) return;

    const rowData = rows[targetRow - 1];
    const targetTile =
      rowData?.type === TREES
        ? getNearestFreeTileOnTreesRow(rowData, state.currentTile)
        : state.currentTile;

    set({
      jumpInProgress: {
        targetRow,
        targetTile,
        startRow: state.currentRow,
        startTile: state.currentTile,
        startTime: performance.now(),
      },
    });
  },
  completeJump: () => {
    const state = get();
    const jump = state.jumpInProgress;
    if (!jump) return;

    const { targetRow, targetTile } = jump;
    set({
      currentRow: targetRow,
      currentTile: targetTile,
      movements: [],
      moveHistory: [
        ...state.moveHistory,
        { rowIndex: targetRow, tileIndex: targetTile },
      ],
      jumpInProgress: null,
    });
    useGameStore.getState().setScore(targetRow);

    let iterations = 0;
    const maxIterations = 10;
    while (
      useMapStore.getState().rows.length - ROWS_PATCH_THRESHOLD <= targetRow &&
      iterations < maxIterations
    ) {
      useMapStore.getState().setRows();
      iterations += 1;
    }
  },
  reset: () => {
    set({
      currentRow: 0,
      currentTile: 0,
      movements: [],
      moveHistory: INITIAL_HISTORY,
      jumpInProgress: null,
    });
  },
}));