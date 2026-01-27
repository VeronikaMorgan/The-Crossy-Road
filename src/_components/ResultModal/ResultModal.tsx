import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useMapStore } from "@/stores/mapStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialogue";

export const ResultModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { score, reset: resetGame } = useGameStore();
  const resetPlayer = usePlayerStore((state) => state.reset);
  const resetMap = useMapStore((state) => state.reset);

  const handleRestart = () => {
    resetGame();
    resetPlayer();
    resetMap();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Result</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">Your score is {score}</p>
          <button
            onClick={handleRestart}
            className="cursor-pointer w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Restart
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
