import type { CatalogueItem } from "@/lib/types";

/**
 * Footer Light is the same component as Footer (footer-v1.tsx) with `tone="light"`: one source file,
 * two catalogue entries, so both looks are visible side by side and install the same file.
 */
export const meta: CatalogueItem = {
  id: "footer-light-v1",
  name: "Footer Light",
  version: 1,
  category: "footer",
  description:
    "The Footer on the page surface: ink text, light hairlines, the same brand + tagline, link columns, email sign-up and legal line. It is footer-v1 with tone=\"light\" (same file).",
  interactions: [
    "Type an email and press Enter: the confirmation appears without moving anything.",
    "Hover a link: it fades to 70%.",
  ],
  props: [
    { name: "tone", type: '"light"', default: '"light"', description: "Pass tone=\"light\" to the Footer component. Everything else is identical to Footer." },
    { name: "columns", type: "{ title: string; links: { label; href }[] }[]", description: "Link columns, each with a 12px label and 20px links." },
    { name: "tagline", type: "string", description: "One short sentence under the brand (18 / 20 / 24px)." },
    { name: "brand", type: "ReactNode", default: "light tile + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "signup", type: "{ label; placeholder?; confirmation?; buttonLabel?; onSubmit? } | null", default: '{ label: "Sign up for updates" }', description: "Email form. null hides it." },
    { name: "legal", type: "string", description: "Bottom line, e.g. “© 2026 Brand”." },
    { name: "legalLinks", type: "{ label; href }[]", description: "Small links on the bottom line." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-19", notes: "Catalogue entry for the light tone of Footer v1 (same source file)." }],
  files: [
    {
      path: "registry/firefly/sections/footer-v1/footer-v1.tsx",
      target: "components/sections/footer-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  previewAlign: "bottom",
  order: 20,
};
