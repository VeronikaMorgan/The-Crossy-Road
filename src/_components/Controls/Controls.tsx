import { tv } from "tailwind-variants";
import { usePlayerStore } from "@/stores/playerStore";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";

import { useKeyboardEvents } from "@/hooks/useKeyboardEvents";
import { Button } from "@/ui/Button";

const controls = tv({
  slots: {
    container:
      "flex flex-col items-center gap-2 p-4 absolute bottom-0 transform -translate-x-1/2 left-1/2",
    icon: "text-xl",
  },
});

const { container, icon } = controls();

export const Controls = () => {
  useKeyboardEvents();
  const queueMovement = usePlayerStore((state) => state.queueMovement);

  return (
    <div className={container()}>
      <Button
        onClick={() => queueMovement("forward")}
        aria-label="Move forward"
      >
        <BiSolidUpArrow className={icon()} />
      </Button>
      <div className="flex gap-2">
        <Button onClick={() => queueMovement("left")} aria-label="Move left">
          <BiSolidLeftArrow className={icon()} />
        </Button>
        <Button
          onClick={() => queueMovement("backward")}
          aria-label="Move backward"
        >
          <BiSolidDownArrow className={icon()} />
        </Button>
        <Button onClick={() => queueMovement("right")} aria-label="Move right">
          <BiSolidRightArrow className={icon()} />
        </Button>
      </div>
    </div>
  );
};
