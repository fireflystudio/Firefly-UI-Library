import { MobilePlayer } from "./verb-mobile-player-v1";

/** The flow on its own: the 390 × 844 screen on the page background, with a hairline so its edge shows. */
export default function Preview() {
  return (
    <div className="flex justify-center bg-surface-page px-5 py-12 md:py-16">
      <div className="overflow-hidden rounded-[24px] border border-border-10">
        <MobilePlayer />
      </div>
    </div>
  );
}
