import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-apply-v1",
  name: "Careers Apply",
  version: 1,
  category: "careers",
  description: "Application form in a muted card: name, e-mail, phone, read-only role, resume drop zone (click or drag, size limit), cover letter, URL, location, notes and a full-width primary pill. Locks after a valid submit and confirms in a reserved status slot.",
  interactions: [
    "Submit without a resume: an inline error appears under the drop zone.",
    "Drop or pick a file: its name replaces the hint.",
    "Fill the required fields and submit: the form locks and the confirmation appears without moving anything.",
  ],
  props: [
    { name: "roleTitle", type: "string", description: "Prefilled, read-only role field; also the grey half of the headline by default." },
    { name: "headline", type: "string", default: '"Submit application"', description: "Primary part of the headline." },
    { name: "headlineMuted", type: "string", default: "for {roleTitle}", description: "Grey second half." },
    { name: "maxFileMb", type: "number", default: "25", description: "Resume size limit (checked in the browser)." },
    { name: "accept", type: "string", default: '".pdf,.doc,.docx"', description: "Accepted resume types." },
    { name: "labels", type: "Partial<CareersApplyLabels>", description: "Override any field label, the resume hint or the submit label." },
    { name: "confirmation", type: "string", default: "Thanks, your application for {role} is in…", description: "Status text after submit; {role} is replaced." },
    { name: "onSubmit", type: "(data: FormData) => void", description: "Receives the form data on a valid submit. Nothing is sent until a site wires this." },
    { name: "id", type: "string", default: '"apply"', description: "Section id (the Careers Job Apply pill links to #apply)." },
  ],
  changelog: [{ version: "1.3", date: "2026-10-20", notes: "Bottom padding 64/96/120px (top stays 32/48/60) so the space to the footer equals the space between sections." }, { version: "1.2", date: "2026-10-20", notes: "Headline 24/28/32 (was 28/32/40); headline → form 24/32px." }, { version: "1.1", date: "2026-10-20", notes: "Half section padding (32/48/60px); headline→form 40/48/56." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page). The anchor offset under a fixed nav comes from the site's global scroll-padding-top (Web Guide Book §4), not from the component." }],
  files: [{ path: "registry/firefly/sections/careers-apply-v1/careers-apply-v1.tsx", target: "components/sections/careers-apply-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 60,
};
