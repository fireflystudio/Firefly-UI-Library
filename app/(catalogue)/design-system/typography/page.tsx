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
        the first half primary, the second half grey. Sizes scale with the breakpoints (mobile, tablet from 768px, desktop from 1280px).
      </Intro>

      <Specimen title="Headlines" note="Resize the window: each level has three sizes.">
        <div className="flex flex-col gap-8">
          <Item caption="Hero · 34 / 48 / 64px · line 1.04 · tracking -0.03em">
            <p className="max-w-[900px] text-balance text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:text-[64px]">
              <TwoTone text="Two-tone headlines on every page." muted="The second half always grey." />
            </p>
          </Item>
          <Item caption="Section · 26 / 32 / 48px · line 1.1 · tracking -0.025em">
            <p className="max-w-[760px] text-pretty text-[26px] font-normal leading-[1.1] tracking-[-0.025em] text-text-primary md:text-[32px] xl:text-[48px]">
              <TwoTone text="Built for the people who ship." muted="Not for the slide deck." />
            </p>
          </Item>
          <Item caption="Quote / sub-section · 24 / 28 / 36px · line 1.2 · tracking -0.02em">
            <p className="max-w-[900px] text-balance text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[28px] xl:text-[36px]">
              &ldquo;We replaced three tools with one page and nobody noticed the switch.&rdquo;
            </p>
          </Item>
          <Item caption="Card title · 19px · medium · line 1.3 · tracking -0.02em">
            <p className="text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-text-primary">A card title that can run to two lines</p>
          </Item>
        </div>
      </Specimen>

      <Specimen title="Body and small text">
        <div className="flex flex-col gap-8">
          <Item caption="Lead · 16 / 18px · line 1.55 · text-nav">
            <p className="max-w-[560px] text-pretty text-[16px] leading-[1.55] text-text-nav md:text-[18px]">
              Body copy sits in Inter at 16 to 18px with a 1.55 line height. Paragraphs stay under 560px wide so lines keep to about 70 characters.
            </p>
          </Item>
          <Item caption="Body · 14px · line 1.55 · text-nav">
            <p className="max-w-[340px] text-pretty text-[14px] leading-[1.55] text-text-nav">Card copy and list descriptions use 14px. Never ship text under 12px, even on phones.</p>
          </Item>
          <Item caption="List item · 15 / 18px · medium">
            <p className="text-[15px] font-medium leading-[normal] text-text-primary md:text-[18px]">A list item or step title</p>
          </Item>
          <Item caption="Navigation link · 14px · medium · text-nav, active in text-primary">
            <p className="flex gap-6 text-[14px] font-medium">
              <span className="text-text-primary">Product</span>
              <span className="text-text-nav">Customers</span>
              <span className="text-text-nav">Pricing</span>
            </p>
          </Item>
          <Item caption="Mono label · 12px · uppercase · tracking 0.08em · counters, tags and captions only (never above a headline)">
            <p className="font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em] text-text-quaternary">01 / 07 · Case study</p>
          </Item>
        </div>
      </Specimen>

      <Specimen title="Rules">
        <SpecTable
          head={["Rule", "Detail"]}
          rows={[
            ["Weights", "400 for headlines and body, 500 for card titles, nav links and list items. Nothing bolder."],
            ["Two-tone", "Split every headline with <TwoTone text muted>. The grey half uses text-muted (3:1 on the page, AA for large text)."],
            ["Line height", "Figma “normal” → leading-[normal]. Never leading-normal (that is 1.5)."],
            ["Tracking", "Convert px to em so it scales: -1.92px at 64px = -0.03em. Tighten a little instead of adding breaks."],
            ["Wrapping", "text-balance for display lines, text-pretty for paragraphs, max-w for measure. No forced <br> in long text."],
            ["Minimum", "12px. Mobile body 14 to 16px, card titles 18 to 19px."],
          ]}
        />
      </Specimen>
    </div>
  );
}
