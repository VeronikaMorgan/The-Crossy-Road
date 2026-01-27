import { usePlayerStore } from "@/stores/playerStore";
import { useEffect } from "react";

export const useKeyboardEvents = () => {
    const queueMovement = usePlayerStore((state) => state.queueMovement);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    queueMovement("forward");
                    break;
                case "ArrowDown":
                    queueMovement("backward");
                    break;
                case "ArrowLeft":
                    queueMovement("left");
                    break;
                case "ArrowRight":
                    queueMovement("right");
                    break;
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [queueMovement]);
}