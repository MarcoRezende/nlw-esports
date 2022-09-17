import { Input } from "./Form/Input";
import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FormEvent, useEffect, useMemo, useState } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
}

export function CreateAddModal() {
  const [game, setGame] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const weekDaysOptions = useMemo(() => {
    return [
      { value: "0", slug: "D" },
      { value: "1", slug: "S" },
      { value: "2", slug: "T" },
      { value: "3", slug: "Q" },
      { value: "4", slug: "Q" },
      { value: "5", slug: "S" },
      { value: "6", slug: "S" },
    ];
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8090/games")
      .then((response) => setGame(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:8090/games/${data.gameId}/ads`, {
        ...data,
        weekDays: weekDays.map(Number),
        yearsPlaying: Number(data.yearsPlaying),
        useVoiceChannel,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />

      <Dialog.Content className="fixed bg-[#2a2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <Input
            id="game"
            placeholder="Selecione o game que deseja jogar"
            label="Qual o game?"
          >
            <select
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue="Selecione o game que deseja jogar"
              name="gameId"
            >
              <option disabled>Selecione o game que deseja jogar</option>
              {game.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </Input>

          <Input
            id="name"
            name="name"
            placeholder="Como te chama dentro do game?"
            label="Seu nome (ou nickname)"
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              id="yearsPlaying"
              name="yearsPlaying"
              placeholder="Tudo bem ser ZERO"
              label="Joga há quantos anos?"
            />

            <Input
              id="discord"
              name="discord"
              placeholder="Usuario#0000"
              label="Qual o seu Discord?"
            />
          </div>

          <div className="flex gap-6 ">
            <ToggleGroup.Root
              className="grid grid-cols-4 gap-2"
              type="multiple"
              onValueChange={setWeekDays}
            >
              {weekDaysOptions.map(({ value, slug }) => (
                <ToggleGroup.Item
                  key={value}
                  value={value}
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes(value) ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  {slug}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>

            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold">Qual horário do dia</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={(checked) => {
                if (checked !== "indeterminate") {
                  setUseVoiceChannel(checked);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
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
  );
}
