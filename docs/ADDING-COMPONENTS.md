# Adding a component to the Firefly UI Library

Read this whole file before writing code. Then read the two reference implementations and copy their shape exactly:

- `registry/firefly/sections/footer-light-v1/` (a catalogue entry that reuses another folder's component file: only meta + preview + example, `files` point at footer-v1)
- `registry/firefly/sections/navigation-sticky-v1/` (client component with scroll behaviour, demo filler in the preview); `navigation-centered-v1/` shows the `overHero` pattern (bar over a photo, `tone="on-dark"` atoms)
- `registry/firefly/sections/faq-split-v1/` (accordion, two-tone headline, motion)

The house rules are the **Firefly Web Guide Book**: `../Firefly web guide book/FIREFLY-WEB-GUIDEBOOK.md`. Read it too. Sections 3–6 and 8 apply to every component.

## 1. Where things live

```
registry/firefly/sections/<id>/
  <id>.tsx      the component that ships to sites (ONE self-contained file)
  meta.ts       catalogue + registry metadata:  export const meta: CatalogueItem = { … }
  preview.tsx   default export: renders the component with placeholder content
```

- `<id>` is kebab-case `<category>-<variant>-v<N>`, e.g. `hero-split-v1`. `meta.id` must equal the folder name.
- Export the component as PascalCase **without** the version: `export function HeroSplit(props: HeroSplitProps)`. Export the props type too.
- The folder is auto-discovered. Do **not** edit `lib/`, `app/`, `components/catalogue/` or any other folder.
- The component file is copied verbatim into a site as `components/sections/<id>.tsx`, so it may only import:
  - React, `next/link`, `next/image`, `motion` / `motion/react`
  - the Base: `@/components/ui/reveal`, `@/components/ui/reveal-attr`, `@/components/ui/parallax`, `@/components/ui/art-scale`, `@/components/ui/button`, `@/components/ui/icon-button`, `@/components/ui/segmented`, `@/components/ui/pagination-dots`, `@/components/ui/hero-cta`, `@/components/ui/nav-link`, `@/components/ui/two-tone`, `@/components/ui/placeholder`, `@/components/ui/popup`
  - **never** `@/registry/...`, never another section, never `@/lib/...`.
- `preview.tsx` and `meta.ts` are not shipped: they may import `@/lib/types` and the Base.

## 2. The Base you build on (read `registry/firefly/ui/*` once)

| Import | Use |
| --- | --- |
| `Reveal`, `RevealItem` from `@/components/ui/reveal`; `reveal` from `@/components/ui/reveal-attr` | Wrap the section content in `<Reveal>`; spread `{...reveal}` on every child that should fade/rise in (headline, copy, CTA row, each card/list item, the visual). Children stagger 90ms in DOM order. `delay={300}` for a visual that follows copy. |
| `Parallax` | `<Parallax distance={30}>` around large visuals further down the page; `<Parallax distance={60} mode="exit">` around a hero visual. |
| `ArtScale` | Only for decorative compositions drawn at 1440px that must scale on wide screens. |
| `Button` | Pill buttons (ElevenLabs reference, see `/design-system/buttons`). `variant="primary" \| "secondary" \| "primary-on-dark" \| "secondary-on-dark"`, `size="sm" (36, nav) \| "md" (40, tabs) \| "lg" (44, hero/section CTAs, default)`. Regular weight, hover changes the fill only. With `href` it is a Link, otherwise a `<button>`. |
| `IconButton` + `ChevronLeft` / `ChevronRight` / `PlayIcon` / `PauseIcon` | Round icon-only button (`size="sm" (32) \| "md" \| "lg"`, same variants). Carousel arrows, pause, close. Always `aria-label`. |
| `Segmented` | Switch / tab pills with a sliding white indicator (`items`, `value`, `onChange`, `size`, `ariaLabel`). Client component. |
| `PaginationDots` | Dots + sliding active line for carousels (`count`, `index`, `onSelect`). Client component. Put it between two `IconButton`s. |
| `HeroCta` | Primary + secondary pair, 44px, 8px apart (`primary`, `secondary`, `onDark`, `size`). Use in heroes and CTAs. |
| `NavLink`, `navIconButtonClasses`, `BurgerIcon` from `@/components/ui/nav-link` | Navigation bar atoms: 14px links in 36px pills with the grey hover fill (`active` = aria-current only; `tone="on-dark"` over photos), the round 36px bar control, the two-line hamburger. |
| `TwoTone` | `<h2><TwoTone text={headline} muted={headlineMuted} /></h2>`. Every h1/h2 is two-tone. `stack` puts the grey part on its own line, `onDark` for dark sections. |
| `Placeholder` | `<Placeholder label="Image" ratio="4 / 3" tone="light" \| "dark" />`. The default for every image/mockup slot. |
| `Popup` + `CloseIcon` / `CheckIcon` | Modal shell on a native `<dialog>` (focus trap, Escape, overlay click, focus restore, scroll lock) with the overlay fade and panel rise-in. `open`, `onClose`, `labelledBy` (heading id), `width`. Mark the control to focus with `data-autofocus`. Pop-ups build on it. |

## 3. Tokens — the only colours, radii, shadows you may use

Never write a hex value, `rgb()`, or a Tailwind palette colour (`bg-gray-100`, `text-neutral-500` …). Use these utilities (and their `/opacity` variants, e.g. `text-text-on-dark/60`):

- **Text:** `text-text-primary` `text-text-secondary` `text-text-tertiary` `text-text-quaternary` `text-text-placeholder` `text-text-muted` (grey half of headlines) `text-text-nav` (muted body copy, nav links) `text-text-inverse` `text-text-on-dark`
- **Icons:** `text-icon-primary` `-secondary` `-tertiary` `-quaternary` (also `bg-icon-*` for hamburger bars)
- **Surfaces:** `bg-surface-page` (#fdfcfc page) `bg-surface-primary` (white) `bg-surface-secondary` `bg-surface-muted` `bg-surface-card-light` `bg-surface-card-dark` `bg-surface-inverse` (ink) `bg-surface-dark` (footer / dark sections)
- **Borders:** `border-border-04` `-06` `-10` `-16` `-24` `border-border-light` `border-border-dark` `border-border-on-dark` `border-border-interactive`
- **Buttons:** `bg-button-primary` `hover:bg-button-primary-hover` `text-button-content-primary` `bg-button-secondary` `hover:bg-button-secondary-hover` `text-button-content-secondary` `shadow-button` (the white-button ring + soft shadow) `bg-surface-pressed` (hover layer under inactive tabs) `bg-surface-hover` (translucent hover fill for nav links) `bg-pagination-dot` `bg-pagination-active`. Prefer the Base atoms over hand-made buttons.
- **Status tags/dots:** `text-status-positive` `bg-status-positive-bg` `text-status-negative` `bg-status-negative-bg` `text-status-warning` `bg-status-warning-bg`
- **Radii:** `rounded-chip` (6) `rounded-tile` (8) `rounded-frame` (12) `rounded-card` (14) `rounded-pill`. Do not use `rounded-l` / `rounded-s` (those are Tailwind side utilities).
- **Shadows:** `shadow-card-drop` `shadow-soft`. **Easing:** `ease-out-soft` and `var(--ease-out-soft)`. **Fonts:** `font-sans` (Inter, default) `font-mono` (IBM Plex Mono, small uppercase labels).
- **Keyframes available:** `feature-in` (body fade-in on open), `marquee-left`, `marquee-right`.

Need a colour that doesn't exist (a dark green section, a brand accent)? Expose it as a **prop with a token default** (e.g. `tone="dark"` switching between `bg-surface-dark` and `bg-surface-page`, or `className` on the section) — do not add tokens, do not hardcode.

## 4. Content-free, props for everything

- No client content. No brand names, product names, logos, people, real companies, real numbers from a client. Not "Startupmap", "investors", "founders", "deals", "diligence", "memo", "deck", "Reader", "Copilot" etc.
- Every piece of copy is a prop: `headline`, `headlineMuted`, `body`, `items`, `cta`, `eyebrow`… Required props for the main content; sensible defaults only for CTA labels (`"Join waitlist"`, `"Book a demo"`, `"Talk to us"`) and ids.
- Every image / mockup slot is a `ReactNode` prop (`visual`, `image`, `logo`) that defaults to `<Placeholder …/>`. Sites pass `next/image` or their own mockup. If the original built a product UI mockup in HTML, do **not** rebuild that mockup — the slot is a Placeholder.
- Logos in a marquee: `logos: ReactNode[]`, default = 8 neutral placeholder tiles (rounded pill with a mono word like "Logo"), content-free.
- The **preview** supplies placeholder copy: generic, plausible, short, SaaS-neutral, invented by you (not copied from Startupmap). Headlines must still split two-tone. Numbers are fine as placeholders ("2.4×", "98%", "12 min").

## 4b. No eyebrow labels (house preference, 2026-10-16)
No mono uppercase labels above headlines (section eyebrows, "tags" above a CTA heading) and no kickers above card titles — the user removed them from every preview. Keep `eyebrow` / `kicker` / `label` props optional (a client Figma may need one), render them only when passed, and **never pass them in previews**. Functional labels that carry meaning stay (Before / After panel labels, footer column titles, the slide-out menu's "Explore").

## 5. Rules from the Web Guide Book (checked in review)

**Typography**
- Two-tone h1/h2 everywhere via `TwoTone` (or the same pattern). Section headings are `h2`, card titles `h3`. A component never renders an `h1` unless it is a hero (then exactly one).
- `leading-[normal]`, `leading-[1.1]`, `leading-[1.55]` … **never** `leading-normal`. Tracking in `em` (`tracking-[-0.03em]`).
- No forced `<br>` in long text; use `text-balance` / `text-pretty` + `max-w`.
- **The type scale (2026-10-20, desktop / tablet / mobile; Inter 400 unless noted). No other headline sizes on desktop.**
  - Display h1 `text-[34px] md:text-[48px] xl:text-[64px] leading-[1.04] tracking-[-0.03em]` — heroes only. Hero Centered uses the smaller `text-[34px] md:text-[44px] xl:text-[56px] leading-[1.06]` since 2026-10-20 (client review: 64 read too big on centred heroes).
  - Statement h2 `text-[30px] md:text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.025em]`, `max-w-[1000px]` — headline sections where the headline *is* the content (no body, or ≤ ~25 words / one line / one CTA) and the closing CTA.
  - Section h2 `text-[28px] md:text-[32px] xl:text-[40px] leading-[1.2] tracking-[-0.02em]` — a headline followed by copy, cards, a list, steps or a visual. Count the words under the headline: under ~25 → Statement, anything with real copy / cards / a visual → Section.
  - Sub-headline h3 `text-[22px] md:text-[24px] xl:text-[28px] leading-[1.3] tracking-[-0.02em]` — feature-row headlines, lens names, quotes.
  - Card title h3 `text-[18px] md:text-[19px] xl:text-[20px] font-medium leading-[1.3] tracking-[-0.01em]`.
  - Row / list title `text-[16px] md:text-[17px] xl:text-[18px] font-medium leading-[normal]` — steps, accordion questions.
  - Lead `text-[17px] md:text-[18px] xl:text-[20px] leading-[1.4] tracking-[-0.01em] text-text-nav` — the intro paragraph under a headline, `max-w-[600px]`.
  - Body `text-[15px] md:text-[16px] leading-[1.55]` — paragraphs, card copy, answers. Small `text-[13px] md:text-[14px] leading-[1.5]` — captions, notes, legal. Mono label 12px uppercase `tracking-[0.08em]` — counters and tags only.
  - Stat number `text-[32px] md:text-[40px] xl:text-[48px] leading-[1] tracking-[-0.03em] tabular-nums`.
  - Nav links 14px regular in 36px pills (`NavLink` from the Base); buttons come from the button set. Nothing under 12px.

**Layout**
- Mobile-first. Breakpoints: base < 768, `md:` 768–1279, `xl:` ≥ 1280. Side padding `px-5 md:px-10 xl:px-16` (or `xl:px-[120px]` for narrow content).
- **Vertical rhythm (2026-10-20, mobile / tablet / desktop).** Every section `py-16 md:py-24 xl:py-[120px]` (64 / 96 / 120), no margins between sections; dark and photo sections keep the same padding inside. Only the Logo Marquee is a strip at 48 / 64 / 64 (`py-12 md:py-16`). Footer: top hairline, then 64 above and below the content (`py-16`), legal line 24 above.
- Inside a section: headline block → content (cards, rows, visual, form) **40 / 56 / 64** (`mt-10 md:mt-14 xl:mt-16` or `gap-10 md:gap-14 xl:gap-16`); headline → lead **16 / 20 / 20** (`gap-4 md:gap-5`); lead → buttons **32 / 40 / 40** (`mt-8 md:mt-10`); repeated rows (feature rows, steps) **64 / 96 / 120** apart; card grids **20 / 24 / 24** (`gap-5 md:gap-6`). Nothing larger inside a section.
- Content centred with `mx-auto` + `max-w-[1200px]` (or 1312 / 1392 for wide grids).
- **No horizontal overflow from 375 to 2400px.** Fluid widths (`min-w-0`, `flex-1`, `%`), never a fixed width wider than the viewport.
- **No viewport-height units** (`h-screen`, `min-h-[100vh]`, `svh`…): previews run in iframes sized to content. Use fixed heights / aspect ratios.
- Heroes assume a fixed 64px nav: top padding `pt-[calc(64px+56px)] md:pt-[calc(64px+80px)] xl:pt-[calc(64px+120px)]`, bottom `pb-16 md:pb-20 xl:pb-24` (64 / 80 / 96). A full-screen photo hero keeps its height; its copy stays ≥ 120px from the bottom edge.

**Motion**
- Animate only `transform`/`translate`/`scale`/`rotate` and `opacity`. No width/height/margin animations.
- Hover/press: 150–250ms `ease-out`, `motion-reduce:transition-none`. Buttons change fill only (150ms `ease-standard`, no lift: that lives in the Base); cards lift 2–4px (`hover:-translate-y-1`); images in clipped frames `group-hover:scale-[1.03]`; stat/list rows nudge the value **5px right** on hover (`group-hover:translate-x-[5px]`); links fade to 60%.
- **Tailwind v4 gotcha:** transition `translate`/`scale` with `transition-[translate,scale,opacity]` or `transition-transform`, **never** `transition-[transform,opacity]` on `translate-*` utilities.
- Put `{...reveal}` on a wrapper, not on an element that has its own hover transition (the reveal transition would override it).
- Marquees: CSS `animate-[marquee-left_40s_linear_infinite]` on a track with two identical copies (second copy `aria-hidden`), `hover:[animation-play-state:paused]`, `motion-reduce:animate-none`, clipped so the page never scrolls sideways.
- Carousels: prev/next buttons, click a side card to centre it, arrow keys, mouse + touch drag (6px threshold, snap, flick), autoplay ~4s pausing on hover/focus/drag, a visible pause button (WCAG 2.2.2), off under reduced motion (`useReducedMotion`).
- Hydration: anything that depends on the motion preference must render the same on server and first client render, then switch in an effect (see `parallax.tsx`).

**Interactive patterns**
- Lists that look like tabs/accordions are real `<button aria-expanded aria-controls>` elements, one open at a time, keyboard operable; body fades/rises in (`motion-safe:animate-[feature-in_0.45s_var(--ease-out-soft)_both]`); a side visual swaps per item (crossfade + slight rise/scale, ~500ms, `inert` on hidden panels).
- FAQ: one open at a time, first open by default, clicking the open one closes it.
- Forms: real `<form>`, labelled `type="email"`, `preventDefault`, inline confirmation in a **reserved** slot (no layout shift), `role="status"`.

**Accessibility**
- `<section id aria-labelledby>` with the heading id; decorative elements `aria-hidden`; icon-only buttons have `aria-label`; everything keyboard-operable; visible focus comes from the base styles.

## 6. `meta.ts` template

```ts
import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-split-v1",            // = folder name
  name: "Hero Split",             // no version
  version: 1,
  category: "hero",               // base | navigation | hero | features | stats | carousels | logos | bento | testimonials | faq | cta | popups | footer
  description: "One or two sentences: what it is, what it does on interaction.",
  interactions: ["Hover the cards: they lift 4px.", "Scroll: the visual drifts 30px."],
  props: [
    { name: "headline", type: "string", description: "Primary part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half." },
    { name: "cta", type: "{ label; href } | null", default: "Join waitlist → #cta", description: "…" },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release." }],
  files: [
    { path: "registry/firefly/sections/hero-split-v1/hero-split-v1.tsx", target: "components/sections/hero-split-v1.tsx", type: "registry:component" },
  ],
  dependencies: ["motion"],       // only if the file imports motion
  registryDependencies: ["firefly-base"],
  order: 20,                      // position inside the category (10, 20, 30 …)
  previewDevice: 834,             // card renders at this width (default 1440); bars read better at 834
  previewAlign: "bottom",         // short components: top (default) | center | bottom inside the card window
  previewScroll: true,            // only when scrolling inside the frame is needed to see the behaviour (sticky nav)
};
```

## 7. `preview.tsx` template

```tsx
import type { PreviewProps } from "@/lib/types";
import { HeroSplit } from "./hero-split-v1";

export default function Preview({ inBuild }: PreviewProps) {
  return <HeroSplit headline="…" headlineMuted="…" body="…" />;
}
```
`inBuild` is true when the section is stacked with others on the Build page: skip any demo filler then (only navigation needs filler). Drop the parameter if unused (lint fails on unused variables).

## 7b. Final example (`example.tsx`) — the "Final" switch

Next to `preview.tsx` (content-free wireframe) a section may have `example.tsx`: the **same component** filled with real, final content so the catalogue can show how the finished design looks. The catalogue detects the file automatically and offers a Wireframe / Final switch; the example is **not** shipped to sites (it is not in `meta.files`).

- Default export, same shape as the preview: `export default function Example() { return <HeroSplit … /> }`. Never change the component for the example; if the real design needs something the component can't do, note it in your report (that is a component gap, not an example problem).
- Content: exact copy from the source site (Startupmap is the agreed source for the first examples: `../startupmap/components/sections/...`). Images: copy the files from `../startupmap/public/images/...` into `public/images/examples/<id>/` (keep names) and render them with `next/image` (`fill` + `sizes` inside visual slots, `width/height` elsewhere). Logos as SVG. Do not hotlink or use Figma URLs.
- When the source visual is an **HTML mockup** (tables, kanban, app UI built in JSX), do not rebuild it: take an element screenshot of that frame from the running Startupmap site (production build on http://localhost:3005 — a 2x PNG via Playwright `locator.screenshot({ scale: "device" })` with `deviceScaleFactor: 2`) and save it to `public/images/examples/<id>/`.
- Verify at `/preview/<id>/example` with the same QA script (overflow, errors, reveals) at 1440 / 834 / 390, and look at the screenshot: the example should read like the real page section.

## 8. Verify before you report (the dev server is already running on http://localhost:3000 — do not start, stop or build it)

1. `npx tsc --noEmit` — zero errors. `npm run lint` — zero warnings. **Never run `npm run build` while the dev server runs.**
2. Screenshot + QA report at 1440, 834 and 390 for your preview page:
   `node "/private/tmp/claude-501/-Users-lukasznosek-Desktop-LUKASZ-2--PROJEKTY-CURSOR-FIREFLY/5f51ae1c-22b5-4ad1-b3cb-0ca8081b4240/scratchpad/pw/shot.mjs" http://localhost:3000/preview/<id> 1440 "/private/tmp/claude-501/-Users-lukasznosek-Desktop-LUKASZ-2--PROJEKTY-CURSOR-FIREFLY/5f51ae1c-22b5-4ad1-b3cb-0ca8081b4240/scratchpad/qa/<id>-1440.png"`
   (create the `qa` folder first). The JSON it prints must show `overflow: false`, `errors: []`, `revealsNotFiredAfterScroll: 0`, `stillHiddenAfterScroll: 0`, `textBelow11px: 0`, and `revealsBelowFoldHiddenAtLoad` equal on both sides when anything is below the fold. Also run it once with a 4th argument `reduce` and confirm nothing is hidden.
3. **Look at the screenshots** (Read the PNG). Fix anything that looks off: cramped spacing, orphaned words, wrong hierarchy, unbalanced grid, placeholder text that reads like a client.
4. Check interactions with a short ad-hoc Playwright script in the scratchpad (click a step, press ArrowRight, drag…) if the component has them.
5. Also open http://localhost:3000/components/<id> once and make sure the page renders (the card and the device switcher use your preview).

## 8b. Known non-issues
- Under `reduce`, components that use `motion` hooks log one console *warning* ("You have Reduced Motion enabled on your device…"). That is the motion library's dev notice, not a defect.
- Never override a `Button` variant's colours via `className` (Tailwind v4 orders same-property utilities alphabetically, so the override may lose). Add or use a variant (`primary`, `secondary`, `primary-on-dark`, `secondary-on-dark`). The old names `dark` / `ghost` / `light` / `ghost-dark` still work as aliases.
- When several builders work in parallel, give ad-hoc QA scripts unique names in the scratchpad.

## 9. What to report back

Files created · the props API · placeholder copy you wrote · any deviation from the Startupmap original and why · QA results (the JSON numbers for each width) · anything you were unsure about.
