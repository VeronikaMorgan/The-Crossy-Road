import { Scene } from "./_components/Scene";
import { Player } from "./_components/Player/Player";
import { Map } from "./_components/Map/Map";
import { Controls } from "./_components/Controls";
import { Score } from "./_components/Score";
import { ResultModal } from "./_components/ResultModal/ResultModal";
import { useGameStore } from "./stores/gameStore";
import { useEffect, useState } from "react";
import { Lives } from "./_components/Lives";

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
      <Score />
      <Lives />
      <ResultModal open={openResultModal} onOpenChange={setOpenResultModal} />
    </>
  );
}

export default Home;
