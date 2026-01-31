import { useGameStore } from "@/stores/gameStore";
import { Heart } from "@/ui/Heart";
import { INITIAL_LIVES } from "../constants";

export const Lives = () => {
  const lives = useGameStore((state) => state.lives);
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      {Array.from({ length: INITIAL_LIVES }, (_, i) => (
        <Heart key={i} type={i < lives ? "full" : "empty"} />
      ))}
    </div>
  );
};

