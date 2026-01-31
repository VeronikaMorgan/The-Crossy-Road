import { Bounds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { DirectionalLight as DirectionalLightType, Group } from "three";
import { usePlayerAnimation } from "@/hooks/usePlayerAnimation";
import { useThree } from "@react-three/fiber";
import { DirectionalLight } from "../DirectionalLight";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";

export const Player = () => {
  const playerRef = useRef<Group>(null);
  const lightRef = useRef<DirectionalLightType>(null);
  const camera = useThree((state) => state.camera);
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);
  const lastRespawnAt = useGameStore((state) => state.lastRespawnAt);
  const tickRespawnExpiry = useGameStore((state) => state.tickRespawnExpiry);
  usePlayerAnimation({ ref: playerRef });

  useFrame(() => {
    tickRespawnExpiry();
  });

  useEffect(() => {
    if(!playerRef.current) return;
    if(!lightRef.current) return;
    playerRef.current.add(camera);
    lightRef.current.target = playerRef.current;
    setPlayerRef(playerRef.current);
  }, [camera, setPlayerRef]);

  const showBubble = lastRespawnAt !== null;

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={playerRef}>
        <group>
        <mesh position={[0, 0, 11]} castShadow receiveShadow>
          <boxGeometry args={[15, 15, 20]} />
          <meshLambertMaterial color="white" flatShading />
        </mesh>
        <mesh position={[0, 0, 11]} castShadow receiveShadow position-z={22} rotation-x={Math.PI / 2}>
          <torusGeometry args={[3, 1, 16, 15]} />
          <meshLambertMaterial color={0xf0619a} flatShading />
        </mesh>
        </group>
        {showBubble && (
          <mesh position={[0, 0, 12]}>
            <sphereGeometry args={[24, 32, 32]} />
            <meshPhysicalMaterial
              color={0x22c55e}
              transparent
              opacity={0.2}
              roughness={0.2}
              metalness={0}
            />
          </mesh>
        )}
        <DirectionalLight ref={lightRef} />
      </group>
    </Bounds>
  );
};
