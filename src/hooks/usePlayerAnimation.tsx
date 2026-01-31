import { ROWS_PATCH_THRESHOLD, TILE_SIZE } from "@/_components/constants";
import { useGameStore } from "@/stores/gameStore";
import { useMapStore } from "@/stores/mapStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

const STEP_DURATION = 0.2;

const SetPosition = (player: Group, progress: number, state: { currentTile: number; currentRow: number; movements: string[] }) => {
    const startXPosition = state.currentTile * TILE_SIZE;
    const startYPosition = state.currentRow * TILE_SIZE;

    let endXPosition = startXPosition;
    let endYPosition = startYPosition;

    switch(state.movements[0]) {
        case "forward":
            endYPosition += TILE_SIZE;
            break;
        case "backward":
            endYPosition -= TILE_SIZE;
            break;
        case "left":
            endXPosition -= TILE_SIZE;
            break;
        case "right":
            endXPosition += TILE_SIZE;
            break;
        default:
            break;
    }

    player.position.x = THREE.MathUtils.lerp(startXPosition, endXPosition, progress);
    player.position.y = THREE.MathUtils.lerp(startYPosition, endYPosition, progress);
    player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

const SetRotation = (player: Group, progress: number, movements: string[]) => {
    let endRotation = player.rotation.y;

    switch(movements[0]) {
        case "forward":
            endRotation = 0;
            break;
        case "backward":
            endRotation = Math.PI;
            break;
        case "left":
            endRotation = Math.PI / 2;
            break;
        case "right":
            endRotation = -Math.PI / 2;
            break;
        default:
            break;
    }

    player.children[0].rotation.z = THREE.MathUtils.lerp(player.children[0].rotation.z, endRotation, progress);
}

export const usePlayerAnimation = ({
  ref,
}: {
  ref: React.RefObject<Group | null>;
}) => {
  const movementClock = new THREE.Clock(false);
  const stepCompleted = usePlayerStore((state) => state.stepCompleted);
  
  useFrame(() => {
    const player = ref.current;
    if (!player) {
      return;
    }
    const state = usePlayerStore.getState();
    if(!state.movements.length) return;
    if(!movementClock.running) movementClock.start();
     const progress = Math.min(1, movementClock.getElapsedTime() / STEP_DURATION);

     SetPosition(player, progress, state);
     SetRotation(player, progress, state.movements);

     if(progress === 1) {
        stepCompleted();
        const { currentRow } = usePlayerStore.getState();
        useGameStore.getState().setScore(currentRow);
        const rowsLength = useMapStore.getState().rows.length;
        if (currentRow === rowsLength - ROWS_PATCH_THRESHOLD) {
          useMapStore.getState().setRows();
        }
        movementClock.stop();
     }
  });
};
