"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next"

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
  const [baby, setBaby] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [from, setFrom] = useState("");
  const [series, setSeries] = useState<keyof typeof IPHONE_MODELS>("iPhone 15");
  const [model, setModel] = useState<keyof (typeof IPHONE_MODELS)["iPhone 15"]>("iPhone 15 Pro");

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
  const [showUrlBox, setShowUrlBox] = useState(true);

  async function copyUrl() {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Hide the box if we're within 200px of the bottom
      setShowUrlBox(scrollPosition < documentHeight - 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-10 text-zinc-100">
      <h1 className="relative z-10 mb-8 text-center text-4xl font-semibold tracking-tight">
        Baby Lock Screen Generator
      </h1>
      <div className="pointer-events-none absolute -inset-40 animate-[spin_40s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(236,72,153,0.15),rgba(59,130,246,0.15),rgba(16,185,129,0.15),rgba(236,72,153,0.15))] blur-3xl"></div>
      <div className="relative mx-auto flex flex-col lg:flex-row items-start gap-10 max-w-6xl">
        {/* Glass panel */}
        <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 gap-6 auto-rows-min">
            <div>
              <label className="block text-sm font-medium">Baby name</label>
              <input
                value={baby}
                onChange={(e) => setBaby(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                placeholder="Your baby"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Due date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full box-border appearance-none rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">From (optional)</label>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                placeholder="Mom & Dad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">iPhone</label>

              <div className="mt-2 space-y-2">
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
          <footer className="mt-6 text-sm text-zinc-400 space-x-2">
            <span>made by <a href="https://github.com/joaorato" className="underline hover:text-white">joaorato</a></span>
            <span>· inspired by <a href="https://thelifecalendar.com" className="underline hover:text-white">thelifecalendar.com</a></span>
          </footer>
        </div>
        {/* Preview panel */}
        <div className="flex-1 flex justify-center items-start mt-6 lg:mt-0">
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

      {showUrlBox && (
        <div className="fixed bottom-6 left-1/2 z-50 w-11/12 max-w-3xl -translate-x-1/2">
          <div className="w-full">
            <label className="block text-sm font-medium">Generated URL</label>
            <div className="mt-2 relative group">
              <code className="block w-full break-all rounded-xl border border-white/10 bg-black/40 p-4 pr-12 text-sm text-zinc-100 backdrop-blur">
                {fullUrl}
              </code>
              <button
                onClick={copyUrl}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white shadow-lg backdrop-blur hover:bg-white/20"
                aria-label="Copy URL"
              >
                {copied ? "✓" : "⧉"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <section className="mt-12 max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-2xl text-zinc-200">
        <h2 className="text-2xl font-semibold mb-4">How to use</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Copy the generated URL using the button above.</li>
          <li>
            Open the <a href="shortcuts://" className="underline hover:text-white">Shortcuts</a> app on your iPhone.
          </li>
          <li>Go to <strong>Automation → New Automation</strong>.</li>
          <li>Select <strong>Time of Day</strong>, set your desired time (e.g., 6:00 AM).</li>
          <li>Repeat <strong>Daily</strong> → <strong>Run Immediately</strong>, and tap <strong>Next</strong>.</li>
          <li><strong>Create New Shortcut</strong>.</li>
          <li>Add the <strong>Get Contents of URL</strong> action and paste the copied URL.</li>
          <li>Add the <strong>Set Wallpaper Photo</strong> action to update your <strong>Lock Screen</strong>.</li>
          <li>
            <strong>Important:</strong> In <strong>Set Wallpaper Photo</strong>, tap the arrow (&gt;) to show options → disable both <strong>Crop to Subject</strong> and <strong>Show Preview</strong>.
          </li>
          <li>Save the automation. Your Lock Screen will now update daily with the baby image.</li>
        </ol>
      </section>
    </div>
  );
}
