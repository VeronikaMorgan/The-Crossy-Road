import { MAX_TILE_INDEX, MIN_TILE_INDEX } from "@/_components/constants";
import type { TreesRowType } from "@/types";

export const getNearestFreeTileOnTreesRow = (
  rowData: TreesRowType,
  desiredTile: number,
): number => {
  const occupied = new Set(rowData.trees.map((t) => t.tileIndex));
  if (!occupied.has(desiredTile)) return desiredTile;

  let bestTile = desiredTile;
  let bestDist = Infinity;
  for (let t = MIN_TILE_INDEX; t <= MAX_TILE_INDEX; t++) {
    if (occupied.has(t)) continue;
    const dist = Math.abs(t - desiredTile);
    if (dist < bestDist) {
      bestDist = dist;
      bestTile = t;
    }
  }
  return bestTile;
};
