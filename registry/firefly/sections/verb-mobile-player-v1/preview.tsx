import { MobilePlayer } from "./verb-mobile-player-v1";

/** The flow on a phone: a 390 × 844 screen inside a simple device bezel. */
export default function Preview() {
  return (
    <div className="flex justify-center bg-surface-muted px-5 py-12 md:py-16">
      <div className="rounded-[56px] bg-surface-inverse p-[10px] shadow-[0_30px_80px_rgb(0_0_0/0.18)]">
        <div className="overflow-hidden rounded-[46px]">
          <MobilePlayer />
        </div>
      </div>
    </div>
  );
}
