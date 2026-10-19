import type { Metadata } from "next";
import { RevealDemo } from "@/components/catalogue/design-system/demos";
import { Intro, Item, Specimen, SpecTable } from "@/components/catalogue/design-system/specimen";
import { PageHeader } from "@/components/catalogue/page-header";
import { tokenGroup } from "@/lib/design-system/tokens";

export const metadata: Metadata = { title: "Motion · Design system" };

/** Draws a cubic-bezier easing as a small curve. */
function EasingCurve({ value }: { value: string }) {
  const m = value.match(/cubic-bezier\(([^)]+)\)/);
  const [x1, y1, x2, y2] = (m ? m[1].split(",").map((n) => parseFloat(n)) : [0, 0, 1, 1]) as number[];
  const s = 100;
  const d = `M0,${s} C${x1 * s},${s - y1 * s} ${x2 * s},${s - y2 * s} ${s},0`;
  return (
    <svg width="120" height="120" viewBox="-10 -10 120 120" aria-hidden className="shrink-0">
      <rect x="0" y="0" width={s} height={s} fill="none" stroke="var(--color-border-10)" />
      <path d={d} fill="none" stroke="var(--color-text-primary)" strokeWidth="2" />
    </svg>
  );
}

export default function MotionPage() {
  const easings = tokenGroup("--ease-").flatMap((g) => g.tokens);
  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Motion" />
      <Intro>
        Only transform and opacity animate. Content fades and rises once as it scrolls into view, large visuals drift with the page, and hover
        states change colour or nudge by a few pixels. Everything respects reduced motion and renders fully without JavaScript.
      </Intro>

      <Specimen title="Reveal" note="Fade + rise 20px, 0.8s opacity / 0.9s transform with the soft ease, children staggered 90ms in DOM order, fired once at 20% in view.">
        <RevealDemo />
      </Specimen>

      <Specimen title="Easings">
        <div className="flex flex-wrap gap-8">
          {easings.map((e) => (
            <Item key={e.name} caption={`${e.name.replace("--", "")} · ${e.value}`}>
              <EasingCurve value={e.value} />
            </Item>
          ))}
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-text-nav">ease-out-soft for reveals, slides and crossfades. ease-standard for colour changes on buttons and tabs.</p>
      </Specimen>

      <Specimen title="Durations and rules">
        <SpecTable
          head={["Pattern", "Motion", "Timing"]}
          rows={[
            ["Reveal", "opacity 0 → 1, translateY 20px → 0", "0.8s / 0.9s ease-out-soft, stagger 90ms"],
            ["Parallax", "hero visual drifts down up to 60px as it leaves (exit); other visuals ±30px (through)", "scroll-linked, transform only"],
            ["Buttons, tabs", "fill colour change, no lift", "150ms ease-standard"],
            ["Cards", "lift 2 to 4px; clipped images scale to 1.03", "200ms ease-out"],
            ["Stat and list rows", "value nudges 5px right on hover", "200ms ease-out"],
            ["Links", "fade to 60% opacity", "200ms ease-out"],
            ["Sticky nav", "after 8px of scroll: translucent, hairline, scaleY 0.84 + content up 6px", "300ms ease-out"],
            ["Carousel", "cards slide and scale; the active pagination line slides", "500ms ease-out-soft / spring"],
            ["Accordion body", "fade + rise 6px", "0.45s ease-out-soft"],
            ["Reduced motion", "no reveals, no parallax, no autoplay, no transitions", "motion-reduce:transition-none"],
          ]}
        />
      </Specimen>
    </div>
  );
}
