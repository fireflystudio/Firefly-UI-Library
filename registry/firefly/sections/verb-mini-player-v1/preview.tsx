"use client";

import { useEffect, useState } from "react";
import { MiniPlayer } from "../verb-mobile-player-v1/verb-mobile-player-v1";

const ITEM = {
  id: "true-happiness",
  title: "The Art of True Happiness | Dr. Arthur Brooks",
  source: "Andrew Huberman",
  sourceSrc: "/images/verb-player/source-huberman.jpg",
  age: "2h",
  duration: 131,
  excerpt: "",
};

export default function Preview() {
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(32);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setT((x) => (x >= ITEM.duration ? 0 : x + 0.25)), 250);
    return () => window.clearInterval(id);
  }, [playing]);
  return (
    <div className="flex justify-center bg-surface-page px-5 py-16" style={{ "--v-accent": "#4d63fd", "--v-btn": "rgb(0 0 0 / 0.06)" } as React.CSSProperties}>
      <div className="w-full max-w-[358px]">
        <MiniPlayer item={ITEM} playing={playing} progress={t / ITEM.duration} onOpen={() => {}} onToggle={() => setPlaying((p) => !p)} onNext={() => setT(0)} canNext />
      </div>
    </div>
  );
}
