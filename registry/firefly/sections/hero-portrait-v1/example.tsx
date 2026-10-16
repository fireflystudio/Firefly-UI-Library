import Image from "next/image";
import { HeroPortrait } from "./hero-portrait-v1";

/** Final example: the Startupmap /founders hero (copy and portrait from the live site). */
export default function Example() {
  return (
    <HeroPortrait
      headline="Find the right investors for your startup."
      headlineMuted="And reach them first."
      body="One profile that does the work of a deck, an investor list and an outreach sequence. Fill it in once; Startupmap keeps the raise moving."
      primaryCta={{ label: "Join waitlist", href: "#cta" }}
      secondaryCta={{ label: "Book a demo", href: "#cta" }}
      visual={
        <Image
          src="/images/examples/hero-portrait-v1/portrait.png"
          alt="Founder in a green suit, half seen through fluted glass"
          fill
          priority
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, calc(100vw - 40px)"
          className="object-cover"
        />
      }
    />
  );
}
