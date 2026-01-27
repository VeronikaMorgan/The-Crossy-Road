import { Canvas } from "@react-three/fiber";

export const Scene = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      orthographic
      shadows
      camera={{ up: [0, 0, 1], position: [200, -250, 300] }}
    >
      <ambientLight />
      {children}
    </Canvas>
  );
};
