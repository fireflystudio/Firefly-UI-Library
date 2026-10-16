import Image from "next/image";
import { CtaNewsletter } from "./cta-newsletter-v1";

/**
 * Final example: the Startupmap /reader sign-up section (copy from the live site). The "Daily issue"
 * card is a 2x screenshot of the site's HTML mockup, clipped at 2:1 like the original.
 */
export default function Example() {
  return (
    <CtaNewsletter
      tone="dark"
      headline="Investors and founders,"
      headlineMuted="in your inbox."
      label="Your email"
      placeholder="Your email"
      buttonLabel="Subscribe"
      confirmation="You’re on the list — first issue arrives tomorrow morning."
      privacyNote="Free, daily, before your first coffee."
      visual={
        <div className="relative aspect-[2/1] w-full overflow-clip rounded-t-2xl">
          <Image
            src="/images/examples/cta-newsletter-v1/daily-issue.png"
            alt="Preview of a Startupmap Reader issue: Tuesday, 13 October, Issue 142. Good morning. Six stories, four minutes. Fintech: Meridian Pay raises €4M seed led by Fjord Ventures. Funds: Kielo closes first fund at €40M, targets Nordic pre-seed. Signal: Halo Credit likely raising in Q1."
            fill
            priority
            sizes="(min-width: 840px) 760px, calc(100vw - 40px)"
            className="object-cover object-top"
          />
        </div>
      }
    />
  );
}
