import type { ReactNode } from "react";
import { HeroCta, type CtaLink } from "@/components/ui/hero-cta";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CtaDemoPillProps = {
  /** Section id (anchor) */
  id?: string;
  /** Dark closing section (default) or the light page background */
  tone?: "dark" | "light";
  /** Small bordered mono pill above the heading. Default none. */
  tag?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** One or two short sentences under the heading */
  body?: string;
  /** Dark (or white on dark) primary pill */
  primaryCta?: CtaLink;
  /** Ghost secondary pill. null hides it. */
  secondaryCta?: CtaLink | null;
  /** Small muted line under the buttons, e.g. "No credit card · Cancel anytime" */
  note?: string;
  /** Optional visual below the buttons (a product shot). Clipped in a rounded frame, drifts 30px on scroll. Default none. */
  visual?: ReactNode;
  className?: string;
};

const TONES = {
  dark: {
    section: "bg-surface-dark text-text-on-dark",
    tag: "border-border-on-dark text-text-on-dark/70",
    body: "text-text-on-dark/60",
    note: "text-text-on-dark/60",
    frame: "border-border-on-dark bg-surface-card-dark",
  },
  light: {
    section: "bg-surface-page text-text-primary",
    tag: "border-border-10 text-text-tertiary",
    body: "text-text-nav",
    note: "text-text-nav",
    frame: "border-border-light bg-surface-primary",
  },
} as const;

/**
 * CTA Demo Pill v1
 * Centred closing call to action: a small mono pill tag, a two-tone statement heading (30/40/48px),
 * a short body, the house CTA pair (primary + ghost) and a small note. An optional visual sits
 * below in a rounded, clipped frame with a 30px parallax. `tone` switches between the dark
 * section and the light page background. Section padding 64/96/120px.
 */
export function CtaDemoPill({
  id = "cta",
  tone = "dark",
  tag,
  headline,
  headlineMuted,
  body,
  primaryCta,
  secondaryCta,
  note,
  visual,
  className = "",
}: CtaDemoPillProps) {
  const t = TONES[tone];
  const headingId = `${id}-heading`;
  const onDark = tone === "dark";

  return (
    <section id={id} aria-labelledby={headingId} className={`${t.section} overflow-clip px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex w-full max-w-content flex-col items-center text-center">
        {tag ? (
          <p
            {...reveal}
            className={`mb-6 inline-flex h-7 items-center rounded-pill border px-3 font-mono text-[12px] font-normal uppercase leading-none tracking-[0.08em] md:mb-8 ${t.tag}`}
          >
            {tag}
          </p>
        ) : null}

        <h2
          {...reveal}
          id={headingId}
          className="max-w-[1000px] text-balance text-[30px] font-normal leading-[1.1] tracking-[-0.025em] md:text-[40px] xl:text-[48px]"
        >
          <TwoTone text={headline} muted={headlineMuted} onDark={onDark} />
        </h2>

        {body ? (
          <p {...reveal} className={`mt-4 max-w-[600px] text-pretty text-[17px] font-normal leading-[1.4] tracking-[-0.01em] md:mt-5 md:text-[18px] xl:text-[20px] ${t.body}`}>
            {body}
          </p>
        ) : null}

        <div {...reveal} className="mt-8 md:mt-10">
          <HeroCta primary={primaryCta} secondary={secondaryCta} onDark={onDark} className="justify-center" />
        </div>

        {note ? (
          <p {...reveal} className={`mt-4 text-balance text-[13px] font-normal leading-[normal] md:text-[14px] ${t.note}`}>
            {note}
          </p>
        ) : null}

        {visual ? (
          <div {...reveal} className="mt-10 w-full max-w-[960px] md:mt-14 xl:mt-16">
            <Parallax distance={30}>
              <div className={`overflow-clip rounded-frame border ${t.frame}`}>{visual}</div>
            </Parallax>
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
