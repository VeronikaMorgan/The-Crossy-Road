import { TILES_PER_ROW, TILE_SIZE } from "@/_components/constants";

type RowBaseProps = {
  type: 'grass' | 'road'
  rowIndex: number;
  children?: React.ReactNode;
};

const ROW_BASE_COLOR_MAP = {
  grass: 0xbaf455,
  road: 0x454a59,
}

const ROW_BASE_DARK_COLOR_MAP = {
  grass: 0x8fc442,
  road: 0x2d3138,
}

const ROW_BASE_HEIGHT_MAP = {
  grass: 3,
  road: 1,
}

const SIDE_EXTENSION = 1000;

export function RowBase({ type, rowIndex, children }: RowBaseProps) {
  const baseColor = ROW_BASE_COLOR_MAP[type];
  const darkColor = ROW_BASE_DARK_COLOR_MAP[type];
  const rowWidth = TILES_PER_ROW * TILE_SIZE;
  const halfRowWidth = rowWidth / 2;
  const sideWidth = SIDE_EXTENSION;
  
  return (
    <group position-y={rowIndex * TILE_SIZE} position-z={ROW_BASE_HEIGHT_MAP[type] / 2}>
      <mesh receiveShadow position-x={-halfRowWidth - sideWidth / 2}>
        <boxGeometry args={[sideWidth, TILE_SIZE, ROW_BASE_HEIGHT_MAP[type]]} />
        <meshLambertMaterial color={darkColor} flatShading />
      </mesh>
      
      <mesh receiveShadow>
        <boxGeometry args={[rowWidth, TILE_SIZE, ROW_BASE_HEIGHT_MAP[type]]} />
        <meshLambertMaterial color={baseColor} flatShading />
      </mesh>
      
      <mesh receiveShadow position-x={halfRowWidth + sideWidth / 2}>
        <boxGeometry args={[sideWidth, TILE_SIZE, ROW_BASE_HEIGHT_MAP[type]]} />
        <meshLambertMaterial color={darkColor} flatShading />
      </mesh>
      
      {children}
    </group>
  );
}