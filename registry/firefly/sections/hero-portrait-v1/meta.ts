import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-portrait-v1",
  name: "Hero Portrait",
  version: 1,
  category: "hero",
  description:
    "Portrait visual on the left, copy on the right: a two-tone h1 that reveals word by word, a short body and the CTA pair. Full-width visual on mobile, side by side from tablet.",
  interactions: ["Reload: the headline words rise one after another; the portrait follows 300ms later.", "Scroll: the portrait drifts down (exit parallax)."],
  props: [
    { name: "headline", type: "string", description: "Primary part of the h1 (word-by-word reveal)." },
    { name: "headlineMuted", type: "string", description: "Grey second part, continues inline." },
    { name: "body", type: "string", description: "Short paragraph under the headline." },
    { name: "primaryCta", type: "{ label; href }", default: "Join waitlist → #cta", description: "Dark pill." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Ghost pill. null hides it." },
    { name: "visual", type: "ReactNode", default: '<Placeholder label="Portrait" />', description: "Visual in the left column, clipped to a rounded frame. Pass your <Image fill>." },
    { name: "visualRatio", type: "string", default: '"600 / 640"', description: "CSS aspect-ratio of the visual frame." },
    { name: "id", type: "string", default: '"hero"', description: "Section id; the heading id is <id>-heading." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release, rebuilt from the Founders hero pattern." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Display h1 64/48/34 (was 64/40/32), lead 20/18/17, headline → lead 20/20/16, lead → buttons 40/40/32, hero rhythm: top nav 64 + 120/80/56 (was nav + 32/24/20), bottom 96/80/64." }],
  usedOn: ["startupmap"],
  files: [
    {
      path: "registry/firefly/sections/hero-portrait-v1/hero-portrait-v1.tsx",
      target: "components/sections/hero-portrait-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 25,
};
