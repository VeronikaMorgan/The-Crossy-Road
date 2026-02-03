import {
  CARS,
  CAR_COLORS_ARRAY,
  ITEM_SPAWN_INTERVAL,
  ITEM_TYPES_ARRAY,
  MAX_TILE_INDEX,
  MAX_TREES_COUNT,
  MIN_CARS_COUNT,
  MIN_TILE_INDEX,
  MIN_TREES_COUNT,
  MIN_TRUCKS_COUNT,
  ROW_TYPES_ARRAY,
  TRAIN,
  TRAIN_ENGINE_TO_WAGONS_GAP,
  TRAIN_ENGINE_WIDTH,
  TRAIN_WAGONS_COLORS_ARRAY,
  TRAIN_WAGONS_MAX_COUNT,
  TRAIN_WAGONS_MIN_COUNT,
  TRAIN_WAGON_SPACING,
  TRAIN_WAGON_WIDTH,
  TILE_SIZE,
  TREE_HEIGHTS_ARRAY,
  TREE_TYPES_ARRAY,
  TREES,
  TRUCK_COLORS_ARRAY,
  TRUCKS,
} from "@/_components/constants";
import type { Direction, ItemDataType, LevelConfigType, RowDataType, RowType, TreesRowType, TreeType } from "@/types";
import * as THREE from "three";
import { getRandomArrayElement } from "./getRandomArrayElement";


type RowConstraints = {
  consecutiveVehicles: number;
  consecutiveTrains: number;
  recentTypes: RowType[];
};

const getTrainCountInWindow = (recent: RowType[]) =>
  recent.filter((t) => t === TRAIN).length;

const getAvailableTypes = (
  levelConfig: LevelConfigType,
  constraints: RowConstraints,
): RowType[] => {
  const { consecutiveVehicles, consecutiveTrains, recentTypes } = constraints;
  const trainCount = getTrainCountInWindow(recentTypes);
  const canAddTrain = trainCount < levelConfig.maxTrainsPerWindow;
  const { maxRoadsRows, maxTrainRows } = levelConfig;

  if (consecutiveVehicles >= maxRoadsRows) {
    const base: RowType[] = [TREES, TRAIN];
    return canAddTrain ? base : [TREES];
  }
  if (consecutiveTrains >= maxTrainRows) {
    return [TREES, CARS, TRUCKS];
  }
  const base = [...ROW_TYPES_ARRAY];
  if (!canAddTrain) {
    return base.filter((t) => t !== TRAIN);
  }
  return base;
};

const updateConstraintsAfterRow = (
  constraints: RowConstraints,
  rowType: RowType,
  trainWindowSize: number,
): void => {
  const next = [...constraints.recentTypes, rowType].slice(-trainWindowSize);
  constraints.recentTypes = next;

  if (rowType === CARS || rowType === TRUCKS) {
    constraints.consecutiveVehicles++;
    constraints.consecutiveTrains = 0;
    return;
  }
  if (rowType === TRAIN) {
    constraints.consecutiveTrains++;
    constraints.consecutiveVehicles = 0;
    return;
  }
  constraints.consecutiveVehicles = 0;
  constraints.consecutiveTrains = 0;
};

export const generateData = (
  numberOfRows: number,
  levelConfig: LevelConfigType,
) => {
  const rows: RowDataType[] = [];
  const constraints: RowConstraints = {
    consecutiveVehicles: 0,
    consecutiveTrains: 0,
    recentTypes: [],
  };

  for (let i = 0; i < numberOfRows; i++) {
    const baseAvailable = getAvailableTypes(levelConfig, constraints);
    const shouldAddItem = (i + 1) % ITEM_SPAWN_INTERVAL === 0;
    const available = shouldAddItem && baseAvailable.includes(TREES)
      ? [TREES]
      : baseAvailable;
    const row = generateRow(levelConfig, available, shouldAddItem);
    updateConstraintsAfterRow(constraints, row.type, levelConfig.trainWindowSize);
    rows.push(row);
  }
  return rows;
};

const generateTreesRow = (addItem: boolean): TreesRowType => {
  const treesCount = THREE.MathUtils.randInt(MIN_TREES_COUNT, MAX_TREES_COUNT);
  const occupiedTiles = new Set<number>();
  const trees = Array.from({ length: treesCount }, () => {
    let tileIndex: number;
    do {
      tileIndex = THREE.MathUtils.randInt(MIN_TILE_INDEX, MAX_TILE_INDEX);
    } while (occupiedTiles.has(tileIndex));
    occupiedTiles.add(tileIndex);
    return {
      tileIndex,
      height: getRandomArrayElement<number>(TREE_HEIGHTS_ARRAY),
      type: getRandomArrayElement<TreeType>(TREE_TYPES_ARRAY),
    };
  });

  const result: { type: "trees"; trees: typeof trees; item?: ItemDataType } = {
    type: TREES,
    trees,
  };

  if (addItem) {
    const freeTiles: number[] = [];
    for (let t = MIN_TILE_INDEX; t <= MAX_TILE_INDEX; t++) {
      if (!occupiedTiles.has(t)) freeTiles.push(t);
    }
    if (freeTiles.length > 0) {
      const tileIndex = getRandomArrayElement(freeTiles);
      result.item = {
        type: getRandomArrayElement(ITEM_TYPES_ARRAY),
        tileIndex,
      };
    }
  }

  return result;
};

const generateCarsRow = (levelConfig: LevelConfigType) => {
  const carsCount = THREE.MathUtils.randInt(
    MIN_CARS_COUNT,
    levelConfig.maxCarsCount,
  );
  const direction = getRandomArrayElement<Direction>([true, false]);
  const speed = getRandomArrayElement<number>(levelConfig.carSpeeds);
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

    const color = getRandomArrayElement<number>(CAR_COLORS_ARRAY);

    return { initialTileIndex, color };
  });

  return { type: CARS, direction, speed, vehicles };
};

export const getTrainLength = (wagonsCount: number) => {
  const engineX =
    (wagonsCount - 1) * TRAIN_WAGON_SPACING +
    TRAIN_WAGON_WIDTH / 2 +
    TRAIN_ENGINE_TO_WAGONS_GAP +
    TRAIN_ENGINE_WIDTH / 2;
  return engineX + TRAIN_ENGINE_WIDTH / 2;
};

const generateTrainRow = (levelConfig: LevelConfigType) => {
  const wagonsCount = THREE.MathUtils.randInt(
    TRAIN_WAGONS_MIN_COUNT,
    TRAIN_WAGONS_MAX_COUNT,
  );
  const wagonsColors = Array.from({ length: wagonsCount }, () =>
    getRandomArrayElement<number>(TRAIN_WAGONS_COLORS_ARRAY),
  );
  const direction = getRandomArrayElement<Direction>([true, false]);
  const speed = getRandomArrayElement<number>(levelConfig.trainSpeeds);

  const lengthInTiles = Math.ceil(getTrainLength(wagonsCount) / TILE_SIZE);
  const offscreenTiles = lengthInTiles + 30;

  const initialTileIndex = direction
    ? MIN_TILE_INDEX - offscreenTiles
    : MAX_TILE_INDEX + offscreenTiles;

  const train = {
    initialTileIndex,
    wagons: wagonsCount,
    wagonsColors,
  };
  return { type: TRAIN, direction, speed, train };
};

const generateTrucksRow = (levelConfig: LevelConfigType) => {
  const trucksCount = THREE.MathUtils.randInt(
    MIN_TRUCKS_COUNT,
    levelConfig.maxTrucksCount,
  );
  const speed = getRandomArrayElement<number>(levelConfig.truckSpeeds);
  const direction = getRandomArrayElement<Direction>([true, false]);
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

    const color = getRandomArrayElement<number>(TRUCK_COLORS_ARRAY);

    return { initialTileIndex, color };
  });

  return { type: TRUCKS, direction, speed, vehicles };
};

const generateRow = (
  levelConfig: LevelConfigType,
  availableTypes: RowType[],
  addItem: boolean,
): RowDataType => {
  const type = getRandomArrayElement<RowType>(availableTypes);
  switch (type) {
    case TREES:
      return generateTreesRow(addItem);
    case CARS:
      return generateCarsRow(levelConfig);
    case TRUCKS:
      return generateTrucksRow(levelConfig);
    case TRAIN:
      return generateTrainRow(levelConfig);
  }
};
