import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useFrame } from "@react-three/fiber";
import { type RefObject } from "react";
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
  const playerRef = usePlayerStore((state) => state.ref);

  useFrame(() => {
    // Don't check if game is already ended
    if (gameStatus === "ended") return;
    
    if (!vehicleRef.current) return;
    if (!playerRef) return;

    // Only check collision if player is on the same row or adjacent rows
    if (
      rowIndex === currentRow ||
      rowIndex === currentRow + 1 ||
      rowIndex === currentRow - 1
    ) {
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(vehicleRef.current);

      const playerBoundingBox = new THREE.Box3();
      playerBoundingBox.setFromObject(playerRef);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        console.log("Collision detected!");
        endGame();
      }
    }
  });
};
