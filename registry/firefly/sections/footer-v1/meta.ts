import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "footer-v1",
  name: "Footer",
  version: 1,
  category: "footer",
  description:
    "Footer with a top hairline, dark by default or light (tone=\"light\"): brand and tagline, link columns and an email sign-up form with an inline confirmation. Stacked on mobile, brand and columns side by side on tablet, three columns on desktop.",
  interactions: [
    "Type an email and press Enter: the confirmation appears without moving anything.",
    "Hover a link: it fades to 70%.",
    "Hover the arrow: it nudges right.",
  ],
  props: [
    { name: "columns", type: "{ title: string; links: { label; href?; prefetch?; links? }[] }[]", description: "Link columns, each with a 12px label and 16/17px links. A link with `links` (e.g. Policies → Terms, Privacy, Cookie policy) renders as a disclosure that opens on hover, click or keyboard." },
    { name: "tagline", type: "string", description: "One short sentence under the brand (18 / 20 / 24px)." },
    { name: "brand", type: "ReactNode", default: "light tile + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "brandLabel", type: "string", default: '"Home"', description: "Accessible name of the brand link." },
    { name: "brandHref", type: "string", default: '"/"', description: "Where the brand links to." },
    {
      name: "signup",
      type: "{ label; placeholder?; confirmation?; buttonLabel?; onSubmit? } | null",
      default: '{ label: "Sign up for updates" }',
      description: "Email form with a labelled input and an arrow button. onSubmit receives the email; nothing is sent until a site wires it. null hides the form.",
    },
    { name: "tone", type: '"dark" | "light"', default: '"dark"', description: "Dark surface with light text (default) or the page surface with ink text and light hairlines." },
    { name: "className", type: "string", description: "Extra classes on the <footer>." },
  ],
  changelog: [{ version: "1.7", date: "2026-10-26", notes: "New containerClassName prop (default unchanged: 1440px, 40px padding) so the footer lines up with a site's sections and nav, e.g. a wide layout (TrendMD)." }, 
    { version: "1.6", date: "2026-10-20", notes: "Bottom hairline and legal line removed (house decision); bottom padding 80/96/112px instead of 64 so the footer does not end right under the form. legal / legalLinks props removed." },
    { version: "1.5", date: "2026-10-20", notes: "Smaller, unified text: column links 16/17px (was 20), Policies sub-links 15/16px, e-mail field 16/17px (was 20/24); label 12px unchanged." },
    { version: "1.4", date: "2026-10-20", notes: "Column links accept nested `links`: the item becomes a “Policies ▾” disclosure (mouse hover opens while the pointer stays; click, tap, Enter pin it open; Escape closes). Sign-up column narrowed to 360px so two link columns fit beside it." },
    { version: "1.3", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Top hairline, then 64px above and below the content on every breakpoint (was 64/48/40), tagline 20/18/17 (was 24/20/18)." },
    { version: "1.2", date: "2026-10-19", notes: "Links accept prefetch: false for pages that do not exist yet. Footer Light added as its own catalogue entry (same file)." },
    { version: "1.1", date: "2026-10-19", notes: "tone prop: light variant (page surface, ink text, light hairlines). Used in Solve." },
    { version: "1.0", date: "2026-10-16", notes: "First release: brand, columns, sign-up form with reserved status slot, legal line." },
  ],
  usedOn: ["startupmap", "solve", "verb", "trendmd"],
  files: [
    {
      path: "registry/firefly/sections/footer-v1/footer-v1.tsx",
      target: "components/sections/footer-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
  previewAlign: "bottom",
};
