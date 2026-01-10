import React from "react";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

/**
 * Base URL for image references
 */
const BASE_URL = "http://localhost:3000";

/**
 * Pregnancy constants
 */
const GESTATION_DAYS = 280;

/**
 * Simple fruit mapping with image references
 */
const FRUIT_BY_WEEK: Record<number, { name: string; image: string }> = {
  3: { name: "Strawberry seed", image: "strawberry.png" },
  4: { name: "Chia seed", image: "chia.png" },
  5: { name: "Sesame seed", image: "sesame.png" },
  6: { name: "Lentil", image: "lentils.png" },
  7: { name: "Blueberry", image: "blueberry.png" },
  8: { name: "Raspberry", image: "raspberry.png" },
  9: { name: "Grape", image: "grapes.png" },
  10: { name: "Strawberry", image: "strawberry.png" },
  11: { name: "Fig", image: "fig.png" },
  12: { name: "Plum", image: "plum.png" },
  13: { name: "Lemon", image: "lemon.png" },
  14: { name: "Peach", image: "peach.png" },
  15: { name: "Apple", image: "apple.png" },
  16: { name: "Avocado", image: "avocado.png" },
  17: { name: "Pomegranate", image: "pomegranate.png" },
  18: { name: "Bell pepper", image: "bellpepper.png" },
  19: { name: "Mango", image: "mango.png" },
  20: { name: "Banana", image: "banana.png" },
  21: { name: "Sweet potato", image: "sweetpotato.png" },
  22: { name: "Corn", image: "corn.png" },
  23: { name: "Grapefruit", image: "grapefruit.png" },
  24: { name: "Eggplant", image: "eggplant.png" },
  25: { name: "Grape cluster", image: "grapes.png" },
  26: { name: "Turnip", image: "turnip.png" },
  27: { name: "Cauliflower", image: "cauliflower.png" },
  28: { name: "Coconut", image: "coconut.png" },
  29: { name: "Butternut squash", image: "butternutsquash.png" },
  30: { name: "Cabbage", image: "cabbage.png" },
  31: { name: "Courgette", image: "courgette.png" },
  32: { name: "Bunch of celery", image: "celery.png" },
  33: { name: "Pineapple", image: "pineapple.png" },
  34: { name: "Cantaloupe melon", image: "cantaloupe.png" },
  35: { name: "Savoy cabbage", image: "savoycabbage.png" },
  36: { name: "Leek", image: "leek.png" },
  37: { name: "Papaya", image: "papaya.png" },
  38: { name: "Melon", image: "melon.png" },
  39: { name: "Pumpkin", image: "pumpkin.png" },
  40: { name: "Watermelon", image: "watermelon.png" },
};

/**
 * Pick closest fruit for current week
 */
function getFruitForWeek(week: number) {
  const weeks = Object.keys(FRUIT_BY_WEEK)
    .map(Number)
    .sort((a, b) => a - b);

  let selectedWeek = weeks[0];

  for (const w of weeks) {
    if (week >= w) selectedWeek = w;
  }

  return FRUIT_BY_WEEK[selectedWeek];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // --- Parameters (with defaults)
  const dueDateParam = searchParams.get("due_date");
  const width = Number(searchParams.get("width") ?? 1179);
  const height = Number(searchParams.get("height") ?? 2556);

  if (!dueDateParam) {
    return new Response("Missing due_date parameter", { status: 400 });
  }

  const dueDate = new Date(dueDateParam);
  const startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - GESTATION_DAYS);

  const today = new Date();
  const elapsedDays = Math.max(
    0,
    Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  const week = Math.floor(elapsedDays / 7);
  const dayInWeek = elapsedDays % 7;

  const fruit = getFruitForWeek(week);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #FFF7ED, #FFE4E6)",
          fontFamily: "system-ui, -apple-system",
          padding: 80,
        }}
      >
        {/* Top */}
        <div style={{ fontSize: 48, opacity: 0.7, display: "flex", alignItems: "center", gap: 16 }}>
          {`Week ${week} · Day ${dayInWeek + 1}`}
        </div>

        {/* Center */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`${BASE_URL}/fruits/${fruit.image}`}
            width={500}
            height={500}
            style={{ marginBottom: 40 }}
          />

          <div style={{ fontSize: 64, fontWeight: 600 }}>
            {fruit.name}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            fontSize: 42,
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          Your baby is about this size today 💛
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}
