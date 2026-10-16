import Image from "next/image";
import { HeroSplit } from "./hero-split-v1";

/**
 * Final example: the Startupmap /investors hero. Copy from the live site; the "Pipeline · 48 decks"
 * window is an HTML mockup there, so it is shown as a 2x screenshot of the real frame (780×680).
 */
export default function Example() {
  return (
    <HeroSplit
      headline="Automated due diligence"
      headlineMuted="for startup investors."
      body="Startupmap reads every deck, founder and round before you do, and writes the memo your partners actually read."
      primaryCta={{ label: "Join waitlist", href: "#cta" }}
      secondaryCta={{ label: "Book a demo", href: "#cta" }}
      visualRatio="780 / 680"
      visual={
        <Image
          src="/images/examples/hero-split-v1/pipeline-visual.png"
          alt="Startupmap pipeline, 48 decks this week: a table of companies with round, verdict and reason. Meridian Pay, €4M seed: Pass, Weak moat, 9% churn. Kielo, €1.5M pre-seed: Meet, Repeat founder, 2 exits. Fjordbank, €6M seed: Pass, Pricing unclear. Aster Ledger, €3M seed: Meet, Clean data room, 22% MoM. Northline, €2M pre-seed: Pass, Market too small at seed. Halo Credit, €5M seed: Hold, Unit economics need a look. Lumen Health, €2.5M seed: Meet, Regulatory moat, strong CTO."
          fill
          priority
          sizes="(min-width: 1280px) 745px, (min-width: 768px) 50vw, calc(100vw - 40px)"
          className="object-cover"
        />
      }
    />
  );
}
