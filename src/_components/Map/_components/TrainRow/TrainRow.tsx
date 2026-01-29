import { TILES_PER_ROW, TILE_SIZE } from "@/_components/constants";
import type { TrainRowType } from "@/types";
import { RowBase } from "@/ui/RowBase";
import { Train } from "./_components/Train";

type TrainRowProps = {
  rowIndex: number;
  rowData?: TrainRowType;
};

const RAIL_COLOR = 0x495867;
const TIE_COLOR = 0x7a4419;
const RAIL_HEIGHT = 12;
const TIE_WIDTH = 10;
const TIE_HEIGHT = 3;
const TIE_LENGTH = 35;
const TIE_SPACING = 40;
const RAIL_EXTENSION = 30;

const getTiePositions = (railLength: number) => {
  const halfRail = railLength / 2;
  const numTies = Math.floor(railLength / TIE_SPACING) + 1;
  const startOffset = -halfRail + TIE_LENGTH / 2;
  return Array.from(
    { length: numTies },
    (_, i) => startOffset + i * TIE_SPACING,
  ).filter((pos) => {
    const inFirstCell = pos >= -halfRail && pos < -halfRail + TILE_SIZE;
    const inLastCell = pos > halfRail - TILE_SIZE && pos <= halfRail;
    return !inFirstCell && !inLastCell;
  });
}

export function TrainRow({ rowIndex, rowData }: TrainRowProps) {
  const rowWidth = TILES_PER_ROW * TILE_SIZE;
  const railLength = rowWidth + 2 * RAIL_EXTENSION;
  const tiePositions = getTiePositions(railLength);

  return (
    <RowBase rowIndex={rowIndex} type="grass">
      <mesh position-y={-12} position-z={RAIL_HEIGHT / 2} receiveShadow>
        <boxGeometry args={[railLength, 1, 2]} />
        <meshBasicMaterial color={RAIL_COLOR} />
      </mesh>

      <mesh position-y={8} position-z={RAIL_HEIGHT / 2} receiveShadow>
        <boxGeometry args={[railLength, 1, 2]} />
        <meshBasicMaterial color={RAIL_COLOR} />
      </mesh>
      <group>
        {tiePositions.map((tiePosition, i) => (
          <mesh
            key={i}
            position-x={tiePosition}
            position-z={TIE_HEIGHT / 2}
            receiveShadow
            rotation={[0, 0, Math.PI * 0.5]}
          >
            <boxGeometry args={[TIE_LENGTH, TIE_WIDTH, TIE_HEIGHT]} />
            <meshBasicMaterial color={TIE_COLOR} />
          </mesh>
        ))}
      </group>
      {rowData && (
        <Train
          train={rowData.train}
          direction={rowData.direction}
          speed={rowData.speed}
          rowIndex={rowIndex}
        />
      )}
    </RowBase>
  );
}
