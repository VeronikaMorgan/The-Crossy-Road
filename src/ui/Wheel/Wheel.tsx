export const Wheel = ({ positionX }: { positionX: number }) => {
  return (
    <mesh position={[positionX, 0, 6]}>
      <boxGeometry args={[12, 33, 12]} />
      <meshLambertMaterial color={0x333333} flatShading />
    </mesh>
  );
};
