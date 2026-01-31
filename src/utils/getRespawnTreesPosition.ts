import type { MoveHistoryEntry } from "@/types";

type RowsLike = { type: string }[];

const isTreesRow = (visualRow: number, rows: RowsLike): boolean =>
  visualRow >= 1 && rows[visualRow - 1]?.type === "trees";

const getLastTreesFromHistory = (
  moveHistory: MoveHistoryEntry[],
  rows: RowsLike,
): { rowIndex: number; tileIndex: number } | null => {
  for (let i = moveHistory.length - 1; i >= 0; i--) {
    const { rowIndex, tileIndex } = moveHistory[i];
    if (isTreesRow(rowIndex, rows)) return { rowIndex, tileIndex };
  }
  return null;
};

const getNearestTreesRowToScore = (score: number, rows: RowsLike): number => {
  for (let v = Math.min(score, rows.length); v >= 1; v--) {
    if (isTreesRow(v, rows)) return v;
  }
  return 0;
};

export const getRespawnTreesPosition = (
  moveHistory: MoveHistoryEntry[],
  rows: RowsLike,
  score: number,
): { rowIndex: number; tileIndex: number } => {
  const fromHistory = getLastTreesFromHistory(moveHistory, rows);
  if (fromHistory) return fromHistory;
  return { rowIndex: getNearestTreesRowToScore(score, rows), tileIndex: 0 };
};
