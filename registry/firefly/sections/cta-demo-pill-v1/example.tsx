import Image from "next/image";
import { CtaDemoPill } from "./cta-demo-pill-v1";

/**
 * Final example: the Startupmap homepage "Book a demo" closing section (copy and product shot
 * from the live site). The shot keeps its own 2244×932 ratio so the copilot sidebar stays visible.
 */
export default function Example() {
  return (
    <CtaDemoPill
      tone="dark"
      headline="Book a demo and we'll walk through"
      headlineMuted="what Startupmap can help you with"
      primaryCta={{ label: "Book a Demo", href: "#top" }}
      secondaryCta={null}
      note="Take your next step with Startupmap. Get started today."
      visual={
        <div className="relative aspect-[2244/932] w-full">
          <Image
            src="/images/examples/cta-demo-pill-v1/copilot-ui-desktop.png"
            alt="Startupmap AI copilot: a “How can I help you?” prompt with suggested tasks such as Review due diligence reports and Analyze investor decks"
            fill
            priority
            sizes="(min-width: 1040px) 960px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
            className="object-cover"
          />
        </div>
      }
    />
  );
}
