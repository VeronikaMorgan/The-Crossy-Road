import {
  MAX_TILE_INDEX,
  MIN_TILE_INDEX,
  TILE_SIZE,
} from "@/_components/constants";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const ROW_MARGIN = 2;

export const useVehicleAnimation = ({
  ref,
  direction,
  speed,
  length = 0,
}: {
  ref: React.RefObject<Group | null>;
  direction: boolean;
  speed: number;
  length?: number;
}) => {
  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }
    const startOfTheRow = (MIN_TILE_INDEX - ROW_MARGIN) * TILE_SIZE;
    const endOfTheRow = (MAX_TILE_INDEX + ROW_MARGIN) * TILE_SIZE;
    const wrapMargin = length > 0 ? length + TILE_SIZE : 0;

    if (direction) {
      if (ref.current.position.x > endOfTheRow) {
        ref.current.position.x = startOfTheRow - wrapMargin;
      }
      ref.current.position.x += speed * delta;
    } else {
      if (ref.current.position.x < startOfTheRow) {
        ref.current.position.x = endOfTheRow + wrapMargin;
      }
      ref.current.position.x -= speed * delta;
    }
  });
};
