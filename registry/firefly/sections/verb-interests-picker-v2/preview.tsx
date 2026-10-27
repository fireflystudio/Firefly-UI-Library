import { InterestsPickerV2 } from "./verb-interests-picker-v2";

export default function Preview() {
  return (
    <div className="flex items-center justify-center bg-surface-page px-5 py-16 md:px-10 md:py-24">
      <div className="w-full max-w-[423px]">
        <InterestsPickerV2 />
      </div>
    </div>
  );
}
