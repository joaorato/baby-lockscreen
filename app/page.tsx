"use client";

import { useState } from "react";

const IPHONE_MODELS: Record<string, Record<string, { width: number; height: number }>> = {
  "iPhone Air": {
    "iPhone Air": { width: 1260, height: 2736 },
  },
  "iPhone 17": {
    "iPhone 17": { width: 1206, height: 2622 },
    "iPhone 17 Pro": { width: 1206, height: 2622 },
    "iPhone 17 Pro Max": { width: 1320, height: 2868 },
  },
  "iPhone 16": {
    "iPhone 16e": { width: 1170, height: 2532 },
    "iPhone 16": { width: 1179, height: 2556 },
    "iPhone 16 Plus": { width: 1290, height: 2796 },
    "iPhone 16 Pro": { width: 1206, height: 2622 },
    "iPhone 16 Pro Max": { width: 1320, height: 2868 },
  },
  "iPhone 15": {
    "iPhone 15": { width: 1179, height: 2556 },
    "iPhone 15 Plus": { width: 1290, height: 2796 },
    "iPhone 15 Pro": { width: 1179, height: 2556 },
    "iPhone 15 Pro Max": { width: 1290, height: 2796 },
  },
  "iPhone 14": {
    "iPhone 14": { width: 1170, height: 2532 },
    "iPhone 14 Plus": { width: 1284, height: 2778 },
    "iPhone 14 Pro": { width: 1179, height: 2556 },
    "iPhone 14 Pro Max": { width: 1290, height: 2796 },
  },
  "iPhone 13": {
    "iPhone 13 mini": { width: 1080, height: 2340 },
    "iPhone 13": { width: 1170, height: 2532 },
    "iPhone 13 Pro": { width: 1170, height: 2532 },
    "iPhone 13 Pro Max": { width: 1284, height: 2778 },
  },
  "iPhone SE (3rd gen)": {
    "iPhone SE (3rd gen)": { width: 750, height: 1334 },
  },
  "iPhone 12": {
    "iPhone 12 mini": { width: 1080, height: 2340 },
    "iPhone 12": { width: 1170, height: 2532 },
    "iPhone 12 Pro": { width: 1170, height: 2532 },
    "iPhone 12 Pro Max": { width: 1284, height: 2778 },
  },
  "iPhone 11": {
    "iPhone 11": { width: 828, height: 1792 },
    "iPhone 11 Pro": { width: 1125, height: 2436 },
    "iPhone 11 Pro Max": { width: 1242, height: 2688 },
  },
};

export default function Home() {
  const [baby, setBaby] = useState("Your baby");
  const [dueDate, setDueDate] = useState("");
  const [from, setFrom] = useState("");
  const [series, setSeries] = useState<keyof typeof IPHONE_MODELS>("iPhone 17");
  const [model, setModel] = useState<keyof (typeof IPHONE_MODELS)["iPhone 17"]>("iPhone 17 Pro");

  const { width, height } = IPHONE_MODELS[series][model];

  const params = new URLSearchParams();
  if (dueDate) params.set("due_date", dueDate);
  if (baby) params.set("baby", baby);
  if (from) params.set("from", from);
  params.set("width", String(width));
  params.set("height", String(height));

  const relativeUrl = `/api/pregnancy?${params.toString()}`;
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${relativeUrl}`
      : relativeUrl;

  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-10 text-zinc-100">
      <h1 className="relative z-10 mb-8 text-center text-4xl font-semibold tracking-tight">
        Baby Lock Screen Generator
      </h1>
      <div className="pointer-events-none absolute -inset-40 animate-[spin_40s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(236,72,153,0.15),rgba(59,130,246,0.15),rgba(16,185,129,0.15),rgba(236,72,153,0.15))] blur-3xl"></div>
      <div className="relative mx-auto max-w-3xl space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-2xl">

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 auto-rows-min">
          <div>
            <label className="block text-sm font-medium">Baby name</label>
            <input
              value={baby}
              onChange={(e) => setBaby(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500/40"
              placeholder="Ratinho"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500/40"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium">From (optional)</label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500/40"
              placeholder="Mom & Dad"
            />
          </div>

          <div className="sm:col-span-1 sm:col-start-2">
            <label className="block text-sm font-medium">Generated URL</label>
            <div className="mt-2 relative group">
              <code className="block w-full break-all rounded-xl border border-white/10 bg-black/40 p-4 pr-12 text-sm text-zinc-100 backdrop-blur">
                {fullUrl}
              </code>
              <button
                onClick={copyUrl}
                className="absolute right-3 top-3 hidden h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white shadow-lg backdrop-blur hover:bg-white/20 group-hover:flex"
                aria-label="Copy URL"
              >
                {copied ? "✓" : "⧉"}
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">iPhone</label>

            <div className="mt-2 space-y-3">
              <div className="flex flex-wrap gap-2 rounded-xl bg-white/5 p-2">
                {Object.keys(IPHONE_MODELS).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      const ss = s as keyof typeof IPHONE_MODELS;
                      setSeries(ss);
                      const firstModel = Object.keys(IPHONE_MODELS[ss])[0] as any;
                      setModel(firstModel);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-sm ${
                      s === series
                        ? "bg-white/20 text-white shadow"
                        : "text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 rounded-xl bg-white/5 p-2">
                {Object.keys(IPHONE_MODELS[series]).map((m) => (
                  <button
                    key={m}
                    onClick={() =>
                      setModel(m as keyof (typeof IPHONE_MODELS)[typeof series])
                    }
                    className={`rounded-lg px-3 py-1.5 text-sm ${
                      m === model
                        ? "bg-white/20 text-white shadow"
                        : "text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              Resolution: {width} × {height}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 flex justify-center">
        {dueDate ? (
          <img
            src={relativeUrl}
            alt="Preview"
            className="w-full max-w-sm rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(236,72,153,0.35)]"
          />
        ) : (
          <p className="text-sm text-zinc-500">
            Set a due date to see the preview.
          </p>
        )}
      </div>
    </div>
  );
}
