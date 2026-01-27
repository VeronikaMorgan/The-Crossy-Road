import { MAX_TILE_INDEX, MIN_TILE_INDEX, TILE_SIZE } from "@/_components/constants";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export const useVehicleAnimation = ({
  ref,
  direction,
  speed,
}: {
  ref: React.RefObject<Group | null>;
  direction: boolean;
  speed: number;
}) => {
  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }
    const startOfTheRow = (MIN_TILE_INDEX - 2) * TILE_SIZE;
    const endOfTheRow = (MAX_TILE_INDEX + 2) * TILE_SIZE;

    if (direction) {
      if (ref.current.position.x > endOfTheRow) {
        ref.current.position.x = startOfTheRow;
      }
      ref.current.position.x += speed * delta;
    } else {
      if (ref.current.position.x < startOfTheRow) {
        ref.current.position.x = endOfTheRow;
      }
      ref.current.position.x -= speed * delta;
    }
  });
};
