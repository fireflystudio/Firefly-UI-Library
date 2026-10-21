import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "navigation-sticky-v1",
  name: "Navigation Sticky",
  version: 1,
  category: "navigation",
  description:
    "Fixed 64px header styled after the ElevenLabs bar: brand, 14px links in pills that fill grey on hover, an optional white Log in pill and the primary pill. Turns translucent with a hairline after a few pixels of scroll; on mobile a round hamburger opens a simple panel.",
  interactions: [
    "Hover or focus the first link: a full-width dropdown card rises in under the bar (link columns + picture tiles); Escape or moving away closes it.",
    "Hover a link: a soft grey pill fills behind it.",
    "Scroll inside the frame: the bar blurs and gains a hairline.",
    "Switch to Mobile and tap the hamburger.",
  ],
  props: [
    { name: "links", type: "{ label: string; href: string; prefetch?: boolean; menu?: NavMenu }[]", description: "Text links next to the brand (tablet+) and in the mobile panel." },
    { name: "links[].menu", type: "{ columns: { label; links[] }[]; features?: { label; href; image?: ReactNode }[]; label? }", description: "Optional dropdown under that link: link columns on the left, up to three 212×199 picture tiles with captions on the right (Placeholder unless `image` is passed). Opens on hover / focus from md; its links are listed under the link in the mobile panel." },
    { name: "overHero", type: "boolean", default: "false", description: "Start transparent over a hero photo with light text and a thin divider; switch to the standard bar after 8px of scroll." },
    { name: "brand", type: "ReactNode", default: "Firefly mark + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "brandLabel", type: "string", default: '"Home"', description: "Accessible name of the brand link." },
    { name: "brandHref", type: "string", default: '"/"', description: "Where the brand links to." },
    { name: "cta", type: "{ label; href } | null", default: "Join waitlist → #cta", description: "Primary pill on the right. null hides it." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "null", description: "White secondary pill before the primary one (e.g. Log in). Hidden on phones." },
    { name: "activeHref", type: "string", default: "current pathname", description: "Marks the matching link with aria-current." },
    { name: "containerClassName", type: "string", default: '"max-w-[1440px] px-5 md:px-10"', description: "Width + side padding of the bar's content, so it lines up with the site's sections." },
    { name: "className", type: "string", description: "Extra classes on the <header>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-16", notes: "First release: scroll compaction, active link, mobile panel." },
    { version: "1.1", date: "2026-10-19", notes: "Restyled 1:1 after the ElevenLabs bar: 64px, 14px regular links in 36px pills with a grey hover fill (Base NavLink), secondary + primary 36px pills, round hamburger, no scroll compaction." },
    { version: "1.2", date: "2026-10-19", notes: "Wider bar: content up to 1440px with 40px side padding (was 1328px / 64px), so the brand and CTA sit closer to the screen edges." },
    { version: "1.3", date: "2026-10-20", notes: "Parity with Navigation Centered 1.2: overHero mode (transparent over a hero photo, light text, thin divider), prefetch on links, and an optional dropdown per link (`menu`) with link columns, picture tiles, the button shadow and a soft rise-in. Used on Solve." },
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
  usedOn: ["startupmap", "solve", "verb"],
};
