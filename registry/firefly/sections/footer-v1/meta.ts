import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "footer-v1",
  name: "Footer",
  version: 1,
  category: "footer",
  description:
    "Dark footer with a top hairline: brand and tagline, link columns and an email sign-up form with an inline confirmation. Stacked on mobile, brand and columns side by side on tablet, three columns on desktop. Optional legal line.",
  interactions: [
    "Type an email and press Enter: the confirmation appears without moving anything.",
    "Hover a link: it fades to 70%.",
    "Hover the arrow: it nudges right.",
  ],
  props: [
    { name: "columns", type: "{ title: string; links: { label; href }[] }[]", description: "Link columns, each with a 12px label and 20px links." },
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
    { name: "legal", type: "string", description: "Bottom line, e.g. “© 2026 Brand. All rights reserved.” (12px, 60%)." },
    { name: "legalLinks", type: "{ label; href }[]", description: "Small links on the bottom line." },
    { name: "className", type: "string", description: "Extra classes on the <footer>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: brand, columns, sign-up form with reserved status slot, legal line." }],
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
