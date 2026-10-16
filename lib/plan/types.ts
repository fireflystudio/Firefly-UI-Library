import { z } from "zod";

/** Orientation of a generated image; mapped to a concrete size by the image API */
export const OrientationSchema = z.enum(["landscape", "portrait", "square"]);

/** One image slot in a section: the prompt the model wrote plus, once generated, where the file lives */
export const PlanImageSchema = z.object({
  /** Slot name inside the component: "visual", "lead", "avatar", "before", "after" or "items.N" */
  slot: z.string(),
  /** Scene description (the cinematic style is appended by the image API) */
  prompt: z.string(),
  alt: z.string(),
  orientation: OrientationSchema,
  /** Set by the client after generation: "idb:<key>" (IndexedDB) or a URL */
  src: z.string().optional(),
});
export type PlanImage = z.infer<typeof PlanImageSchema>;

const Link = z.object({ label: z.string() });
const Item = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
  value: z.string().optional(),
  label: z.string().optional(),
  question: z.string().optional(),
  answer: z.string().optional(),
  kicker: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  dek: z.string().optional(),
  tone: z.enum(["photo", "dark", "light"]).optional(),
});

/** Content a section can carry. Which fields matter depends on the component (see catalogue-schema.ts). */
export const SectionPropsSchema = z.object({
  headline: z.string().optional(),
  headlineMuted: z.string().optional(),
  intro: z.string().optional(),
  body: z.string().optional(),
  note: z.string().optional(),
  tag: z.string().optional(),
  tagline: z.string().optional(),
  label: z.string().optional(),
  tone: z.enum(["dark", "light"]).optional(),
  quote: z.string().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
  items: z.array(Item).optional(),
  steps: z.array(Item).optional(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  statQuote: z.object({ text: z.string(), author: z.string(), role: z.string().optional() }).optional(),
  lead: z.object({ kicker: z.string().optional(), title: z.string(), dek: z.string().optional() }).optional(),
  links: z.array(Link).optional(),
  secondaryLink: Link.optional(),
  groups: z.array(z.object({ title: z.string(), links: z.array(Link) })).optional(),
  columns: z.array(z.object({ title: z.string(), links: z.array(Link) })).optional(),
  logos: z.array(z.string()).optional(),
  primaryCta: Link.optional(),
  secondaryCta: Link.nullable().optional(),
  cta: Link.nullable().optional(),
  footerText: z.string().optional(),
  beforeLabel: z.string().optional(),
  afterLabel: z.string().optional(),
  before: z.object({ title: z.string().optional(), points: z.array(z.string()) }).optional(),
  after: z.object({ title: z.string().optional(), points: z.array(z.string()) }).optional(),
  placeholder: z.string().optional(),
  buttonLabel: z.string().optional(),
  confirmation: z.string().optional(),
  privacyNote: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  signup: z.object({ label: z.string(), placeholder: z.string().optional(), confirmation: z.string().optional() }).nullable().optional(),
  legal: z.string().optional(),
});
export type SectionProps = z.infer<typeof SectionPropsSchema>;

export const PlanSectionSchema = z.object({
  /** Stable id for reordering; the client assigns it when missing */
  id: z.string().optional(),
  /** Registry id, e.g. "hero-split-v1" */
  component: z.string(),
  /** Why this section is here (one short sentence, shown in the builder) */
  reason: z.string().optional(),
  /** Content. Missing = render the component's wireframe preview. */
  props: SectionPropsSchema.optional(),
  images: z.array(PlanImageSchema).optional(),
});
export type PlanSection = z.infer<typeof PlanSectionSchema>;

export const SitePlanSchema = z.object({
  title: z.string(),
  summary: z.string(),
  /** Language of the copy, e.g. "pl" or "en" */
  language: z.string().optional(),
  sections: z.array(PlanSectionSchema),
});
export type SitePlan = z.infer<typeof SitePlanSchema>;

/** What the plan API returns */
export const PlanResponseSchema = z.object({
  reply: z.string(),
  plan: SitePlanSchema,
});
export type PlanResponse = z.infer<typeof PlanResponseSchema>;

export type ChatMessage = { role: "user" | "assistant"; content: string };
