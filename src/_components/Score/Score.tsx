import { useGameStore } from "@/stores/gameStore";
import { useMapStore } from "@/stores/mapStore";

export const Score = () => {
  const { score } = useGameStore();
  const { level, rows } = useMapStore();
  return (
    <div className="absolute bottom-4 left-4 text-black text-2xl font-bold">
      Score: {score} Level: {level} Rows: {rows.length}
    </div>
  );
};
