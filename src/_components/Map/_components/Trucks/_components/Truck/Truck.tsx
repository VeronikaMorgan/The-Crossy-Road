import { TILE_SIZE } from "@/_components/constants";
import type { VehicleComponentProps } from "@/types";
import { Wheel } from "../../../Cars/_components/Wheel";
import { useRef } from "react";
import type { Group } from "three";
import { useVehicleAnimation } from "@/hooks/useVehicleAnimation";
import { useInterfereVehicle } from "@/hooks/useInterfereVehicle";

export const Truck = ({
  initialTileIndex,
  color,
  direction,
  speed,
  rowIndex,
}: VehicleComponentProps) => {
  const truckRef = useRef<Group>(null);
  useVehicleAnimation({ ref: truckRef, direction, speed });
  useInterfereVehicle({ vehicleRef: truckRef, rowIndex });
  return (
    <group ref={truckRef} position-x={initialTileIndex * TILE_SIZE} rotation-z={direction ? 0 : Math.PI}>
      <mesh position={[-15, 0, 25]} castShadow receiveShadow>
        <boxGeometry args={[70, 35, 35]} />
        <meshLambertMaterial color={0xb4c6fc} flatShading />
      </mesh>
      <mesh position={[35, 0, 20]} castShadow receiveShadow>
        <boxGeometry args={[30, 30, 30]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
     <Wheel positionX={-35} />
     <Wheel positionX={5} />
     <Wheel positionX={37} />
    </group>
  );
};