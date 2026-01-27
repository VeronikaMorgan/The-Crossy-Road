import { LEVELS_CONFIG, ROWS_PATCH_COUNT } from "@/_components/constants";
import type { RowDataType } from "@/types";
import { generateData } from "@/utils/generateData";
import { create } from "zustand";

interface MapStore {
  rows: RowDataType[];
  level: number;
  setRows: () => void;
  reset: () => void;
}

const getLevelConfig = (level: number) => {
  const configIndex = Math.min(level - 1, LEVELS_CONFIG.length - 1);
  return LEVELS_CONFIG[configIndex];
};

export const useMapStore = create<MapStore>((set) => ({
  rows: generateData(ROWS_PATCH_COUNT, getLevelConfig(1)),
  level: 1,
  setRows: () => {
    set((state) => {
      const newLevel = state.level + 1;
      const levelConfig = getLevelConfig(newLevel);
      const newRows = generateData(ROWS_PATCH_COUNT, levelConfig);
      return { 
        rows: [...state.rows, ...newRows],
        level: newLevel,
      };
    });
  },
  reset: () => {
    const levelConfig = getLevelConfig(1);
    set({ 
      rows: generateData(ROWS_PATCH_COUNT, levelConfig),
      level: 1,
    });
  },
}));

