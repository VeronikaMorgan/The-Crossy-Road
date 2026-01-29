import { TILE_SIZE } from "@/_components/constants";
import type { TreeDataType } from "@/types";

const BASE_TRUNK_HEIGHT = 20;
const BASE_TREE_HEIGHT = 50;

type ConeConfig = {
  radius: number;
  height: number;
  offset: number;
  color: number;
};

type TrunkConfig = {
  size: number;
  height: number;
  color: number;
};

const PINE_CONE_CONFIGS: ConeConfig[] = [
  { radius: 25, height: 60, offset: 10, color: 0x679436 },
  { radius: 20, height: 40, offset: 20, color: 0x71a639 },
  { radius: 15, height: 30, offset: 35, color: 0x7cb93a },
];

const PINE_TRUNK_CONFIG: TrunkConfig = {
  size: 10,
  height: BASE_TRUNK_HEIGHT,
  color: 0x7f4f24,
};

const BASIC_TREE_CONFIG = {
  crownSize: 30,
  trunkSize: 15,
  trunkHeight: BASE_TRUNK_HEIGHT,
  crownColor: 0x679436,
  trunkColor: 0x7f4f24,
};

const calculateScale = (height: number): number => height / BASE_TREE_HEIGHT;

const Trunk = ({ size, height, color }: TrunkConfig & { size: number; height: number }) => {
  return (
    <mesh position-z={height / 2} castShadow receiveShadow>
      <boxGeometry args={[size, size, height]} />
      <meshLambertMaterial color={color} flatShading />
    </mesh>
  );
};

const PineCone = ({
  radius,
  height: coneHeight,
  offset,
  color,
  baseZ,
}: ConeConfig & { baseZ: number }) => {
  return (
    <mesh
      position-z={baseZ + offset}
      castShadow
      receiveShadow
      rotation-x={Math.PI / 2}
      rotation-y={Math.PI / 4}
    >
      <coneGeometry args={[radius, coneHeight, 3, 1]} />
      <meshLambertMaterial color={color} flatShading />
    </mesh>
  );
};

const PineTree = ({ height }: { height: number }) => {
  const scale = calculateScale(height);
  const trunkHeight = PINE_TRUNK_CONFIG.height * scale;
  const trunkSize = PINE_TRUNK_CONFIG.size * scale;
  const baseZ = height / 2 + trunkHeight;

  return (
    <>
      {PINE_CONE_CONFIGS.map((config, index) => (
        <PineCone
          key={index}
          {...config}
          radius={config.radius * scale}
          height={config.height * scale}
          offset={config.offset * scale}
          baseZ={baseZ}
        />
      ))}
      <Trunk size={trunkSize} height={trunkHeight} color={PINE_TRUNK_CONFIG.color} />
    </>
  );
};

const BasicTree = ({ height }: { height: number }) => {
  const scale = calculateScale(height);
  const trunkHeight = BASIC_TREE_CONFIG.trunkHeight * scale;
  const trunkSize = BASIC_TREE_CONFIG.trunkSize * scale;
  const crownSize = BASIC_TREE_CONFIG.crownSize * scale;

  return (
    <>
      <mesh
        position-z={height / 2 + trunkHeight}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[crownSize, crownSize, height]} />
        <meshLambertMaterial color={BASIC_TREE_CONFIG.crownColor} flatShading />
      </mesh>
      <Trunk size={trunkSize} height={trunkHeight} color={BASIC_TREE_CONFIG.trunkColor} />
    </>
  );
};

const TREE_COMPONENTS = {
  pine: PineTree,
  basic: BasicTree,
} as const;

export const Tree = ({ tileIndex, height, type }: TreeDataType) => {
  const TreeComponent = TREE_COMPONENTS[type];

  return (
    <group position-x={tileIndex * TILE_SIZE}>
      <TreeComponent height={height} />
    </group>
  );
};
