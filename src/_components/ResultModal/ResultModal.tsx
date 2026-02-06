import { useGameStore } from "@/stores/gameStore";
import { useInventoryStore } from "@/stores/inventoryStore";
import { useMapStore } from "@/stores/mapStore";
import { usePlayerStore } from "@/stores/playerStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialogue";
import { Button } from "@/ui/Button";

export const ResultModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { score, reset: resetGame } = useGameStore();
  const resetInventory = useInventoryStore((state) => state.reset);
  const resetMap = useMapStore((state) => state.reset);
  const resetPlayer = usePlayerStore((state) => state.reset);

  const handleRestart = () => {
    resetGame();
    resetInventory();
    resetMap();
    resetPlayer();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-3">
            Результат: {score}
          </DialogTitle>
        </DialogHeader>
        <Button
          onClick={handleRestart}
          className="w-full mt-6 bg-green hover:bg-yellow text-white font-semibold rounded-md transition-colors outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          Играть снова
        </Button>
      </DialogContent>
    </Dialog>
  );
};
