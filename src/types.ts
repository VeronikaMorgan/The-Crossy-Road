import * as THREE from 'three'

export type RowType = 'cars' | 'trees' | 'trucks'

export type TreeType = {
    tileIndex: number;
    height: number;
}

export type VehicleType = {
    initialTileIndex: number
    color: THREE.ColorRepresentation
}

export type TreesRowType = {
    type: 'trees';
    trees: TreeType[]
}

export type VericlesRowType = {
    direction: boolean;
    speed: number;
    vehicles: VehicleType[]
}

export type CarsRowType = VericlesRowType &{
    type: 'cars'
}

export type TrucksRowType = VericlesRowType &{
    type: 'trucks'
}

export type VehicleComponentProps = VehicleType &
  Pick<VericlesRowType, "direction" | "speed"> & {
    rowIndex: number;
  };

export type RowDataType = TreesRowType | CarsRowType | TrucksRowType

export type MovementDirection = 'forward' | 'backward' | 'left' | 'right'

export type Direction = boolean;