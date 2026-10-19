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

      <Specimen title="Section rhythm">
        <SpecTable
          head={["Element", "Mobile", "Tablet", "Desktop"]}
          rows={[
            ["Section padding (top and bottom)", "64px", "96px", "120px"],
            ["Page gutter", "20px", "32px (nav) / 40px", "64px"],
            ["Content container", "100%", "100%", "1200px (copy), 1312 to 1392px (wide grids), 1440px (nav)"],
            ["Headline to copy", "16 to 20px", "20px", "20px"],
            ["Copy to buttons", "32px", "40px", "40px"],
            ["Card grid gap", "20px", "24px", "24px"],
            ["Fixed nav height", "72px", "76px", "76px (hero top padding = nav + spacing; scroll-padding-top 80px)"],
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
