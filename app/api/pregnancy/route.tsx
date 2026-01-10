import React from "react";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

/**
 * Pregnancy constants
 */
const GESTATION_DAYS = 280;

/**
 * Simple fruit mapping with image references
 */
const FRUIT_BY_WEEK: Record<number, { name: string; imageUrl: string }> = {
  3: { name: "Strawberry seed", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078562/strawberry_yjiben.png" },
  4: { name: "Chia seed", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078407/seeds_ie4leg.png" },
  5: { name: "Sesame seed", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078407/seeds_ie4leg.png" },
  6: { name: "Lentil", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/lentils_xfyaar.png" },
  7: { name: "Blueberry", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/blueberry_m8jbph.webp" },
  8: { name: "Raspberry", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078561/raspberry_xpzvmx.png" },
  9: { name: "Grape", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/grapes_jkg0ry.png" },
  10: { name: "Strawberry", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078562/strawberry_yjiben.png" },
  11: { name: "Fig", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/fig_z2l28i.png" },
  12: { name: "Plum", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078404/plum_egyjkj.png" },
  13: { name: "Lemon", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/lemon_geaiuc.png" },
  14: { name: "Peach", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078404/peach_dssgrr.png" },
  15: { name: "Apple", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078401/apple_smwx9p.png" },
  16: { name: "Avocado", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078401/avocado_lkeuug.png" },
  17: { name: "Pomegranate", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078404/pomegranate_qvvshd.png" },
  18: { name: "Bell pepper", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078404/bellpepper_k1h06c.png" },
  19: { name: "Mango", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/mango_kjde5p.png" },
  20: { name: "Banana", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078401/banana_hdbj8l.png" },
  21: { name: "Sweet potato", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078407/sweetpotato_gj6o86.png" },
  22: { name: "Corn", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/corn_oajlnm.png" },
  23: { name: "Grapefruit", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/grapefruit_acryvn.png" },
  24: { name: "Eggplant", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/eggplant_qg7vm0.png" },
  25: { name: "Grape cluster", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/grapes_jkg0ry.png" },
  26: { name: "Turnip", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078407/turnip_bcihmk.png" },
  27: { name: "Cauliflower", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078401/cauliflower_jbbsb3.png" },
  28: { name: "Coconut", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/coconut_aukffe.png" },
  29: { name: "Butternut squash", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/butternutsquash_o1ht3b.png" },
  30: { name: "Cabbage", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/cabbage_mn6kh9.png" },
  31: { name: "Courgette", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/courgette_sr2f8k.png" },
  32: { name: "Bunch of celery", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078401/celery_bvidlw.png" },
  33: { name: "Pineapple", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078404/pineapple_au1dcj.png" },
  34: { name: "Cantaloupe melon", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078402/cantaloupe_ivqilx.png" },
  35: { name: "Savoy cabbage", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078407/savoycabbage_oovdrp.png" },
  36: { name: "Leek", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/leek_iac3e6.png" },
  37: { name: "Papaya", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/papaya_jtthzo.png" },
  38: { name: "Melon", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078403/melon_fvysvz.png" },
  39: { name: "Pumpkin", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078405/pumpkin_toek5y.png" },
  40: { name: "Watermelon", imageUrl: "https://res.cloudinary.com/ds5mpgwi1/image/upload/v1768078407/watermelon_wlzehm.png" },
};

const DAILY_MESSAGES = [
  "Your baby is growing tiny fingers and toes 👶",
  "Your baby is practicing little movements 💫",
  "A big development day today 🧠",
  "Your baby is getting stronger 💪",
  "So much growth happening right now 🌱",
  "Your baby is floating peacefully today 🌊",
  "A quiet day of development 💛",
];

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

function possessive(name: string) {
  if (name.toLowerCase().endsWith("s")) return `${name}'`;
  return `${name}'s`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // --- Parameters (with defaults)
  const dueDateParam = searchParams.get("due_date");
  const width = Number(searchParams.get("width") ?? 1179);
  const height = Number(searchParams.get("height") ?? 2556);
  const babyName = searchParams.get("baby") ?? "Your baby";
  const from = searchParams.get("from") ?? "";

  const babyLabel = possessive(babyName);

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
  const clampedWeek = Math.min(Math.max(week, 0), 40);
  const dayInWeek = elapsedDays % 7;

  const message = DAILY_MESSAGES[dayInWeek % DAILY_MESSAGES.length];
  const fruit = getFruitForWeek(clampedWeek);

  return new ImageResponse(
    (
      <div
        style={{
          width: 500,
          height: 500, // square widget
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          fontFamily: "system-ui, -apple-system",
          padding: 20,
          textAlign: "center",
        }}
      >
        {/* Week / Day */}
        <div style={{ fontSize: 40, fontWeight: 600, marginBottom: 40, opacity: 0.5 }}>
          {`Week ${clampedWeek} · Day ${dayInWeek + 1}`}
        </div>

        <div style={{ fontSize: 32, fontWeight: 600 }}>
          {`${babyLabel} size is about a`}
        </div>

        {/* Fruit Image */}
        <img
          src={fruit.imageUrl}
          width={150} // smaller for widget
          height={150}
          style={{ marginTop: 20 }}
        />

        <div style={{ fontSize: 36, fontWeight: 700, marginTop: 5 }}>
          {fruit.name}
        </div>
      </div>
    ),
    {
      width: 500,
      height: 500,
    }
  );
}
