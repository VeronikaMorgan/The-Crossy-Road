import { tv } from "tailwind-variants";
import { usePlayerStore } from "@/stores/playerStore";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { useKeyboardEvents } from "@/hooks/useKeyboardEvents";

const controls = tv({
  slots: {
    container: "flex flex-col items-center gap-2 p-4 absolute bottom-0 transform -translate-x-1/2 left-1/2",
    button: [
      "flex items-center justify-center cursor-pointer",
      "w-12 h-12 rounded-lg",
      "bg-gray-800 text-white",
      "border border-gray-700",
      "transition-all duration-200",
      "hover:bg-gray-700 hover:border-gray-600",
      "active:bg-gray-900 active:scale-95",
      "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    icon: "text-xl",
  },
});

const { container, button, icon } = controls();

export const Controls = () => {
  useKeyboardEvents();
  const queueMovement = usePlayerStore((state) => state.queueMovement);
  
  return (
    <div className={container()}>
      <button
        className={button()}
        onClick={() => queueMovement("forward")}
        aria-label="Move forward"
      >
        <IoIosArrowUp className={icon()} />
      </button>
      <div className="flex gap-2">
        <button
          className={button()}
          onClick={() => queueMovement("left")}
          aria-label="Move left"
        >
          <IoIosArrowBack className={icon()} />
        </button>
        <button
          className={button()}
          onClick={() => queueMovement("backward")}
          aria-label="Move backward"
        >
          <IoIosArrowDown className={icon()} />
        </button>
        <button
          className={button()}
          onClick={() => queueMovement("right")}
          aria-label="Move right"
        >
          <IoIosArrowForward className={icon()} />
        </button>
      </div>
    </div>
  );
};
