import type { Metadata } from "next";
import { Intro, Item, Specimen, SpecTable } from "@/components/catalogue/design-system/specimen";
import { PageHeader } from "@/components/catalogue/page-header";
import { shortName, tokenGroup } from "@/lib/design-system/tokens";

export const metadata: Metadata = { title: "Spacing & radii · Design system" };

export default function SpacingPage() {
  const radii = tokenGroup("--radius-").flatMap((g) => g.tokens);
  const shadows = tokenGroup("--shadow-").flatMap((g) => g.tokens);
  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Spacing & radii" />
      <Intro>
        Three breakpoints, one section rhythm, a handful of radii. Desktop at 1440px matches Figma exactly; tablet follows the 834px frame and
        mobile the 390px frame. Nothing may overflow horizontally between 375 and 2400px.
      </Intro>

      <Specimen title="Breakpoints">
        <SpecTable
          head={["Name", "Range", "Tailwind prefix", "Design frame"]}
          rows={[
            ["Mobile", "< 768px", "(none, mobile-first)", "390px"],
            ["Tablet", "768 to 1279px", "md:", "834px"],
            ["Desktop", "≥ 1280px", "xl:", "1440px"],
          ]}
        />
      </Specimen>

      <Specimen
        title="Section rhythm"
        note="Accepted 2026-10-20 for every site and every library section. Sections have padding, never margins, so the distance between the content of two sections is always twice the padding. Dark, coloured and photo sections keep the same padding inside; their background edge is the boundary."
      >
        <SpecTable
          head={["Element", "Mobile", "Tablet", "Desktop"]}
          rows={[
            ["Section padding (top and bottom)", "64px", "96px", "120px (py-16 md:py-24 xl:py-[120px])"],
            ["Content to content across two sections", "128px", "192px", "240px (no margins between sections)"],
            ["Hero top (fixed nav 64px + spacing)", "64 + 56px", "64 + 80px", "64 + 120px"],
            ["Hero bottom", "64px", "80px", "96px (a full-screen photo hero keeps its height; copy ≥ 120px from the bottom edge)"],
            ["Logo strip (Logo Marquee only)", "48px", "64px", "64px"],
            ["Footer", "hairline, then 64px above and below the content", "same", "same (legal line 24px above)"],
            ["Page gutter", "20px", "40px", "64px (navigation bars 40px)"],
            ["Content container", "100%", "100%", "1200px (copy), 1312 to 1392px (wide grids), 1440px (nav, footer). A site may keep its own container; it does not change the rhythm."],
            ["Fixed nav height", "64px", "64px", "64px (scroll-padding-top 80px)"],
          ]}
        />
      </Specimen>

      <Specimen title="Inside a section" note="Nothing larger than these inside a section. Figma spacing that differs is a deviation to list in the report, not a reason to break the rhythm.">
        <SpecTable
          head={["Gap", "Mobile", "Tablet", "Desktop"]}
          rows={[
            ["Headline block → content (cards, rows, visual, form)", "40px", "56px", "64px (mt-10 md:mt-14 xl:mt-16)"],
            ["Headline → lead", "16px", "20px", "20px (gap-4 md:gap-5)"],
            ["Lead → buttons", "32px", "40px", "40px (mt-8 md:mt-10)"],
            ["Repeated rows (feature rows, steps)", "64px", "96px", "120px"],
            ["Card grid gap", "20px", "24px", "24px (gap-5 md:gap-6)"],
          ]}
        />
      </Specimen>

      <Specimen title="Radii" note="Named so they never clash with Tailwind side utilities: rounded-chip, rounded-tile, rounded-frame, rounded-card, rounded-pill.">
        <div className="flex flex-wrap gap-8">
          {radii.map((r) => (
            <Item key={r.name} caption={`${shortName(r.name)} · ${r.value}`}>
              <div aria-hidden className="size-16 border border-border-16 bg-surface-secondary" style={{ borderRadius: `var(${r.name})` }} />
            </Item>
          ))}
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-text-nav">chip for tags and inline code, tile for small media and list rows, frame for mockups and dark panels, card for cards and sections, pill for buttons and badges.</p>
      </Specimen>

      <Specimen title="Shadows" note="Three only. Cards and sections use hairline borders instead of shadows; the catalogue itself uses none.">
        <div className="flex flex-wrap gap-10 pb-4">
          {shadows.map((s) => (
            <Item key={s.name} caption={`${shortName(s.name)}${s.note ? ` · ${s.note}` : ""}`} className="max-w-[260px]">
              <div aria-hidden className="h-16 w-40 rounded-card bg-surface-primary" style={{ boxShadow: `var(${s.name})` }} />
            </Item>
          ))}
        </div>
      </Specimen>
    </div>
  );
}
