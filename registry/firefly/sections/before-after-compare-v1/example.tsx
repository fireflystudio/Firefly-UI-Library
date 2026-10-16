import Image from "next/image";
import { BeforeAfterCompare } from "./before-after-compare-v1";

/**
 * Final example: the Startupmap Investors "Three weeks of diligence. Or twelve minutes." comparison
 * (copy from the live site). Each source row (value + caption) becomes one point; the closing line of
 * each card is the panel's lead line. The striped background of the "With Startupmap" card is the
 * after visual; the "Without" card has no image.
 */
const BEFORE = {
  title: "Deals you like, passed on for lack of time.",
  points: [
    "3 weeks per deal, from deck to decision",
    "2 analysts reading, cross-checking, rewriting",
    "40 decks a quarter — the rest get a polite no",
  ],
  visual: null,
};

const AFTER = {
  title: "Every deal you like, looked at.",
  points: ["12 min per deal, memo included", "1 partner reading a page, not a data room", "1000 decks a quarter, every one of them read"],
  visual: (
    <div className="relative aspect-[4/3] w-full">
      <Image
        src="/images/examples/before-after-compare-v1/with-startupmap-bg.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 508px, (min-width: 768px) calc(50vw - 104px), calc(100vw - 88px)"
        className="object-cover"
      />
    </div>
  ),
};

export default function Example() {
  return (
    <BeforeAfterCompare
      headline="Three weeks of diligence."
      headlineMuted="Or twelve minutes."
      beforeLabel="Without Startupmap"
      afterLabel="With Startupmap"
      before={BEFORE}
      after={AFTER}
    />
  );
}
