import {
  TILE_SIZE,
  TRAIN_ENGINE_TO_WAGONS_GAP,
  TRAIN_ENGINE_WIDTH,
  TRAIN_WAGON_SPACING,
  TRAIN_WAGON_WIDTH,
} from "@/_components/constants";
import { useInterfereVehicle } from "@/hooks/useInterfereVehicle";
import { useVehicleAnimation } from "@/hooks/useVehicleAnimation";
import type { TrainType } from "@/types";
import { useRef } from "react";
import type { Group } from "three";
import { getTrainLength } from "@/utils/generateData";

type TrainProps = {
  train: TrainType;
  direction: boolean;
  speed: number;
  rowIndex: number;
};

const ENGINE_COLOR = 0x2d3436;
const ENGINE_ACCENT = 0x1a1d21;
const CABIN_COLOR = 0x3d4550;
const CHIMNEY_COLOR = 0x1a1d21;
const WAGON_HEIGHT = 26;
const WAGON_DEPTH = 34;
const WAGON_ROOF_OFFSET = 4;
const ENGINE_RADIUS = 14;
const ENGINE_LENGTH = TRAIN_ENGINE_WIDTH;
const CABIN_WIDTH = 18;
const CHIMNEY_RADIUS = 5;
const CHIMNEY_HEIGHT = 16;
const RAIL_OFFSET = 6;
const ENGINE_AFTER_LAST_WAGON =
  TRAIN_WAGON_WIDTH / 2 + TRAIN_ENGINE_TO_WAGONS_GAP + TRAIN_ENGINE_WIDTH / 2;

export function Train({ train, direction, speed, rowIndex }: TrainProps) {
  const trainRef = useRef<Group>(null);
  const trainLength = getTrainLength(train.wagons);
  useVehicleAnimation({
    ref: trainRef,
    direction,
    speed,
    length: trainLength,
  });
  useInterfereVehicle({ vehicleRef: trainRef, rowIndex });

  const { initialTileIndex, wagons, wagonsColors } = train;

  const engineX = (wagons - 1) * TRAIN_WAGON_SPACING + ENGINE_AFTER_LAST_WAGON;
  const baseZ = WAGON_HEIGHT / 2 + RAIL_OFFSET;

  return (
    <group
      ref={trainRef}
      position-x={initialTileIndex * TILE_SIZE}
      rotation-z={direction ? 0 : Math.PI}
    >
      {Array.from({ length: wagons }, (_, i) => (
        <group key={i} position={[i * TRAIN_WAGON_SPACING, 0, baseZ]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[TRAIN_WAGON_WIDTH, WAGON_DEPTH, WAGON_HEIGHT]} />
            <meshLambertMaterial
              color={wagonsColors[i] ?? 0x888888}
              flatShading
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[0, 0, WAGON_HEIGHT / 2 + WAGON_ROOF_OFFSET / 2]}
          >
            <boxGeometry
              args={[TRAIN_WAGON_WIDTH - 4, WAGON_DEPTH - 4, WAGON_ROOF_OFFSET]}
            />
            <meshLambertMaterial color={0x5a6268} flatShading />
          </mesh>
        </group>
      ))}

      <group position={[engineX, 0, baseZ]}>
        {/* Boiler cylinder — axis along X */}
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry
            args={[ENGINE_RADIUS, ENGINE_RADIUS, ENGINE_LENGTH, 16]}
          />
          <meshLambertMaterial color={ENGINE_COLOR} flatShading />
        </mesh>
        {/* Front/rear caps (darker rings) */}
        <mesh
          castShadow
          receiveShadow
          position={[-ENGINE_LENGTH / 2, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[ENGINE_RADIUS + 1, ENGINE_RADIUS + 1, 2, 16]} />
          <meshLambertMaterial color={ENGINE_ACCENT} flatShading />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[ENGINE_LENGTH / 2, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[ENGINE_RADIUS + 1, ENGINE_RADIUS + 1, 2, 16]} />
          <meshLambertMaterial color={ENGINE_ACCENT} flatShading />
        </mesh>
        {/* Cabin */}
        <mesh
          castShadow
          receiveShadow
          position={[-ENGINE_LENGTH / 2 - CABIN_WIDTH / 2, 0, ENGINE_RADIUS + 4]}
        >
          <boxGeometry args={[CABIN_WIDTH, WAGON_DEPTH - 4, 14]} />
          <meshLambertMaterial color={CABIN_COLOR} flatShading />
        </mesh>
        {/* Chimney */}
        <mesh
          castShadow
          receiveShadow
          position={[ENGINE_LENGTH / 4, 0, ENGINE_RADIUS + CHIMNEY_HEIGHT / 2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry
            args={[CHIMNEY_RADIUS, CHIMNEY_RADIUS + 1, CHIMNEY_HEIGHT, 12]}
          />
          <meshLambertMaterial color={CHIMNEY_COLOR} flatShading />
        </mesh>
      </group>
    </group>
  );
}
