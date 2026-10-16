"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Subtle vertical parallax for large visuals (transform only).
 *
 * mode "through" (default): drifts from +distance to -distance while the element crosses
 *   the viewport. For visuals further down the page (≈30px).
 * mode "exit": starts at 0 (renders exactly in place on load) and drifts down by `distance`
 *   as the element scrolls out. For the hero visual (≈60px).
 *
 * Disabled under prefers-reduced-motion.
 */
export function Parallax({
  children,
  distance = 30,
  mode = "through",
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  mode?: "through" | "exit";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === "exit" ? ["start start", "end start"] : ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, (p) =>
    mode === "exit" ? p * distance : distance - p * 2 * distance
  );
  // The server can't know the motion preference, so the first client render matches the
  // server and the parallax is switched off right after hydration if needed.
  const [enabled, setEnabled] = useState(true);
  useEffect(() => setEnabled(!reduce), [reduce]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: enabled ? y : 0 }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
