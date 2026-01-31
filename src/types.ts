import * as THREE from 'three'

export type RowType = 'cars' | 'trees' | 'trucks' | 'train'

export type TreeType = "pine" | "basic";

export type TreeDataType = {
    tileIndex: number;
    height: number;
    type: TreeType;
}

export type VehicleType = {
    initialTileIndex: number
    color: THREE.ColorRepresentation
}

export type TrainType = {
    initialTileIndex: number;
    wagons: number;
    wagonsColors: THREE.ColorRepresentation[];
}

export type TreesRowType = {
    type: 'trees';
    trees: TreeDataType[]
}

export type VericlesRowType = {
    direction: boolean;
    speed: number;
    vehicles: VehicleType[]
}

export type VericlesRowDataType = {
    type: 'cars' | 'trucks';
    direction: boolean;
    speed: number;
    vehicles: VehicleType[]
}

export type TrainRowType = {
    type: 'train';
    direction: boolean;
    speed: number;
    train: TrainType;
}

export type VehicleComponentProps = VehicleType &
  Pick<VericlesRowType, "direction" | "speed"> & {
    rowIndex: number;
  };

export type RowDataType = TreesRowType | VericlesRowDataType | TrainRowType

export type MovementDirection = 'forward' | 'backward' | 'left' | 'right'

export type MoveHistoryEntry = {
  rowIndex: number;
  tileIndex: number;
  direction?: MovementDirection;
};

export type Direction = boolean;

export type LevelConfigType = {
    levelId: number;
    maxCarsCount: number;
    maxTrucksCount: number;
    maxRoadsRows: number;
    maxTrainRows: number;
    trainWindowSize: number;
    maxTrainsPerWindow: number;
    carSpeeds: number[];
    truckSpeeds: number[];
    trainSpeeds: number[];
};