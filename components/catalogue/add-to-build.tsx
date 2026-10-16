"use client";

import { useSelection } from "./selection";

/** Toggle that adds a component to the Build site selection. Compact = toolbar size. */
export function AddToBuild({ id, name, compact = false }: { id: string; name: string; compact?: boolean }) {
  const { isSelected, toggle, ready } = useSelection();
  const on = ready && isSelected(id);
  const size = compact ? "h-[30px] gap-1.5 px-3 text-[13px]" : "h-[43px] gap-2 px-5 text-[14px]";
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from the build` : `Add ${name} to the build`}
      className={`inline-flex cursor-pointer items-center rounded-pill border font-medium leading-none transition-[translate,scale,opacity,background-color,color] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none ${size} ${
        on
          ? "border-button-primary bg-button-primary text-button-content-primary hover:opacity-85"
          : "border-border-light bg-surface-primary text-text-primary hover:opacity-70"
      }`}
    >
      <span aria-hidden className="font-mono text-[12px]">
        {on ? "✓" : "+"}
      </span>
      {on ? "In build" : compact ? "Add to build" : `Add ${name} to build`}
    </button>
  );
}
