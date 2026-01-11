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

const FIRST_TRIMESTER_MESSAGES = [
  "Your baby is growing tiny fingers and toes 👶",
  "Your baby is practicing little movements 💫",
  "A big development day today 🧠",
  "Mom is amazing! Keep it up! 💖",
  "Your baby’s heart is beating strong 💓",
  "Tiny arms and legs are starting to form 🦵🖐️",
  "Mom is amazing — your body is creating life! 💛",
  "Your baby is practicing little movements 💫",
  "Cells are multiplying at lightning speed ⚡",
];

const SECOND_TRIMESTER_MESSAGES = [
  "Your baby is getting stronger 💪",
  "So much growth happening right now 🌱",
  "Your baby is floating peacefully today 🌊",
  "Mom is amazing! You're doing great! 🌟",
  "Your baby is starting to hear sounds 🎵",
  "Little kicks are happening — can you feel them? 🦵",
  "Your baby’s facial features are becoming more distinct 🙂",
  "Mom is amazing — nurturing a growing little human! 🌱",
  "Tiny fingers and toes are developing 👶",
];

const THIRD_TRIMESTER_MESSAGES = [
  "Almost there! Your baby is growing rapidly 🚀",
  "Getting ready for the big day! 🎉",
  "Your baby is developing lungs and brain 🧠",
  "Mom is amazing! Keep shining! ✨",
  "Your baby’s lungs are getting stronger 🫁",
  "The baby is practicing breathing movements 🌬️",
  "Mom is amazing — almost time to meet your little one! 💛",
  "Your baby is dreaming in utero 🌙",
  "Your baby is getting ready for the big world 🌎",
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

function getMessageForWeek(week: number, elapsedDays: number) {
  if (week >= 0 && week <= 13) {
    const idx = elapsedDays % FIRST_TRIMESTER_MESSAGES.length;
    return FIRST_TRIMESTER_MESSAGES[idx];
  } else if (week >= 14 && week <= 27) {
    const idx = elapsedDays % SECOND_TRIMESTER_MESSAGES.length;
    return SECOND_TRIMESTER_MESSAGES[idx];
  } else if (week >= 28 && week <= 40) {
    const idx = elapsedDays % THIRD_TRIMESTER_MESSAGES.length;
    return THIRD_TRIMESTER_MESSAGES[idx];
  } else {
    return "Your baby is growing beautifully! 🌸";
  }
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

  const message = getMessageForWeek(clampedWeek, elapsedDays);
  const fruit = getFruitForWeek(clampedWeek);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          background: "radial-gradient(circle at center, #FFEBE9 0%, #edc7c9 50%, #d48970 90%)",
          fontFamily: "system-ui, -apple-system",
          padding: 60,
          color: "#333",
          paddingTop: height * 0.38, // increase this to move everything down
        }}
      >
        {/* Center Fruit + Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <div
            style={{
              fontSize: 50,
              fontWeight: 600,
              textAlign: "center",
              textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
              marginBottom: 30,
            }}
          >
            {`${babyLabel} size is about a`}
          </div>
          
          <img
            src={fruit.imageUrl}
            width={400}
            height={400}
            style={{ marginBottom: 20, borderRadius: 20 }}
          />

          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              textAlign: "center",
              textShadow: "2px 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            {fruit.name}
          </div>

          {/* Week/Day below fruit name */}
          <div
            style={{
              fontSize: 36,
              opacity: 0.7,
              marginTop: 30,
              textAlign: "center",
              textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            {`Week ${clampedWeek} · Day ${dayInWeek + 1}`}
          </div>
        </div>

        {/* Optional Bottom message */}
        {from || message ? (
          <div
            style={{
              fontSize: 32,
              textAlign: "center",
              opacity: 0.8,
              marginTop: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>{message}</div>

            {from && (
              <div style={{ marginTop: 20, fontSize: 28, opacity: 0.6 }}>
                {`— ${from}`}
              </div>
            )}
          </div>
        ) : null}
      </div>
    ),
    {
      width,
      height,
    }
  );
}
