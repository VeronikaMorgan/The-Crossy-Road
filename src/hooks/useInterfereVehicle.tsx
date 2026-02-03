import { TILE_SIZE } from "@/_components/constants";
import { useGameStore } from "@/stores/gameStore";
import { useInventoryStore } from "@/stores/inventoryStore";
import { useMapStore } from "@/stores/mapStore";
import { usePlayerStore } from "@/stores/playerStore";
import { getRespawnTreesPosition } from "@/utils/getRespawnTreesPosition";
import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import * as THREE from "three";

export const useInterfereVehicle = ({
  vehicleRef,
  rowIndex,
}: {
  vehicleRef: RefObject<THREE.Group | null>;
  rowIndex: number;
}) => {
  const endGame = useGameStore((state) => state.setEndGame);
  const gameStatus = useGameStore((state) => state.status);
  const currentRow = usePlayerStore((state) => state.currentRow);
  const jumpInProgress = usePlayerStore((state) => state.jumpInProgress);
  const playerRef = usePlayerStore((state) => state.ref);
  const setPosition = usePlayerStore((state) => state.setPosition);
  const decrementLives = useGameStore((state) => state.decrementLives);
  const getLives = useGameStore((state) => state.getLives);
  const rows = useMapStore((state) => state.rows);
  const moveHistory = usePlayerStore((state) => state.moveHistory);
  const score = useGameStore((state) => state.score);
  const wasIntersectingRef = useRef(false);

  useFrame(() => {
    if (gameStatus === "ended") return;
    if (useGameStore.getState().isInvincible()) return;
    if (!vehicleRef.current || !playerRef) return;

    if (
      rowIndex === currentRow ||
      rowIndex === currentRow + 1 ||
      rowIndex === currentRow - 1
    ) {
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(vehicleRef.current);
      const playerBoundingBox = new THREE.Box3();
      playerBoundingBox.setFromObject(playerRef);
      const isIntersecting = playerBoundingBox.intersectsBox(vehicleBoundingBox);

      if (isIntersecting && !wasIntersectingRef.current) {
        wasIntersectingRef.current = true;
        const hasShield = useInventoryStore.getState().hasShield();
        const hasLightning = useInventoryStore.getState().hasLightning();
        // Щит защищает всегда. Молния — только во время прыжка (jumpInProgress).
        const protectedByShield = hasShield;
        const protectedByJump = hasLightning && jumpInProgress !== null;
        if (protectedByShield || protectedByJump) {
          return;
        }
        decrementLives();
        if (getLives() === 0) {
          endGame();
          return;
        }
        const { rowIndex: targetRow, tileIndex: targetTile } = getRespawnTreesPosition(
          moveHistory,
          rows,
          score,
        );
        setPosition(targetRow, targetTile);
        playerRef.position.x = targetTile * TILE_SIZE;
        playerRef.position.y = targetRow * TILE_SIZE;
        useGameStore.getState().setRespawn();
      }
      if (!isIntersecting) {
        wasIntersectingRef.current = false;
      }
    } else {
      wasIntersectingRef.current = false;
    }
  });
};
