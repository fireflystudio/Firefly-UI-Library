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
    { name: "columns", type: "{ title: string; links: { label; href?; prefetch?; links? }[] }[]", description: "Link columns; a link with `links` renders as a disclosure (Policies → Terms, Privacy, Cookie policy)." },
    { name: "tagline", type: "string", description: "One short sentence under the brand (18 / 20 / 24px)." },
    { name: "brand", type: "ReactNode", default: "light tile + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "signup", type: "{ label; placeholder?; confirmation?; buttonLabel?; onSubmit? } | null", default: '{ label: "Sign up for updates" }', description: "Email form. null hides it." },
    { name: "legal", type: "string", description: "Bottom line, e.g. “© 2026 Brand”." },
    { name: "legalLinks", type: "{ label; href }[]", description: "Small links on the bottom line." },
  ],
  changelog: [{ version: "1.3", date: "2026-10-20", notes: "Smaller, unified text: column links 16/17px (was 20), Policies sub-links 15/16px, e-mail field 16/17px (was 20/24); label 12px unchanged." }, { version: "1.2", date: "2026-10-20", notes: "Same file as Footer v1.4: nested Policies disclosure, 360px sign-up column." }, { version: "1.0", date: "2026-10-19", notes: "Catalogue entry for the light tone of Footer v1 (same source file)." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Same file as Footer v1.3: hairline, then 64px above and below the content on every breakpoint, tagline 20/18/17." }],
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
