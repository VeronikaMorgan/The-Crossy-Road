import type { MovementDirection } from "@/types";


export const getMovementFinalPosition = (
 currentPosition: {
    rowIndex: number,
    tileIndex: number,
 },
 movements: MovementDirection[],
) => {
  return movements.reduce((finalPosition, direction) => {
    switch(direction) {
      case "forward":
        return {
          rowIndex: finalPosition.rowIndex + 1,
          tileIndex: finalPosition.tileIndex,
        };
      case "backward":
        return {
          rowIndex: finalPosition.rowIndex - 1,
          tileIndex: finalPosition.tileIndex,
        };
      case "left":
        return {
          rowIndex: finalPosition.rowIndex,
          tileIndex: finalPosition.tileIndex - 1,
        };
      case "right":
        return {
          rowIndex: finalPosition.rowIndex,
          tileIndex: finalPosition.tileIndex + 1,
        };
      default:
        return finalPosition;
    }
  }, currentPosition);
};

