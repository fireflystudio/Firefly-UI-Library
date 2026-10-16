import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "firefly-base",
  name: "Firefly Base",
  version: 1,
  category: "base",
  description:
    "Install this first in every site. Design tokens for Tailwind v4, the scroll-reveal system, parallax, art-scale, pill buttons, the hero CTA pair, a two-tone headline helper and a content-free visual placeholder.",
  interactions: [
    "Scroll: every block fades and rises once, staggered 90ms apart.",
    "Hover the buttons: 1px lift, press scales to 0.98.",
  ],
  props: [
    { name: "app/firefly.css", type: "stylesheet", description: "Tokens (@theme), base layer, reveal rules and marquee keyframes. Import it after Tailwind in globals.css. Change the values to a client's palette; keep the names." },
    { name: "<MotionScript />", type: "component", description: "Drop into <head> in layout.tsx. Adds html.motion-ok when JS runs and motion is allowed, with a 3s failsafe." },
    { name: "<Reveal>", type: "component", default: "stagger 90 · amount 0.2", description: "Container that reveals every descendant marked with data-reveal, in DOM order. Props: as, stagger, delay, amount." },
    { name: "reveal", type: "attribute object", description: "Spread on any element inside <Reveal> to make it a staggered child. Imported from reveal-attr (safe in Server Components)." },
    { name: "<Parallax>", type: "component", default: 'distance 30 · mode "through"', description: 'Vertical drift on scroll for large visuals. mode "exit" for the hero (starts at 0, drifts down ~60px).' },
    { name: "<ArtScale />", type: "component", default: "designWidth 1440", description: "Sets --art-scale on its parent so a 1440px composition scales up on wide screens." },
    { name: "<Button>", type: "component", default: 'variant "dark" · size "md"', description: 'Pill button. Renders a Link with href, otherwise a <button>. Variants: dark, ghost, light and ghost-dark (the last two for dark backgrounds). Sizes: sm (34px), md (43px).' },
    { name: "<HeroCta>", type: "component", default: "Join waitlist / Book a demo", description: "Dark primary + ghost secondary pill pair. Props: primary, secondary, onDark." },
    { name: "<TwoTone>", type: "component", description: "Renders a headline as primary text + muted grey second half. Props: text, muted, stack, onDark." },
    { name: "<Placeholder>", type: "component", default: 'label "Visual"', description: "Hatched stand-in for an image or mockup. Props: label, ratio, tone." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-16", notes: "First release, distilled from the Startupmap build and the Firefly Web Guide Book." },
  ],
  files: [
    { path: "registry/firefly/styles/firefly.css", target: "app/firefly.css", type: "registry:file" },
    { path: "registry/firefly/ui/motion-script.tsx", target: "components/ui/motion-script.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/reveal.tsx", target: "components/ui/reveal.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/reveal-attr.ts", target: "components/ui/reveal-attr.ts", type: "registry:ui" },
    { path: "registry/firefly/ui/parallax.tsx", target: "components/ui/parallax.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/art-scale.tsx", target: "components/ui/art-scale.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/button.tsx", target: "components/ui/button.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/hero-cta.tsx", target: "components/ui/hero-cta.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/two-tone.tsx", target: "components/ui/two-tone.tsx", type: "registry:ui" },
    { path: "registry/firefly/ui/placeholder.tsx", target: "components/ui/placeholder.tsx", type: "registry:ui" },
  ],
  dependencies: ["motion"],
  previewSize: "tall",
};
