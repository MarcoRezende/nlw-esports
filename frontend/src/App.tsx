import "./styles/main.css";
import logo from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAddModal } from "./components/CreateAddModal";

interface Game {
  id: number;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:8090/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1334px] mx-auto flex flex-col items-center py-20 min-h-screen">
      <img src={logo} alt="Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({ id, title, bannerUrl, _count: { ads } }) => (
          <GameBanner
            key={id}
            title={title}
            bannerUrl={bannerUrl}
            adsCount={ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner triggerComponent={Dialog.Trigger} />
        <CreateAddModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
