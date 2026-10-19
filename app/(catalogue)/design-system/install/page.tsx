import type { Metadata } from "next";
import Link from "next/link";
import { Intro, Specimen, SpecTable } from "@/components/catalogue/design-system/specimen";
import { InstallCommand } from "@/components/catalogue/install-command";
import { PageHeader } from "@/components/catalogue/page-header";
import { meta as base } from "@/registry/firefly/base/meta";
import { BASE_ITEM_ID, installCommand, REGISTRY_URL } from "@/lib/registry-url";

export const metadata: Metadata = { title: "Install · Design system" };

const FILE_NOTES: Record<string, string> = {
  "app/firefly.css": "Design tokens (@theme), base layer, reveal rules and keyframes. Edit the values for a client palette, keep the names.",
  "components/ui/motion-script.tsx": "Head script that adds html.motion-ok when JS runs and motion is allowed (3s failsafe).",
  "components/ui/reveal.tsx": "<Reveal> container: fades and rises every data-reveal child, staggered.",
  "components/ui/reveal-attr.ts": "The reveal attribute object, safe to spread in Server Components.",
  "components/ui/parallax.tsx": "<Parallax> scroll drift for large visuals (exit / through modes).",
  "components/ui/art-scale.tsx": "<ArtScale /> sets --art-scale so a 1440px composition scales on wide screens.",
  "components/ui/button.tsx": "<Button> pill: primary / secondary (+ on-dark), sizes sm 36 · md 40 · lg 44.",
  "components/ui/icon-button.tsx": "<IconButton> round icon button + chevron, play and pause icons.",
  "components/ui/segmented.tsx": "<Segmented> switch tabs with a sliding white indicator.",
  "components/ui/pagination-dots.tsx": "<PaginationDots> dots with a sliding active line.",
  "components/ui/hero-cta.tsx": "<HeroCta> primary + secondary pair for heroes and closing CTAs.",
  "components/ui/nav-link.tsx": "<NavLink> 14px pill links with the grey hover fill, navIconButtonClassesFor, <BurgerIcon>.",
  "components/ui/brand-mark.tsx": "<FireflyMark> default brand for the navigations (currentColor).",
  "components/ui/two-tone.tsx": "<TwoTone> headline helper: primary first half, grey second half.",
  "components/ui/placeholder.tsx": "<Placeholder> hatched stand-in for any image or mockup.",
};

export default function InstallPage() {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Install" />
      <Intro>
        The Base package is the design system as code: the token file, the motion foundation and the atoms on these pages. Every Firefly site
        installs it once, before any section. Sections are installed the same way, one command each, from their pages.
      </Intro>

      <Specimen title="Step 1 · shadcn config" note="Run inside the site folder, once.">
        <InstallCommand command={`curl -fsSL ${REGISTRY_URL}/components.json -o components.json`} />
      </Specimen>

      <Specimen title="Step 2 · the Base">
        <InstallCommand command={installCommand([BASE_ITEM_ID])} />
        <div className="mt-4 flex flex-col gap-1 text-[13px] leading-[1.55] text-text-nav">
          <p>Then add <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">@import &quot;./firefly.css&quot;;</code> under the Tailwind import in app/globals.css, load Inter and IBM Plex Mono with next/font (variables --font-inter and --font-plex-mono) and put &lt;MotionScript /&gt; in the root layout&rsquo;s head.</p>
        </div>
      </Specimen>

      <Specimen title="What it installs" note={`Version ${base.changelog[base.changelog.length - 1]?.version ?? base.version}.`}>
        <SpecTable
          head={["File", "What it is"]}
          rows={base.files.map((f) => [f.target, FILE_NOTES[f.target] ?? ""])}
        />
      </Specimen>

      <Specimen title="Changelog">
        <SpecTable head={["Version", "Date", "Notes"]} rows={base.changelog.map((c) => [c.version, c.date, c.notes])} />
        <p className="mt-4 text-[13px] leading-[1.5] text-text-nav">
          The full specimen sheet of the Base renders at{" "}
          <Link href="/components/firefly-base" className="font-medium text-text-primary transition-opacity duration-200 ease-out hover:opacity-60">
            Firefly Base
          </Link>
          .
        </p>
      </Specimen>
    </div>
  );
}
