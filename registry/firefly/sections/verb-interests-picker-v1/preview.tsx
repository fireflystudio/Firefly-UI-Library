import { InterestsPicker } from "./verb-interests-picker-v1";

export default function Preview() {
  return (
    <div className="flex items-center justify-center bg-surface-muted px-5 py-16 md:px-10 md:py-24">
      <div className="w-full max-w-[423px]">
        <InterestsPicker />
      </div>
    </div>
  );
}
