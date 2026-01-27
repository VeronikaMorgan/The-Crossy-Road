import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

type WheelProps = {
  positionX: number;
};

export const Wheel = ({ positionX }: WheelProps) => {
  const meshRef = useRef<Mesh>(null);
  const rotationAngle = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = 2;
      rotationAngle.current += speed * delta;
      meshRef.current.rotation.y = rotationAngle.current;
    }
  });

  return (
    <mesh ref={meshRef} position={[positionX, 0, 6]} >
      <boxGeometry args={[12, 33, 12]} />
      <meshLambertMaterial color={0x333333} flatShading />
    </mesh>
  );
};
