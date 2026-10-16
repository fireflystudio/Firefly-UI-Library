import { Button } from "@/components/ui/button";
import { HeroCta } from "@/components/ui/hero-cta";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

const SWATCHES = [
  { name: "surface-page", className: "bg-surface-page" },
  { name: "surface-secondary", className: "bg-surface-secondary" },
  { name: "surface-muted", className: "bg-surface-muted" },
  { name: "border-light", className: "bg-border-light" },
  { name: "text-muted", className: "bg-text-muted" },
  { name: "text-nav", className: "bg-text-nav" },
  { name: "text-primary", className: "bg-text-primary" },
  { name: "surface-dark", className: "bg-surface-dark" },
];

/** Specimen sheet for the base package: type, colour, buttons, placeholder and the reveal stagger. */
export default function BasePreview() {
  return (
    <div className="bg-surface-page px-5 py-12 md:px-10 md:py-16 xl:px-16 xl:py-20">
      <Reveal className="mx-auto flex max-w-[1200px] flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-5">
          <h1 {...reveal} className="max-w-[900px] text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:text-[64px]">
            <TwoTone text="Two-tone headlines on every page." muted="The second half always grey." />
          </h1>
          <p {...reveal} className="max-w-[560px] text-[16px] leading-[1.55] text-text-nav md:text-[18px]">
            Body copy sits in Inter at 16–18px with a 1.55 line height. Small labels use IBM Plex Mono, uppercase, with a
            little tracking.
          </p>
          <div {...reveal}>
            <HeroCta primary={{ label: "Primary action", href: "#" }} secondary={{ label: "Secondary action", href: "#" }} />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div {...reveal} className="flex flex-col gap-4">
            <h2 className="text-[20px] font-medium leading-[normal] text-text-primary">Buttons</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Button href="#">Dark · md</Button>
              <Button href="#" variant="ghost">
                Ghost · md
              </Button>
              <Button href="#" size="sm">
                Dark · sm
              </Button>
              <Button href="#" variant="ghost" size="sm">
                Ghost · sm
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 rounded-frame bg-surface-dark p-4">
              <Button href="#" variant="light">
                Light · on dark
              </Button>
              <Button href="#" variant="ghost-dark">
                Ghost · on dark
              </Button>
            </div>
          </div>

          <div {...reveal} className="flex flex-col gap-4">
            <h2 className="text-[20px] font-medium leading-[normal] text-text-primary">Placeholder visual</h2>
            <div className="grid grid-cols-2 gap-3">
              <Placeholder ratio="4 / 3" label="Image 4:3" className="rounded-frame" />
              <Placeholder ratio="4 / 3" label="Mockup" tone="dark" className="rounded-frame" />
            </div>
          </div>
        </div>

        <div {...reveal} className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium leading-[normal] text-text-primary">Colour tokens</h2>
          <ul className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {SWATCHES.map((s) => (
              <li key={s.name} className="flex flex-col gap-2">
                <span className={`block aspect-square rounded-tile border border-border-06 ${s.className}`} />
                <span className="truncate font-mono text-[11px] text-text-quaternary">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 {...reveal} className="text-[20px] font-medium leading-[normal] text-text-primary">
            Reveal stagger
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {["01", "02", "03", "04"].map((n) => (
              <li key={n} {...reveal} className="flex aspect-[4/3] items-end rounded-frame border border-border-06 bg-surface-primary p-4">
                <span className="font-mono text-[12px] text-text-quaternary">{n} · 90ms apart</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
