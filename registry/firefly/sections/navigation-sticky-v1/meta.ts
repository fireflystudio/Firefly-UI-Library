import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "navigation-sticky-v1",
  name: "Navigation Sticky",
  version: 1,
  category: "navigation",
  description:
    "Fixed 64px header styled after the ElevenLabs bar: brand, 14px links in pills that fill grey on hover, an optional white Log in pill and the primary pill. Turns translucent with a hairline after a few pixels of scroll; on mobile a round hamburger opens a simple panel.",
  interactions: [
    "Hover a link: a soft grey pill fills behind it.",
    "Scroll inside the frame: the bar blurs and gains a hairline.",
    "Switch to Mobile and tap the hamburger.",
  ],
  props: [
    { name: "links", type: "{ label: string; href: string }[]", description: "Text links shown on tablet/desktop and in the mobile panel." },
    { name: "brand", type: "ReactNode", default: "neutral mark + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "brandLabel", type: "string", default: '"Home"', description: "Accessible name of the brand link." },
    { name: "brandHref", type: "string", default: '"/"', description: "Where the brand links to." },
    { name: "cta", type: "{ label; href } | null", default: "Join waitlist → #cta", description: "Primary pill on the right. null hides it." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "null", description: "White secondary pill before the primary one (e.g. Log in). Hidden on phones." },
    { name: "activeHref", type: "string", default: "current pathname", description: "Marks the matching link with aria-current." },
    { name: "className", type: "string", description: "Extra classes on the <header>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-16", notes: "First release: scroll compaction, active link, mobile panel." },
    { version: "1.1", date: "2026-10-19", notes: "Restyled 1:1 after the ElevenLabs bar: 64px, 14px regular links in 36px pills with a grey hover fill (Base NavLink), secondary + primary 36px pills, round hamburger, no scroll compaction." },
  ],
  files: [
    {
      path: "registry/firefly/sections/navigation-sticky-v1/navigation-sticky-v1.tsx",
      target: "components/sections/navigation-sticky-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  previewScroll: true,
  previewDevice: 834,
  order: 10,
};
