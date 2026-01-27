import {
  CAR_COLORS_ARRAY,
  CARS,
  LEVELS_CONFIG,
  MAX_TILE_INDEX,
  MAX_TREES_COUNT,
  MIN_CARS_COUNT,
  MIN_TILE_INDEX,
  MIN_TREES_COUNT,
  MIN_TRUCKS_COUNT,
  ROW_TYPES_ARRAY,
  TREE_HEIGHTS_ARRAY,
  TREES,
  TRUCK_COLORS_ARRAY,
  TRUCKS,
} from "@/_components/constants";
import type { Direction, RowDataType, RowType } from "@/types";
import * as THREE from "three";

type LevelConfig = (typeof LEVELS_CONFIG)[number];

export const generateData = (
  numberOfRows: number,
  levelConfig: LevelConfig,
) => {
  const Rows: RowDataType[] = [];
  let consecutiveRoadsCount = 0;
  
  for (let i = 0; i < numberOfRows; i++) {
    const row = generateRow(levelConfig, consecutiveRoadsCount, levelConfig.maxRoadsRows);
    if (row.type === CARS || row.type === TRUCKS) {
      consecutiveRoadsCount++;
    } else {
      consecutiveRoadsCount = 0; 
    }
    Rows.push(row);
  }
  return Rows;
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateTreesRow = () => {
  const treesCount = THREE.MathUtils.randInt(MIN_TREES_COUNT, MAX_TREES_COUNT);
  const occupiedTiles = new Set<number>();
  const trees = Array.from({ length: treesCount }, () => {
    let tileIndex: number;
    do {
      tileIndex = THREE.MathUtils.randInt(MIN_TILE_INDEX, MAX_TILE_INDEX);
    } while (occupiedTiles.has(tileIndex));
    occupiedTiles.add(tileIndex);
    return { tileIndex, height: getRandomElement<number>(TREE_HEIGHTS_ARRAY) };
  });

  return {
    type: TREES,
    trees,
  };
};

const generateCarsRow = (levelConfig: LevelConfig) => {
  const carsCount = THREE.MathUtils.randInt(MIN_CARS_COUNT, levelConfig.maxCarsCount);
  const direction = getRandomElement<Direction>([true, false]);
  const speed = getRandomElement<number>(levelConfig.carSpeeds);
  const occupiedTiles = new Set<number>();
  const vehicles = Array.from({ length: carsCount }, () => {
    let initialTileIndex: number;
    do {
      initialTileIndex = THREE.MathUtils.randInt(
        MIN_TILE_INDEX,
        MAX_TILE_INDEX,
      );
    } while (occupiedTiles.has(initialTileIndex));
    occupiedTiles.add(initialTileIndex);
    occupiedTiles.add(initialTileIndex + 1);
    occupiedTiles.add(initialTileIndex - 1);

    const color = getRandomElement<number>(CAR_COLORS_ARRAY);

    return { initialTileIndex, color };
  });

  return { type: CARS, direction, speed, vehicles };
};

const generateTrucksRow = (levelConfig: LevelConfig) => {
  const trucksCount = THREE.MathUtils.randInt(
    MIN_TRUCKS_COUNT,
    levelConfig.maxTrucksCount,
  );
  const speed = getRandomElement<number>(levelConfig.truckSpeeds);
  const direction = getRandomElement<Direction>([true, false]);
  const occupiedTiles = new Set<number>();
  const vehicles = Array.from({ length: trucksCount }, () => {
    let initialTileIndex: number;
    do {
      initialTileIndex = THREE.MathUtils.randInt(
        MIN_TILE_INDEX,
        MAX_TILE_INDEX,
      );
    } while (occupiedTiles.has(initialTileIndex));
    occupiedTiles.add(initialTileIndex);
    occupiedTiles.add(initialTileIndex + 1);
    occupiedTiles.add(initialTileIndex + 2);
    occupiedTiles.add(initialTileIndex - 1);
    occupiedTiles.add(initialTileIndex - 2);

    const color = getRandomElement<number>(TRUCK_COLORS_ARRAY);

    return { initialTileIndex, color };
  });

  return { type: TRUCKS, direction, speed, vehicles };
};

const generateRow = (
  levelConfig: LevelConfig,
  consecutiveRoadsCount: number,
  maxRoadsRows: number,
) => {
  const availableTypes: RowType[] =
    consecutiveRoadsCount >= maxRoadsRows
      ? [TREES]
      : ROW_TYPES_ARRAY;
  
  const type = getRandomElement<RowType>(availableTypes);

  switch (type) {
    case TREES:
      return generateTreesRow();
    case CARS:
      return generateCarsRow(levelConfig);
    case TRUCKS:
      return generateTrucksRow(levelConfig);
  }
};
