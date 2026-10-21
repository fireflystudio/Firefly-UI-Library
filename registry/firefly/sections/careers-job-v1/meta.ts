import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-job-v1",
  name: "Careers Job",
  version: 1,
  category: "careers",
  description: "A role page: back link, title, fact chips, an Apply pill that scrolls to the form, shared intro paragraphs and the role's sections (paragraphs and bullet lists) in a 760px column. Pair it with Careers Apply.",
  interactions: ["Click “Apply for this role”: the page scrolls to the #apply form.", "Each section rises in as it scrolls into view."],
  props: [
    { name: "title", type: "string", description: "Role title: the page's h1." },
    { name: "tags", type: "string[]", description: "Fact chips under the title (level, type, location)." },
    { name: "cta", type: "{ label; href } | null", default: "Apply for this role → #apply", description: "Primary pill; null hides it." },
    { name: "back", type: "{ label; href } | null", default: "All open roles → /careers", description: "Link back to the roles list; null hides it." },
    { name: "intro", type: "string[]", description: "Paragraphs shared by every role, shown above the first section." },
    { name: "sections", type: "{ title; lead?; paragraphs?; bullets? }[]", description: "About the role, What you'll do, Who you are, Requirements, Nice to have, What we offer…" },
    { name: "id", type: "string", default: '"job"', description: "Article id; section ids derive from it." },
  ],
  changelog: [{ version: "1.1", date: "2026-10-20", notes: "Role title 28/32/40 (was 30/40/48): subpage size." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  usedOn: ["startupmap", "solve", "verb"],
  files: [{ path: "registry/firefly/sections/careers-job-v1/careers-job-v1.tsx", target: "components/sections/careers-job-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 50,
};
