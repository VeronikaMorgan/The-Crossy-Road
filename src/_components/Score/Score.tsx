import { useGameStore } from "@/stores/gameStore";

export const Score = () => {
  const { score } = useGameStore();
  return (
    <div className="absolute bottom-4 left-4 text-white text-2xl font-bold">
      Прогресс: {score}
    </div>
  );
};
