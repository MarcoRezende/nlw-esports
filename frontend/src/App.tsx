import "./styles/main.css";
import logo from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./components/Form/Input";
import { GameController } from "phosphor-react";

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

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />

          <Dialog.Content className="fixed bg-[#2a2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <Input
                id="game"
                placeholder="Selecione o game que deseja jogar"
                label="Qual o game?"
              />

              <Input
                id="name"
                placeholder="Como te chama dentro do game?"
                label="Seu nome (ou nickname)"
              />

              <div className="grid grid-cols-2 gap-6">
                <Input
                  id="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                  label="Joga há quantos anos?"
                />

                <Input
                  id="discord"
                  placeholder="Usuario#0000"
                  label="Qual o seu Discord?"
                />
              </div>

              <div className="flex gap-6 ">
                <div className="grid grid-cols-4 gap-2">
                  <button className="w-8 h-8 rounded bg-zinc-900">D</button>
                  <button className="w-8 h-8 rounded bg-zinc-900">S</button>
                  <button className="w-8 h-8 rounded bg-zinc-900">T</button>
                  <button className="w-8 h-8 rounded bg-zinc-900">Q</button>
                  <button className="w-8 h-8 rounded bg-zinc-900">Q</button>
                  <button className="w-8 h-8 rounded bg-zinc-900">S</button>
                  <button className="w-8 h-8 rounded bg-zinc-900">S</button>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold">Qual horário do dia</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
