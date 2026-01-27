import { TILE_SIZE } from "@/_components/constants";
import type { TreeType } from "@/types";

const TREE_THRUNK_HEIGHT = 20;

export const Tree = ({ tileIndex, height }: TreeType) => {
  return (
    <group position-x={tileIndex * TILE_SIZE} >
      <mesh position-z={height / 2 + TREE_THRUNK_HEIGHT} castShadow receiveShadow>
        <boxGeometry args={[30, 30, height]} />
        <meshLambertMaterial color={0x7aa21d} flatShading />
      </mesh>
      <mesh position-z={10} castShadow receiveShadow>
        <boxGeometry args={[15, 15, TREE_THRUNK_HEIGHT]} />
        <meshLambertMaterial color={0x4d2926} flatShading />
      </mesh>
    </group>
  );
};
