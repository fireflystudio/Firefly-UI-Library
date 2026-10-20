import type { Metadata } from "next";
import { Intro, Item, Specimen, SpecTable } from "@/components/catalogue/design-system/specimen";
import { PageHeader } from "@/components/catalogue/page-header";
import { TwoTone } from "@/components/ui/two-tone";

export const metadata: Metadata = { title: "Typography · Design system" };

export default function TypographyPage() {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Typography" />
      <Intro>
        Inter for everything, IBM Plex Mono only for small technical labels. Headlines are regular weight with tight tracking and a two-tone split:
        the first half primary, the second half grey. One scale for every site and every library section (accepted 2026-10-20): sizes are
        desktop / tablet / mobile and switch at 1280px and 768px.
      </Intro>

      <Specimen title="Headlines" note="Resize the window: each role has three sizes. No other headline sizes on desktop.">
        <div className="flex flex-col gap-8">
          <Item caption="Display h1 · 64 / 48 / 34px · line 1.04 · tracking -0.03em · the hero headline, two-tone">
            <p className="max-w-[1000px] text-balance text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:text-[64px]">
              <TwoTone text="Two-tone headlines on every page." muted="The second half always grey." />
            </p>
          </Item>
          <Item caption="Statement h2 · 48 / 40 / 30px · line 1.1 · tracking -0.025em · headline sections (the headline is the content, at most ≈ 25 words below) and the closing CTA · max width 1000 to 1100px">
            <p className="max-w-[1000px] text-balance text-[30px] font-normal leading-[1.1] tracking-[-0.025em] text-text-primary md:text-[40px] xl:text-[48px]">
              <TwoTone text="Built for the people who ship." muted="Not for the slide deck." />
            </p>
          </Item>
          <Item caption="Section h2 · 40 / 32 / 28px · line 1.2 · tracking -0.02em · a headline followed by copy, cards, a list, steps or a visual">
            <p className="max-w-[760px] text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]">
              <TwoTone text="Everything the team needs," muted="in the order they need it." />
            </p>
          </Item>
          <Item caption="Sub-headline h3 · 28 / 24 / 22px · line 1.3 · tracking -0.02em · feature-row headlines, lens names, quotes">
            <p className="max-w-[900px] text-balance text-[22px] font-normal leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[24px] xl:text-[28px]">
              &ldquo;We replaced three tools with one page and nobody noticed the switch.&rdquo;
            </p>
          </Item>
          <Item caption="Card title h3 · 20 / 19 / 18px · medium · line 1.3 · tracking -0.01em">
            <p className="text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary md:text-[19px] xl:text-[20px]">A card title that can run to two lines</p>
          </Item>
          <Item caption="Row / list title · 18 / 17 / 16px · medium · line normal · steps, accordion questions">
            <p className="text-[16px] font-medium leading-[normal] text-text-primary md:text-[17px] xl:text-[18px]">A step title or an accordion question</p>
          </Item>
          <Item caption="Stat number · 48 / 40 / 32px · line 1 · tracking -0.03em · tabular numbers">
            <p className="flex gap-8 text-[32px] font-normal leading-[1] tracking-[-0.03em] text-text-primary tabular-nums md:text-[40px] xl:text-[48px]">
              <span>2.4×</span>
              <span>98%</span>
              <span>12 min</span>
            </p>
          </Item>
        </div>
      </Specimen>

      <Specimen title="Body and small text">
        <div className="flex flex-col gap-8">
          <Item caption="Lead · 20 / 18 / 17px · line 1.4 · tracking -0.01em · text-nav · the one intro paragraph under a headline">
            <p className="max-w-[600px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:text-[18px] xl:text-[20px]">
              The lead is the muted paragraph under a headline. It stays under 600px wide so a line keeps to about 60 characters.
            </p>
          </Item>
          <Item caption="Body · 16 / 16 / 15px · line 1.55 · paragraphs, card copy, list descriptions, accordion answers">
            <p className="max-w-[560px] text-pretty text-[15px] leading-[1.55] text-text-nav md:text-[16px]">
              Body copy sits at 16px, 15px on phones, with a 1.55 line height. Paragraphs stay under 560px wide so lines keep to about 70 characters.
            </p>
          </Item>
          <Item caption="Small · 14 / 14 / 13px · line 1.5 · captions, stat labels, notes, legal · nothing under 12px">
            <p className="max-w-[340px] text-pretty text-[13px] leading-[1.5] text-text-nav md:text-[14px]">
              Stat labels, the note under a button pair, the privacy line under a form and the legal line in the footer.
            </p>
          </Item>
          <Item caption="Navigation link · 14px · regular · 20px line · primary colour, in a 36px pill (NavLink)">
            <p className="flex gap-6 text-[14px] leading-5 text-text-primary">
              <span>Product</span>
              <span>Customers</span>
              <span>Pricing</span>
            </p>
          </Item>
          <Item caption="Mono label · 12px · uppercase · tracking 0.08em · counters, tags and captions only (never above a headline)">
            <p className="font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em] text-text-quaternary">01 / 07 · Case study</p>
          </Item>
        </div>
      </Specimen>

      <Specimen title="Scale" note="Desktop / tablet / mobile. Inter, weight 400 unless noted. Tracking in em so it scales with the size.">
        <SpecTable
          head={["Role", "Size", "Line height", "Tracking", "Use"]}
          rows={[
            ["Display h1", "64 / 48 / 34", "1.04", "-0.03em", "The hero headline, two-tone. One per page."],
            ["Statement h2", "48 / 40 / 30", "1.1", "-0.025em", "Headline sections: the headline is the content (no body, or at most a short line, three names or one CTA, ≈ 25 words). Max width 1000 to 1100px. Also the closing CTA."],
            ["Section h2", "40 / 32 / 28", "1.2", "-0.02em", "A headline followed by copy, cards, a list, steps or a visual. Two-tone when the sentence has a natural split."],
            ["Sub-headline h3", "28 / 24 / 22", "1.3", "-0.02em", "Feature-row headlines, lens names, quotes."],
            ["Card title h3", "20 / 19 / 18", "1.3", "-0.01em", "Weight 500. Cards, panels, story tiles."],
            ["Row / list title", "18 / 17 / 16", "normal", "0", "Weight 500. Steps, accordion questions, hairline rows."],
            ["Lead", "20 / 18 / 17", "1.4", "-0.01em", "The intro paragraph under a headline, muted grey (text-nav)."],
            ["Body", "16 / 16 / 15", "1.55", "0", "Paragraphs, card copy, answers."],
            ["Small", "14 / 14 / 13", "1.5", "0", "Captions, stat labels, notes, legal. Nothing under 12px."],
            ["Mono label", "12", "normal", "0.08em", "Counters and tags only, uppercase, never above a headline."],
            ["Stat number", "48 / 40 / 32", "1.0", "-0.03em", "Tabular numbers."],
            ["Nav link / buttons", "14 · 16 / 15 / 14", "20px · pill", "0", "Nav links regular in 36px pills; buttons from the button set."],
          ]}
        />
      </Specimen>

      <Specimen title="Rules">
        <SpecTable
          head={["Rule", "Detail"]}
          rows={[
            ["Weights", "400 for headlines, leads and body; 500 for card titles, row titles and list items. Nothing bolder."],
            ["Two-tone", "Split every h1/h2 with <TwoTone text muted>. The grey half uses text-muted (3:1 on the page, AA for large text)."],
            ["Statement or Section", "Count the words below the headline inside the section. Under ~25 (or only names / one button) → Statement 48. Real copy, cards, steps or a visual → Section 40. No other headline sizes on desktop."],
            ["Line height", "Figma “normal” → leading-[normal]. Never leading-normal (that is 1.5)."],
            ["Tracking", "Convert px to em so it scales: -1.92px at 64px = -0.03em. Tighten a little instead of adding breaks."],
            ["Wrapping", "text-balance for display lines, text-pretty for paragraphs, max-w for measure (1000px statements, 600px leads, 560px body). No forced <br> in long text."],
            ["Minimum", "12px. Phones: body 15px, small text 13px, card titles 18px."],
          ]}
        />
      </Specimen>
    </div>
  );
}
