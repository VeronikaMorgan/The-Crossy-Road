import type { RowType } from "@/types";

export const MIN_TILE_INDEX = -10;
export const MAX_TILE_INDEX = 10;
export const TILES_PER_ROW = MAX_TILE_INDEX - MIN_TILE_INDEX + 1;

export const TILE_SIZE = 42;

export const ROW_TYPES_ARRAY: RowType[] = ["trees", "cars", "trucks"];
export const TREE_HEIGHTS_ARRAY = [20, 45, 35, 60, 50];
export const CAR_COLORS_ARRAY = [0xff0000, 0x00ff00, 0x0000ff];
export const TRUCK_COLORS_ARRAY = [0xff0000, 0x00ff00, 0x0000ff];

export const TREES = "trees" as const;
export const CARS = "cars" as const;
export const TRUCKS = "trucks" as const;

export const MIN_TREES_COUNT = 1;
export const MAX_TREES_COUNT = 7;
export const MIN_CARS_COUNT = 1;
export const MIN_TRUCKS_COUNT = 1;

export const ROWS_PATCH_COUNT = 20;
export const ROWS_PATCH_THRESHOLD = 10;

export const LEVELS_CONFIG = [
  {
    levelId: 1,
    maxCarsCount: 3,
    maxTrucksCount: 1,
    maxRoadsRows: 2,
    carSpeeds: [125, 80, 100],
    truckSpeeds: [60, 80, 100],
  },
  {
    levelId: 2,
    maxCarsCount: 4,
    maxTrucksCount: 2,
    maxRoadsRows: 2,
    carSpeeds: [125, 100, 150],
    truckSpeeds: [ 60, 80, 100, 120],
  },
  {
    levelId: 3,
    maxCarsCount: 4,
    maxTrucksCount: 3,
    maxRoadsRows: 3,
    carSpeeds: [125, 100, 150, 180],
    truckSpeeds: [80, 100, 120],
  },
  {
    levelId: 4,
    maxCarsCount: 4,
    maxTrucksCount: 2,
    maxRoadsRows: 4,
    carSpeeds: [125, 150, 200, 180,],
    truckSpeeds: [100, 120, 140],
  },
  {
    levelId: 5,
    maxCarsCount: 4,
    maxTrucksCount: 3,
    maxRoadsRows: 5,
    carSpeeds: [150, 200, 180, 220],
    truckSpeeds: [100, 120, 140],
  },
];
