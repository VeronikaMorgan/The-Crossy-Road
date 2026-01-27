import { TILE_SIZE } from "@/_components/constants";
import type { VehicleComponentProps } from "@/types";
import { Wheel } from "../Wheel";
import { useVehicleAnimation } from "@/hooks/useVehicleAnimation";
import { useRef } from "react";
import type { Group } from "three";
import { useInterfereVehicle } from "@/hooks/useInterfereVehicle";

export const Car = ({
  initialTileIndex,
  color,
  direction,
  speed,
  rowIndex,
}: VehicleComponentProps) => {
  const carRef = useRef<Group>(null);
  useVehicleAnimation({ ref: carRef, direction, speed });
  useInterfereVehicle({ vehicleRef: carRef, rowIndex });
  return (
    <group ref={carRef} position-x={initialTileIndex * TILE_SIZE} rotation-z={direction ? 0 : Math.PI}>
      <mesh position={[0, 0, 12]} castShadow receiveShadow>
        <boxGeometry args={[60, 30, 15]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <mesh position={[-6, 0, 25.5]} castShadow receiveShadow>
        <boxGeometry args={[33, 24, 12]} />
        <meshLambertMaterial color={0xffffff} flatShading />
      </mesh>
      <Wheel positionX={-18} />
      <Wheel positionX={18} />
    </group>
  );
};
