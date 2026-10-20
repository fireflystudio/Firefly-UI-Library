import Image from "next/image";
import { HeroLeft } from "./hero-left-v1";

/** Final example: the Startupmap homepage hero copy and visual, laid out left (same asset as Hero Centered). */
export default function Example() {
  return (
    <HeroLeft
      headline="Every deal, founder and fund."
      headlineMuted="On one map."
      body="The whole early-stage market, read and mapped for you. Screen faster, raise smarter and stay current."
      primaryCta={{ label: "Join waitlist", href: "#cta" }}
      secondaryCta={{ label: "Book a demo", href: "#cta" }}
      visual={
        <Image
          src="/images/examples/hero-centered-v1/copilot-visual.png"
          alt="Startupmap AI copilot: a sidebar with Copilot, Deals, Referrals, Companies and People, and a prompt asking “How can I help you?”"
          fill
          priority
          sizes="(min-width: 1440px) 1392px, calc(100vw - 48px)"
          className="object-cover"
        />
      }
    />
  );
}
