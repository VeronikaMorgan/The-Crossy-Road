import { TILE_SIZE } from "@/_components/constants";
import { useInventoryStore } from "@/stores/inventoryStore";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import type { ItemType } from "@/types";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ItemProps = {
  tileIndex: number;
  type: ItemType;
  rowIndex: number;
};

const ShieldModel = () => (
  <group rotation-x={Math.PI / 2}>
    <mesh castShadow receiveShadow>
      <cylinderGeometry args={[12, 14, 3, 6]} />
      <meshLambertMaterial color={0x4a90d9} flatShading />
    </mesh>
  </group>
);

const ClockModel = () => (
  <group rotation-x={Math.PI / 2}>
    <mesh castShadow receiveShadow>
      <cylinderGeometry args={[14, 14, 4, 24]} />
      <meshLambertMaterial color={0xf9c74f} flatShading />
    </mesh>
    <mesh position-z={3} rotation-x={-Math.PI / 2}>
      <boxGeometry args={[1, 6, 1]} />
      <meshLambertMaterial color={0x333333} flatShading />
    </mesh>
    <mesh position-z={3} rotation-x={-Math.PI / 2} rotation-z={-Math.PI / 2}>
      <boxGeometry args={[1, 4, 1]} />
      <meshLambertMaterial color={0x333333} flatShading />
    </mesh>
  </group>
);

const LightningModel = () => (
  <group rotation-z={Math.PI / 4} scale={0.8}>
    <mesh castShadow receiveShadow>
      <octahedronGeometry args={[12, 0]} />
      <meshLambertMaterial color={0xffd93d} flatShading />
    </mesh>
  </group>
);

const ITEM_MODELS: Record<ItemType, () => React.ReactNode> = {
  shield: ShieldModel,
  clock: ClockModel,
  lightning: LightningModel,
};

export const Item = ({ tileIndex, type, rowIndex }: ItemProps) => {
  const ref = useRef<THREE.Group | null>(null);
  const isCollected = useInventoryStore((s) => s.isCollected(rowIndex, tileIndex));
  const collectItem = useInventoryStore((s) => s.collectItem);
  const gameStatus = useGameStore((s) => s.status);
  const currentRow = usePlayerStore((s) => s.currentRow);
  const currentTile = usePlayerStore((s) => s.currentTile);

  useFrame(() => {
    if (gameStatus === "ended" || isCollected || !ref.current) return;
    if (currentRow === rowIndex && currentTile === tileIndex) {
      collectItem(type, rowIndex, tileIndex);
    }
  });

  if (isCollected) return null;

  const Model = ITEM_MODELS[type];

  return (
    <group ref={ref} position-x={tileIndex * TILE_SIZE} position-z={15}>
      <Model />
    </group>
  );
};
