import { DesktopApp } from "./verb-desktop-app-v1";

/** The app on its own: the 1280 × 800 screen on the page background, with a hairline so its edge shows. */
export default function Preview() {
  return (
    <div className="flex justify-center bg-surface-page px-5 py-12">
      <div className="overflow-hidden rounded-[16px] border border-border-10">
        <DesktopApp />
      </div>
    </div>
  );
}
