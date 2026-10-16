import Image from "next/image";
import type { PreviewProps } from "@/lib/types";
import { NavigationSticky } from "./navigation-sticky-v1";

/** Final example: the Startupmap site header (logo, audience links and waitlist pill from the live site). */

// Startupmap has one page per audience; anchors here so the catalogue preview prefetches nothing.
const LINKS = [
  { label: "Investors", href: "#investors" },
  { label: "Founders", href: "#founders" },
  { label: "Reader", href: "#reader" },
];

/** Startupmap logo: gradient app mark (40px, 8px radius) + wordmark (130 × 38). */
function StartupmapLogo() {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <Image
        src="/images/examples/navigation-sticky-v1/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority
        className="shrink-0 rounded-tile"
      />
      <Image
        src="/images/examples/navigation-sticky-v1/logo-wordmark.svg"
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
      <NavigationSticky
        brand={<StartupmapLogo />}
        brandLabel="Startupmap home"
        links={LINKS}
        activeHref="#investors"
        cta={{ label: "Join waitlist", href: "#cta" }}
      />
      {inBuild ? null : (
        /* Blank page below the bar so the frame can scroll and the menu has room; nothing else to look at */
        <div aria-hidden className="h-[640px] bg-surface-page" />
      )}
    </>
  );
}
