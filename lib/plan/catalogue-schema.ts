/**
 * What the site-builder model is allowed to use: one entry per component with the content
 * fields it reads (see SectionPropsSchema) and its image slots. Keep this in sync with the
 * component props and with render.tsx.
 */
export type ImageSlot = { slot: string; orientation: "landscape" | "portrait" | "square"; hint: string; perItem?: boolean };

export type ComponentContract = {
  component: string;
  use: string;
  fields: string;
  images?: ImageSlot[];
};

export const CONTRACTS: ComponentContract[] = [
  {
    component: "navigation-sticky-v1",
    use: "Top bar for every site (always first). Compact, 3–5 links.",
    fields: "links[{label}] (3–5), primaryCta{label}",
  },
  {
    component: "navigation-slide-out-v1",
    use: "Alternative top bar with a dot-grid menu that slides out a panel; for sites with many pages.",
    fields: "links[{label}] (3–5), secondaryLink{label} (e.g. Log in), primaryCta{label}, groups[{title, links[{label}]}] (2 groups of 3)",
  },
  {
    component: "hero-centered-v1",
    use: "Opening hero with centred copy and one large product visual below. Best for product/SaaS.",
    fields: "headline, headlineMuted, body (1–2 sentences), primaryCta{label}, secondaryCta{label}",
    images: [{ slot: "visual", orientation: "landscape", hint: "large hero visual, 2:1" }],
  },
  {
    component: "hero-split-v1",
    use: "Opening hero, copy left and visual right.",
    fields: "headline, headlineMuted, body, primaryCta{label}, secondaryCta{label}, note (short mono line, optional)",
    images: [{ slot: "visual", orientation: "landscape", hint: "hero visual, 9:7" }],
  },
  {
    component: "hero-portrait-v1",
    use: "Opening hero with a portrait photo on the left and copy on the right. Best for people-centred brands.",
    fields: "headline, headlineMuted, body, primaryCta{label}, secondaryCta{label}",
    images: [{ slot: "visual", orientation: "portrait", hint: "portrait of a person in context, 15:16" }],
  },
  {
    component: "hero-news-bento-v1",
    use: "Editorial hero: one lead story card plus 3–5 small story cards. For media, newsletters, content products.",
    fields: "headline, headlineMuted, intro, lead{kicker, title, dek}, items[{kicker, title}] (3–5)",
    images: [
      { slot: "lead", orientation: "landscape", hint: "lead story image" },
      { slot: "items", orientation: "landscape", hint: "small story image, 2:1", perItem: true },
    ],
  },
  {
    component: "feature-row-interactive-v1",
    use: "Feature row: headline + 3 clickable steps on the left, a visual that swaps per step on the right.",
    fields: "headline, headlineMuted, items[{title, body}] (exactly 3)",
    images: [{ slot: "items", orientation: "landscape", hint: "one visual per step, 9:7", perItem: true }],
  },
  {
    component: "feature-row-checks-v1",
    use: "Feature row: headline + 3 check-marked benefits, one visual on the right.",
    fields: "headline, headlineMuted, items[{title, body}] (3)",
    images: [{ slot: "visual", orientation: "landscape", hint: "feature visual, 9:7" }],
  },
  {
    component: "lenses-list-v1",
    use: "Clickable list of 4–6 named qualities/criteria with a description and a portrait visual that swaps per item.",
    fields: "headline, headlineMuted, items[{name, description}] (4–6)",
    images: [{ slot: "items", orientation: "portrait", hint: "one scene per item, 4:5", perItem: true }],
  },
  {
    component: "stats-rows-v1",
    use: "Numbered or stat rows: value + title + description, hairline-separated. Good for 'how it works' or key figures.",
    fields: "headline, headlineMuted, intro, items[{value, title, description}] (3–5), cta{label} or null",
  },
  {
    component: "steps-cards-v1",
    use: "Process in a row: 3–6 numbered cards with title and short body.",
    fields: "headline, headlineMuted, intro, steps[{title, body}] (3–6)",
  },
  {
    component: "stats-grid-v1",
    use: "Dark (or light) results band: optional headline, a quote with attribution and 3–4 big numbers.",
    fields: "tone (dark|light), headline, headlineMuted, statQuote{text, author, role}, stats[{value, label}] (3–4)",
  },
  {
    component: "before-after-compare-v1",
    use: "Two panels comparing the old way and the new way, 3–5 points each.",
    fields: "headline, headlineMuted, intro, beforeLabel, afterLabel, before{title, points[]}, after{title, points[]}",
    images: [
      { slot: "before", orientation: "landscape", hint: "the old way, 4:3 (optional)" },
      { slot: "after", orientation: "landscape", hint: "the new way, 4:3 (optional)" },
    ],
  },
  {
    component: "logo-marquee-v1",
    use: "Strip of partner/customer names scrolling slowly. Use neutral invented names unless the brief names real customers.",
    fields: "label (short line above, optional), logos[] (6–8 company names)",
  },
  {
    component: "carousel-coverflow-v1",
    use: "Cover-flow carousel of 5–7 portrait cards (case studies, profiles, stories).",
    fields: "headline, headlineMuted, intro, items[{kicker, title, body}] (5–7)",
    images: [{ slot: "items", orientation: "portrait", hint: "one image per card, 4:5", perItem: true }],
  },
  {
    component: "bento-cards-v1",
    use: "Grid of 4 cards (stories, insights, guides) in photo/dark/light tones.",
    fields: "headline, headlineMuted, items[{label, title, body, tone(photo|dark|light)}] (4)",
    images: [{ slot: "items", orientation: "portrait", hint: "only for tone 'photo' cards, 7:8", perItem: true }],
  },
  {
    component: "testimonial-quote-v1",
    use: "One large customer quote with name, role and avatar.",
    fields: "tone (dark|light), quote (1–2 sentences, no quote marks), name, role",
    images: [{ slot: "avatar", orientation: "square", hint: "head-and-shoulders portrait" }],
  },
  {
    component: "faq-split-v1",
    use: "FAQ with the headline on the left and 5–6 questions on the right.",
    fields: "headline, headlineMuted, items[{question, answer}] (5–6), cta{label}",
  },
  {
    component: "faq-centered-v1",
    use: "FAQ centred, 5–6 questions, contact line at the bottom.",
    fields: "headline, headlineMuted, items[{question, answer}] (5–6), footerText, cta{label}",
  },
  {
    component: "cta-demo-pill-v1",
    use: "Closing call to action (dark or light) with the button pair and an optional product visual.",
    fields: "tone (dark|light), headline, headlineMuted, body, primaryCta{label}, secondaryCta{label} or null, note",
    images: [{ slot: "visual", orientation: "landscape", hint: "product visual, 16:9 (optional)" }],
  },
  {
    component: "cta-newsletter-v1",
    use: "Email sign-up section with a short pitch and 2–3 benefits.",
    fields: "tone (dark|light), headline, headlineMuted, body, label, placeholder, buttonLabel, confirmation, privacyNote, benefits[] (2–3)",
  },
  {
    component: "footer-v1",
    use: "Dark footer: tagline, 2–3 link columns, email sign-up, legal line (always last).",
    fields: "tagline, columns[{title, links[{label}]}] (2–3 columns of 2–4), signup{label, placeholder, confirmation} or null, legal",
  },
];

export const contractFor = (component: string) => CONTRACTS.find((c) => c.component === component);

/** Compact text version for the system prompt */
export function contractsAsText(): string {
  return CONTRACTS.map((c) => {
    const imgs = c.images?.length
      ? "\n  images: " + c.images.map((i) => `${i.slot}${i.perItem ? "[N]" : ""} (${i.orientation}; ${i.hint})`).join("; ")
      : "";
    return `- ${c.component}: ${c.use}\n  fields: ${c.fields}${imgs}`;
  }).join("\n");
}
