import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {
  convertHourStringToMinutes,
  convertMinutesToHoursString,
} from "./utils/date";

import { Game } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      _count: {
        select: { ads: true },
      },
      name: true,
      bannerUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(games);
});

app.post("/games", async (req, res) => {
  const { body: dto } = req;

  const game = await prisma.game.create({
    data: {
      ...dto,
    } as Game,
  });

  res.status(201).json(game);
});

app.get("/games/:id/ads", async (req, res) => {
  const { id: gameId } = req.params;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHoursString(ad.hourStart),
      hourEnd: convertMinutesToHoursString(ad.hourEnd),
    }))
  );
});

app.post("/games/:id/ads", async (req, res) => {
  const { id: gameId } = req.params;
  const { body: dto } = req;

  const ad = await prisma.ad.create({
    data: {
      ...dto,
      gameId,
      weekDays: dto.weekDays.join(","),
      hourStart: convertHourStringToMinutes(dto.hourStart),
      hourEnd: convertHourStringToMinutes(dto.hourEnd),
    },
  });

  res.status(201).json(ad);
});

app.get("/ads/:id/discord", async (req, res) => {
  const { id } = req.params;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id,
    },
  });

  res.json(ad);
});

app.listen(8090, () => {
  console.log("Server started on port 8090");
});
