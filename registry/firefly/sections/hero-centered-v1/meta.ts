import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-centered-v1",
  name: "Hero Centered",
  version: 1,
  category: "hero",
  description:
    "Centred copy with a stacked two-tone h1, optional eyebrow and body, the dark + ghost CTA pair, and a large visual underneath. The copy reveals line by line on load; the visual follows and drifts down as it scrolls out.",
  interactions: [
    "Reload: eyebrow, headline lines, body and buttons rise in one after another; the visual follows 300ms later.",
    "Scroll down: the visual drifts down up to 60px (exit parallax).",
    "Hover a button: it lifts 1px.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second line, stacked under the first." },
    { name: "eyebrow", type: "string", description: "Small mono uppercase line above the headline." },
    { name: "body", type: "string", description: "Short paragraph under the headline. Max 120 characters: always 2 lines on tablet and desktop (560px wide). Longer text warns in dev." },
    { name: "primaryCta", type: "{ label; href }", default: "Join waitlist → #cta", description: "Dark pill." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Ghost pill. null hides it." },
    { name: "visual", type: "ReactNode", default: "<Placeholder label=\"Hero visual\" />", description: "Visual under the copy, in a clipped rounded frame. Pass your <Image fill> or mockup." },
    { name: "visualRatio", type: "string", default: '"1392 / 720"', description: "CSS aspect-ratio of the visual frame." },
    { name: "visualRatioMobile", type: "string", default: "visualRatio", description: "Taller frame below 768px, e.g. \"350 / 420\". Pair it with an art-directed <picture> so phones get their own crop." },
    { name: "id", type: "string", default: '"hero"', description: "Section id for anchor links; the heading id is <id>-heading." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-16", notes: "First release: stacked two-tone h1, staggered load reveal, exit parallax on the visual." },
    { version: "1.1", date: "2026-10-19", notes: "Optional visualRatioMobile for a taller phone crop (default look unchanged)." },
    { version: "1.2", date: "2026-10-19", notes: "Body limited to 120 characters (2 lines on tablet/desktop); dev warning when longer." },
    { version: "1.3", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Lead 20/18/17 (was 18/18/16), headline → lead 20/20/16, lead → buttons 40/40/32, copy → visual 64/56/40, bottom padding 96/80/64." },
  ],
  files: [
    {
      path: "registry/firefly/sections/hero-centered-v1/hero-centered-v1.tsx",
      target: "components/sections/hero-centered-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
  usedOn: ["startupmap"],
};
