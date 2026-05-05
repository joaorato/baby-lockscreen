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

/** 
* Weekly development messages
 */
const WEEKLY_MESSAGES: Record<number, string[]> = {
  4: [
    "Your baby is now implanted and beginning to form the placenta 🌱",
    "The foundations of the brain and spinal cord are forming 🧠",
    "Your baby is smaller than a grain of rice but growing fast",
    "Hormones are surging. Mom is doing something incredible 💛",
    "The amniotic sac is forming to protect your baby",
  ],
  5: [
    "Your baby’s heart is beginning to form ❤️",
    "Tiny structures that will become arms and legs are appearing 🦵",
    "Major organs are starting their development",
    "Your baby has a primitive circulatory system",
    "The brain is dividing into important sections 🧠",
  ],
  6: [
    "Your baby’s heart may already be beating 💓",
    "Facial features are beginning to take shape 🙂",
    "The neural tube is closing, crucial brain development happening 🧠",
    "Tiny buds will soon become hands and feet ✋",
    "Your baby is growing rapidly day by day ⚡",
  ],
  7: [
    "Your baby is growing a little tail, but it will disappear soon!",
    "Hands and feet are forming tiny paddles ✋",
    "The brain is growing rapidly ⚡",
    "Your baby’s face is becoming more recognizable",
    "Early muscle development has begun 💪",
  ],
  8: [
    "All major organs are now present, though still developing",
    "Tiny fingers are starting to separate 👶",
    "Your baby is starting to move, even if you can’t feel it yet",
    "The heart is beating steadily and growing stronger 💓",
    "Mom is amazing! This is a huge milestone week 💖",
  ],
  12: [
    "Your baby has developed reflexes and may respond to touch",
    "Facial features are now more defined 🙂",
    "Your baby can open and close their mouth",
    "The digestive system is continuing to mature",
    "Mom is amazing! The first trimester is almost complete 💛",
  ],
  16: [
    "Your baby can make facial expressions now 😮",
    "Bones are becoming harder and stronger 🦴",
    "Your baby is practicing little movements 💫",
    "The nervous system is becoming more coordinated",
    "Tiny nails are starting to grow 💅",
    "Mom is doing an incredible job! Keep nourishing that body 🥗",
  ],
  20: [
    "You may feel your baby move... hello kicks! 🦵",
    "Your baby can hear sounds from the outside world 🎵",
    "A big milestone: halfway there! 🎉",
    "Your baby is developing a regular sleep cycle 😴",
    "Hair may begin growing on the scalp",
    "Remember mom, drink water! 💧",
    "Your baby is growing rapidly, about 10x in size since week 12!",
  ],
  24: [
    "Your baby’s lungs are developing air sacs 🫁",
    "The brain is growing quickly and becoming more complex 🧠",
    "Your baby is responding to voices 💬",
    "The skin is still thin and translucent",
    "Your baby is gaining weight steadily",
    "Mom is doing an amazing job! Keep taking care of yourself 💛",
    "Water is your best friend now, stay hydrated! 💧",
  ],
  28: [
    "Your baby can open and close their eyes 👀",
    "The brain is developing folds and grooves 🧠",
    "Your baby is storing fat to regulate temperature",
    "Almost in the final stretch! Mom is incredible ✨",
    "Your baby can recognize familiar voices 💛",
    "Drink water and rest when you can. You’re doing something amazing! 💧",
  ],
  32: [
    "Your baby is practicing breathing movements 🌬️",
    "Fat is accumulating to help regulate body temperature",
    "Your baby is settling into a head-down position",
    "Bones are fully developed but still soft",
    "The immune system is continuing to mature",
    "Mom, you’re doing an incredible job! The finish line is in sight 💛",
  ],
  36: [
    "Your baby is considered full term very soon 🎉",
    "Organs are almost fully mature",
    "Your baby is gaining weight rapidly now",
    "Your body is preparing for birth. You’re doing amazing 💛",
    "Your baby is running out of room and movements may feel stronger",
  ],
  37: [
    "Your baby is now early term, almost ready to meet you! 🎉",
    "Lungs are nearly mature and ready for the first breath 🫁",
    "Your baby is practicing sucking and swallowing",
    "The finishing touches are being put on that little brain 🧠",
    "Pack your hospital bag if you haven’t already! 🧳",
    "Your baby could arrive any day now, how exciting! ✨",
  ],
  38: [
    "Your baby is officially full term! 🥳",
    "All organs are ready to function on their own",
    "Your baby has a firm grasp, ready to hold your finger 🤝",
    "The last bits of fat are being added for those adorable chubby cheeks",
    "You’re so close! You’ve done an incredible job, mom 💛",
    "Pack your hospital bag if you haven’t already! 🧳",
    "Your baby is just waiting for the perfect moment to arrive ✨",
  ],
  39: [
    "Any day now, your baby is ready! 🎉",
    "Your baby’s chest is stocking up on surfactant for that first big breath",
    "New neural connections are forming every single second 🧠",
    "You’ve been incredible throughout this journey 💛",
    "Soon you’ll hold your baby for the first time. Imagine that moment 🥹",
    "Rest up, you’re about to begin the greatest adventure of your life ✨",
    "Pack your hospital bag if you haven’t already! 🧳",
  ],
  40: [
    "This is it, your due date week! 🎉🎉🎉",
    "Your baby is fully developed and ready to say hello 👋",
    "Trust your body, it knows exactly what to do 💪",
    "The wait is almost over. Soon you’ll be holding your little one 🥹",
    "You’ve grown a whole human being. That’s beyond amazing 💛",
    "Take deep breaths, you’re about to meet the love of your life ✨",
    "Every moment now brings you closer to your baby 💕",
  ],
  41: [
    "Your baby is taking their sweet time. Patience, you’re doing great 💛",
    "Many healthy babies arrive after 40 weeks, no rush!",
    "Your baby is still growing and getting even cuter in there 😊",
    "Extra time means extra snuggles to look forward to ✨",
    "Stay in touch with your doctor. Everything is going to be wonderful 🩺",
    "Your baby will come when they’re ready, hang in there! 💪",
    "Almost there! The best is yet to come 🌟",
  ],
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

function possessive(name: string) {
  if (name.toLowerCase().endsWith("s")) return `${name}'`;
  return `${name}'s`;
}

function getMessageForWeek(week: number, elapsedDays: number) {
  const messages =
    WEEKLY_MESSAGES[week] ??
    WEEKLY_MESSAGES[Math.max(...Object.keys(WEEKLY_MESSAGES).map(Number).filter(w => w <= week))];

  if (!messages || messages.length === 0) {
    return "Your baby is growing beautifully today 🌸";
  }

  return messages[elapsedDays % messages.length];
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
  const clampedWeek = Math.min(Math.max(week, 0), 42);
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
            {`Week ${clampedWeek} · Day ${dayInWeek}`}
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
