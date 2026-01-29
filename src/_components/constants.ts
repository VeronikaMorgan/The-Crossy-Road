import type { RowType, TreeType } from "@/types";

export const MIN_TILE_INDEX = -10;
export const MAX_TILE_INDEX = 10;
export const TILES_PER_ROW = MAX_TILE_INDEX - MIN_TILE_INDEX + 1;

export const TILE_SIZE = 42;

export const ROW_TYPES_ARRAY: RowType[] = ["trees", "cars", "trucks", "train"];
export const TREE_TYPES_ARRAY: TreeType[] = ["pine", "basic"];
export const TREE_HEIGHTS_ARRAY = [20, 45, 35, 60, 50];
export const CAR_COLORS_ARRAY = [0xf9c74f, 0xf86624, 0x7678ed];
export const TRUCK_COLORS_ARRAY = [0xfca311, 0x00a6fb, 0xef476f];

export const TREES = "trees" as const;
export const CARS = "cars" as const;
export const TRUCKS = "trucks" as const;
export const TRAIN = "train" as const;

export const MIN_TREES_COUNT = 1;
export const MAX_TREES_COUNT = 7;
export const MIN_CARS_COUNT = 1;
export const MIN_TRUCKS_COUNT = 1;

export const TRAIN_WAGONS_COLORS_ARRAY = [0xf9c74f, 0xf86624, 0x7678ed, 0xef476f];
export const TRAIN_WAGONS_MIN_COUNT = 4;
export const TRAIN_WAGONS_MAX_COUNT = 8;

export const TRAIN_WAGON_WIDTH = 88;
export const TRAIN_WAGON_SPACING = 95;
export const TRAIN_ENGINE_WIDTH = 40;
export const TRAIN_ENGINE_TO_WAGONS_GAP = 14;

export const ROWS_PATCH_COUNT = 20;
export const ROWS_PATCH_THRESHOLD = 10;



export const TRAIN_SPEEDS = [300];

export const LEVELS_CONFIG = [
  {
    levelId: 1,
    maxCarsCount: 3,
    maxTrucksCount: 1,
    maxRoadsRows: 2,
    maxTrainRows: 1,
    trainWindowSize: 10,
    maxTrainsPerWindow: 0,
    carSpeeds: [125, 80, 100],
    truckSpeeds: [60, 80, 100],
    trainSpeeds: [1000],
  },
  {
    levelId: 2,
    maxCarsCount: 4,
    maxTrucksCount: 2,
    maxRoadsRows: 2,
    maxTrainRows: 1,
    trainWindowSize: 10,
    maxTrainsPerWindow: 1,
    carSpeeds: [125, 100, 150],
    truckSpeeds: [60, 80, 100, 120],
    trainSpeeds: [500, 550],
  },
  {
    levelId: 3,
    maxCarsCount: 4,
    maxTrucksCount: 3,
    maxRoadsRows: 3,
    maxTrainRows: 2,
    trainWindowSize: 10,
    maxTrainsPerWindow: 2,
    carSpeeds: [125, 100, 150, 180],
    truckSpeeds: [80, 100, 120],
    trainSpeeds: [600, 700],
  },
  {
    levelId: 4,
    maxCarsCount: 4,
    maxTrucksCount: 2,
    maxRoadsRows: 4,
    maxTrainRows: 2,
    trainWindowSize: 10,
    maxTrainsPerWindow: 2,
    carSpeeds: [125, 150, 200, 180],
    truckSpeeds: [100, 120, 140],
    trainSpeeds: [800, 900],
  },
  {
    levelId: 5,
    maxCarsCount: 4,
    maxTrucksCount: 3,
    maxRoadsRows: 5,
    maxTrainRows: 3,
    trainWindowSize: 10,
    maxTrainsPerWindow: 3,
    carSpeeds: [150, 200, 180, 220],
    truckSpeeds: [100, 120, 140],
    trainSpeeds: [1000, 1100],
  },
];
