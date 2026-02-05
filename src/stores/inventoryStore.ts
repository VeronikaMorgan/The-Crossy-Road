import { ITEM_DURATION_MS } from "@/_components/constants";
import type { ItemType } from "@/types";
import { create } from "zustand";

interface ActiveEffect {
  type: ItemType;
  expiresAt: number;
}

interface InventoryStore {
  items: ItemType[];
  activeEffects: ActiveEffect[];
  collectedKeys: string[];
  addItem: (type: ItemType) => void;
  useItem: (type: ItemType) => void;
  removeItem: (type: ItemType, index?: number) => void;
  collectItem: (type: ItemType, rowIndex: number, tileIndex: number) => void;
  isCollected: (rowIndex: number, tileIndex: number) => boolean;
  tickEffects: () => void;
  getVehicleSpeedMultiplier: () => number;
  hasShield: () => boolean;
  hasClock: () => boolean;
  hasLightning: () => boolean;
  reset: () => void;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  items: ["shield", "clock", "lightning"],
  activeEffects: [],
  collectedKeys: [],

  addItem: (type: ItemType) => {
    set((state) => ({ items: [...state.items, type] }));
  },

  useItem: (type: ItemType) => {
    const state = get();
    const index = state.items.indexOf(type);
    if (index === -1) return;

    const newItems = [...state.items];
    newItems.splice(index, 1);

    const expiresAt = Date.now() + ITEM_DURATION_MS;
    const newEffects = [
      ...state.activeEffects.filter((e) => e.type !== type),
      { type, expiresAt },
    ];

    set({ items: newItems, activeEffects: newEffects });
  },

  removeItem: (type: ItemType, index?: number) => {
    set((state) => {
      const idx = index ?? state.items.indexOf(type);
      if (idx === -1) return state;
      const newItems = [...state.items];
      newItems.splice(idx, 1);
      return { items: newItems };
    });
  },

  collectItem: (type: ItemType, rowIndex: number, tileIndex: number) => {
    const key = `${rowIndex}-${tileIndex}`;
    set((state) => ({
      items: [...state.items, type],
      collectedKeys: state.collectedKeys.includes(key) ? state.collectedKeys : [...state.collectedKeys, key],
    }));
  },

  isCollected: (rowIndex: number, tileIndex: number) => {
    return get().collectedKeys.includes(`${rowIndex}-${tileIndex}`);
  },

  tickEffects: () => {
    const now = Date.now();
    set((state) => ({
      activeEffects: state.activeEffects.filter((e) => e.expiresAt > now),
    }));
  },

  getVehicleSpeedMultiplier: () => {
    const now = Date.now();
    const hasClock = get().activeEffects.some(
      (e) => e.type === "clock" && e.expiresAt > now,
    );
    return hasClock ? 0.5 : 1;
  },

  hasShield: () => {
    const now = Date.now();
    return get().activeEffects.some(
      (e) => e.type === "shield" && e.expiresAt > now,
    );
  },
  hasClock: () => {
    const now = Date.now();
    return get().activeEffects.some(
      (e) => e.type === "clock" && e.expiresAt > now,
    );
  },
  hasLightning: () => {
    const now = Date.now();
    return get().activeEffects.some(
      (e) => e.type === "lightning" && e.expiresAt > now,
    );
  },

  reset: () => set({ items: ["shield", "clock", "lightning"], activeEffects: [], collectedKeys: [] }),
}));
