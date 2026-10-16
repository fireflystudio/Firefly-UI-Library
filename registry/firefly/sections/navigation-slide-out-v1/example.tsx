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
        /* Blank page below the bar so the frame can scroll and the menu has room; nothing else to look at */
        <div aria-hidden className="h-[640px] bg-surface-page" />
      )}
    </>
  );
}
