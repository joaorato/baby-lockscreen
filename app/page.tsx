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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-10 text-zinc-100">
      <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Baby Lock Screen Generator</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Baby name</label>
            <input
              value={baby}
              onChange={(e) => setBaby(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur"
              placeholder="Ratinho"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">From (optional)</label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur"
              placeholder="Mom & Dad"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">iPhone</label>

            <div className="mt-1 grid grid-cols-2 gap-2">
              <select
                value={series}
                onChange={(e) => {
                  const s = e.target.value as keyof typeof IPHONE_MODELS;
                  setSeries(s);
                  const firstModel = Object.keys(IPHONE_MODELS[s])[0] as any;
                  setModel(firstModel);
                }}
                className="w-full rounded border p-2"
              >
                {Object.keys(IPHONE_MODELS).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={model}
                onChange={(e) =>
                  setModel(
                    e.target.value as keyof (typeof IPHONE_MODELS)[typeof series]
                  )
                }
                className="w-full rounded border p-2"
              >
                {Object.keys(IPHONE_MODELS[series]).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              Resolution: {width} × {height}
            </p>
          </div>
        </div>

        <div>
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

        <div>
          <label className="block text-sm font-medium mb-2">Preview</label>
          {dueDate ? (
            <img
              src={relativeUrl}
              alt="Preview"
              className="w-full max-w-md rounded-2xl border border-white/10 shadow-2xl"
            />
          ) : (
            <p className="text-sm text-zinc-500">
              Set a due date to see the preview.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
