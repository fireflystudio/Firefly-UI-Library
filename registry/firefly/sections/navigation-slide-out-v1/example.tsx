import Image from "next/image";
import type { PreviewProps } from "@/lib/types";
import { NavigationSlideOut } from "./navigation-slide-out-v1";

/**
 * Final example: the Startupmap brand, audience links and waitlist pill, with the footer's
 * link columns ("Discover" / "Lega" — exact site copy) as the panel's small groups.
 */

// Startupmap has one page per audience; anchors here so the catalogue preview prefetches nothing.
const LINKS = [
  { label: "Investors", href: "#investors" },
  { label: "Founders", href: "#founders" },
  { label: "Reader", href: "#reader" },
];

const GROUPS = [
  {
    title: "Discover",
    links: [
      { label: "Investors", href: "#investors" },
      { label: "Founders", href: "#founders" },
      { label: "Reader", href: "#reader" },
    ],
  },
  {
    title: "Lega",
    links: [
      { label: "Privacy policy", href: "#privacy-policy" },
      { label: "Cookie policy", href: "#cookie-policy" },
    ],
  },
];

/** Startupmap logo: gradient app mark (40px, 8px radius) + wordmark (130 × 38). */
function StartupmapLogo() {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <Image
        src="/images/examples/navigation-slide-out-v1/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority
        className="shrink-0 rounded-tile"
      />
      <Image
        src="/images/examples/navigation-slide-out-v1/logo-wordmark.svg"
        alt="Startupmap"
        width={130}
        height={38}
        priority
        // Shrinks proportionally on very narrow phones instead of squashing
        className="h-auto w-[130px] min-w-0 shrink"
        style={{ height: "auto" }}
      />
    </span>
  );
}

export default function Example({ inBuild }: PreviewProps) {
  return (
    <>
      <NavigationSlideOut
        brand={<StartupmapLogo />}
        brandLabel="Startupmap home"
        links={LINKS}
        secondaryLink={{ label: "Log in", href: "#login" }}
        cta={{ label: "Join waitlist", href: "#cta" }}
        groups={GROUPS}
        activeHref="#investors"
      />
      {inBuild ? null : (
        /* Demo page body so the scroll compaction can be seen (not part of the component): the Startupmap homepage headline */
        <div aria-hidden className="bg-surface-page px-5 pb-24 pt-[calc(72px+56px)] md:px-6 md:pt-[calc(76px+80px)] xl:pt-[calc(76px+120px)]">
          <div className="mx-auto flex max-w-[1392px] flex-col items-center gap-9 md:gap-12 xl:gap-14">
            <p className="max-w-[350px] text-center text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:max-w-[720px] md:text-[48px] xl:max-w-[1148px] xl:text-[64px]">
              <span className="block">Every deal, founder and fund.</span>
              <span className="block text-text-muted">On one map.</span>
            </p>
            <div className="aspect-[350/420] w-full rounded-frame bg-surface-muted md:aspect-[1392/720]" />
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              <div className="aspect-[4/3] rounded-frame bg-surface-muted" />
              <div className="aspect-[4/3] rounded-frame bg-surface-muted" />
              <div className="aspect-[4/3] rounded-frame bg-surface-muted" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
