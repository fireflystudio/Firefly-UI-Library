import type { Metadata } from "next";
import { PaginationDemo, SegmentedDemo } from "@/components/catalogue/design-system/demos";
import { Intro, Item, Specimen, SpecTable } from "@/components/catalogue/design-system/specimen";
import { PageHeader } from "@/components/catalogue/page-header";
import { Button } from "@/components/ui/button";
import { HeroCta } from "@/components/ui/hero-cta";
import { ChevronLeft, ChevronRight, IconButton, PauseIcon, PlayIcon } from "@/components/ui/icon-button";

export const metadata: Metadata = { title: "Buttons · Design system" };

const SIZES = [
  { size: "lg", caption: "lg · 44px · 16px text · padding 20px · hero and section CTAs (default)" },
  { size: "md", caption: "md · 40px · 15px text · padding 16px · tab bars, inline actions" },
  { size: "sm", caption: "sm · 36px · 14px text · padding 14px · navigation" },
] as const;

export default function ButtonsPage() {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Buttons" />
      <Intro>
        One pill shape, regular weight, three sizes. Hover changes the fill (black to dark grey, white to light grey), nothing moves. The secondary
        button has no border: a half-pixel ring plus two soft shadows. Every section imports these from the Base, so a change here reaches all of them.
      </Intro>

      <Specimen title="Pill buttons" note="Primary and secondary in every size. Both become a Next Link when given an href.">
        <div className="flex flex-col gap-6">
          {SIZES.map(({ size, caption }) => (
            <Item key={size} caption={caption}>
              <div className="flex flex-wrap items-center gap-2">
                <Button size={size} href="#">
                  Sign up
                </Button>
                <Button size={size} variant="secondary" href="#">
                  Contact sales
                </Button>
              </div>
            </Item>
          ))}
          <Item caption="disabled · 50% opacity, no pointer">
            <div className="flex flex-wrap items-center gap-2">
              <Button disabled>Sign up</Button>
              <Button variant="secondary" disabled>
                Contact sales
              </Button>
            </div>
          </Item>
        </div>
      </Specimen>

      <Specimen title="On dark backgrounds" note="primary-on-dark is white with the shadow; secondary-on-dark is transparent with a light ring. HeroCta switches to them with onDark.">
        <div className="rounded-frame bg-surface-dark p-6">
          <HeroCta onDark primary={{ label: "Sign up", href: "#" }} secondary={{ label: "Contact sales", href: "#" }} />
        </div>
      </Specimen>

      <div className="grid gap-6 md:grid-cols-2">
        <Specimen title="Hero pair" note="HeroCta: primary + secondary, 44px, 8px apart. Wraps on narrow screens.">
          <Item caption="HeroCta · lg">
            <HeroCta primary={{ label: "Join waitlist", href: "#" }} secondary={{ label: "Book a demo", href: "#" }} />
          </Item>
        </Specimen>
        <Specimen title="Navigation pair" note="Secondary before primary, 36px. The secondary one hides on phones.">
          <Item caption="sm · secondary + primary">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" href="#">
                Log in
              </Button>
              <Button size="sm" href="#">
                Sign up
              </Button>
            </div>
          </Item>
        </Specimen>
      </div>

      <Specimen title="Icon buttons" note="Round, icon only, same fills and shadow. 16px icons with a 2px stroke. Always pass aria-label.">
        <div className="flex flex-wrap gap-8">
          <Item caption="sm · 32px · carousel arrows">
            <div className="flex items-center gap-2">
              <IconButton aria-label="Previous">
                <ChevronLeft />
              </IconButton>
              <IconButton aria-label="Next">
                <ChevronRight />
              </IconButton>
            </div>
          </Item>
          <Item caption="md · 40px">
            <div className="flex items-center gap-2">
              <IconButton size="md" aria-label="Previous">
                <ChevronLeft />
              </IconButton>
              <IconButton size="md" aria-label="Next">
                <ChevronRight />
              </IconButton>
            </div>
          </Item>
          <Item caption="lg · 44px · primary">
            <div className="flex items-center gap-2">
              <IconButton size="lg" variant="primary" aria-label="Previous">
                <ChevronLeft />
              </IconButton>
              <IconButton size="lg" variant="primary" aria-label="Next">
                <ChevronRight />
              </IconButton>
            </div>
          </Item>
          <Item caption="pause / play · autoplay control">
            <div className="flex items-center gap-2">
              <IconButton aria-label="Pause">
                <PauseIcon />
              </IconButton>
              <IconButton aria-label="Play">
                <PlayIcon />
              </IconButton>
            </div>
          </Item>
        </div>
      </Specimen>

      <Specimen title="Switch tabs" note="Segmented: the white indicator slides to the chosen item; inactive items get a light grey hover layer. Arrow keys move the selection.">
        <div className="flex flex-col gap-6">
          <Item caption="md · 40px">
            <SegmentedDemo />
          </Item>
          <Item caption="sm · 36px">
            <SegmentedDemo size="sm" />
          </Item>
        </div>
      </Specimen>

      <Specimen title="Pagination" note="PaginationDots between two icon buttons: 4px dots, the active one a 24px line that slides along. Used under carousels and testimonials.">
        <Item caption="arrows 32px · dots 4px · active line 24 × 4px">
          <PaginationDemo />
        </Item>
      </Specimen>

      <Specimen title="Specs">
        <SpecTable
          head={["Size", "Height", "Padding", "Text", "Icon gap", "Where"]}
          rows={[
            ["lg", "44px", "0 20px", "16px / 24px", "8px", "Hero CTAs, section CTAs, Read all stories"],
            ["md", "40px", "0 16px", "15px / 22px", "6px", "Switch tabs, inline actions"],
            ["sm", "36px", "0 14px", "14px / 21px", "6px", "Navigation, newsletter submit"],
            ["Icon sm / md / lg", "32 / 40 / 44px", "—", "16px icon, 2px stroke", "—", "Carousel arrows, pause, close"],
          ]}
        />
        <div className="mt-4 flex flex-col gap-1 text-[13px] leading-[1.5] text-text-nav">
          <p>Weight 400, radius 9999px, hover 150ms with the standard ease, focus ring 2px interactive blue, pair gap 8px.</p>
          <p>Tokens: button-primary, button-primary-hover, button-secondary, button-secondary-hover, surface-pressed, pagination-dot, pagination-active, shadow-button.</p>
        </div>
      </Specimen>
    </div>
  );
}
