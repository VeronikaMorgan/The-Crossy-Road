import type { MovementDirection } from "@/types";
import { getMovementFinalPosition } from "./getMovementFinalPosition";
import { MAX_TILE_INDEX, MIN_TILE_INDEX } from "@/_components/constants";
import { useMapStore } from "@/stores/mapStore";

export const endsUpInValidPosition = (
  currentPosition: {
    rowIndex: number;
    tileIndex: number;
  },
  movements: MovementDirection[],
) => {
  const finalPosition = getMovementFinalPosition(currentPosition, movements);

  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === MIN_TILE_INDEX - 1 ||
    finalPosition.tileIndex === MAX_TILE_INDEX + 1
  ) {
    return false;
  }

  const finalRow = useMapStore.getState().rows[finalPosition.rowIndex - 1];

  if (
    finalRow &&
    finalRow.type === "trees" &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    return false;
  }

  return true;
};
