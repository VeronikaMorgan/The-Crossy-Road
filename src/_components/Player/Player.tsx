import { Bounds } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { DirectionalLight as DirectionalLightType, Group } from "three";
import { usePlayerAnimation } from "@/hooks/usePlayerAnimation";
import { useThree } from "@react-three/fiber";
import { DirectionalLight } from "../DirectionalLight";
import { usePlayerStore } from "@/stores/playerStore";

export const Player = () => {
  const playerRef = useRef<Group>(null);
  const lightRef = useRef<DirectionalLightType>(null);
  const camera = useThree((state) => state.camera);
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);
  usePlayerAnimation({ ref: playerRef });

  useEffect(() => {
    if(!playerRef.current) return;
    if(!lightRef.current) return;
    playerRef.current.add(camera);
    lightRef.current.target = playerRef.current;
    setPlayerRef(playerRef.current);
  }, [camera, setPlayerRef]);


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
          {/* <axesHelper args={[50]} /> */}

        </mesh>
        </group>
        <DirectionalLight ref={lightRef} />
      </group>
    </Bounds>
  );
};
