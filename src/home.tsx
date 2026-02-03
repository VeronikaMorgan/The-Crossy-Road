import { Scene } from "./_components/Scene";
import { Controls } from "./_components/Controls";
import { Inventory } from "./_components/Inventory";
import { Lives } from "./_components/Lives";
import { Map } from "./_components/Map/Map";
import { Player } from "./_components/Player/Player";
import { ResultModal } from "./_components/ResultModal/ResultModal";
import { Score } from "./_components/Score";
import { useGameStore } from "./stores/gameStore";
import { useEffect, useState } from "react";

function Home() {
  const [openResultModal, setOpenResultModal] = useState(false);
  const gameStatus = useGameStore((state) => state.status);

  useEffect(() => {
    if (gameStatus === "ended") {
      setOpenResultModal(true);
    }
  }, [gameStatus]);

  return (
    <>
      <Scene>
        {gameStatus !== "ended" && <Player />}
        <Map />
      </Scene>
      <Controls />
      <Inventory />
      <Lives />
      <Score />
      <ResultModal open={openResultModal} onOpenChange={setOpenResultModal} />
    </>
  );
}

export default Home;
