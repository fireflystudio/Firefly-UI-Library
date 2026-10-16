"use client";

import { inView } from "motion";
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-triggered reveal (fade + slight rise), fired once at ~20% in view.
 *
 * <Reveal> is a container. It reveals every descendant marked with `data-reveal`
 * (use <RevealItem> or spread `reveal` from ./reveal-attr), staggering them in DOM order.
 * Spread `reveal` on the <Reveal> itself to animate it too.
 *
 * Content is visible without JS / with reduced motion: the hidden state is only applied
 * under `html.motion-ok` (see firefly.css + <MotionScript> in the layout head).
 */
type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** ms between staggered children (default 90) */
  stagger?: number;
  /** ms before the first child */
  delay?: number;
  /** fraction of the element that must be visible (default 0.2) */
  amount?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  stagger = 90,
  delay = 0,
  amount = 0.2,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    document.documentElement.dataset.revealReady = "";

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const targets = root.hasAttribute("data-reveal") ? [root, ...items] : items;
    targets.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${delay + i * stagger}ms`);
    });

    return inView(
      root,
      () => {
        targets.forEach((el) => el.setAttribute("data-in", ""));
      },
      { amount }
    );
  }, [amount, delay, stagger]);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}

export function RevealItem<T extends ElementType = "div">({
  as,
  children,
  ...rest
}: { as?: T; children?: ReactNode } & Omit<ComponentPropsWithoutRef<T>, "as" | "children">) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}
