import Image from "next/image";
import { HeroNewsBento, type NewsItem, type NewsLead } from "./hero-news-bento-v1";

/**
 * Final example: the Startupmap /reader hero ("front page" bento). Copy and images from the live site.
 * The real page has the CTA pair under the headline and renders the small stories as full-bleed dark
 * image cards; this component has no CTA slot and shows the images in the 2:1 slot of a light card.
 */
const IMG = "/images/examples/hero-news-bento-v1";

const LEAD: NewsLead = {
  kicker: "FINTECH",
  title: "Meridian Pay raises €4M seed led by Fjord Ventures",
  dek: "Second Nordic payments round this month. Fjord takes the lead; Aster follows. Read in 3 minutes.",
  href: "#lead",
  image: (
    <Image
      src={`${IMG}/lead.png`}
      alt=""
      fill
      priority
      sizes="(min-width: 1280px) 592px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
      className="object-cover"
    />
  ),
};

const storySizes = "(min-width: 1280px) 704px, (min-width: 768px) 50vw, calc(100vw - 40px)";

const ITEMS: NewsItem[] = [
  {
    kicker: "FUNDS",
    title: "Kielo closes first fund at €40M, targets Nordic pre-seed",
    href: "#story-funds",
    image: <Image src={`${IMG}/funds.png`} alt="" fill sizes={storySizes} className="object-cover" />,
  },
  {
    kicker: "AI",
    title: "Aster Ledger launches diligence API for angels",
    href: "#story-ai",
    image: <Image src={`${IMG}/ai.png`} alt="" fill sizes={storySizes} className="object-cover" />,
  },
  {
    kicker: "FOUNDERS",
    title: "Kielo closes first fund at €40M, targets Nordic pre-seed",
    href: "#story-founders",
    image: <Image src={`${IMG}/founders.png`} alt="" fill sizes={storySizes} className="object-cover" />,
  },
];

export default function Example() {
  return <HeroNewsBento headline="Summarized startup news" headlineMuted="for founders and investors." lead={LEAD} items={ITEMS} />;
}
