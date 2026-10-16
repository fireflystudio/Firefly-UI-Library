"use client";

import { useSelection } from "./selection";

export function AddToBuild({ id, name }: { id: string; name: string }) {
  const { isSelected, toggle, ready } = useSelection();
  const on = ready && isSelected(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={on}
      className={`inline-flex h-[43px] cursor-pointer items-center gap-2 rounded-pill border px-5 text-[14px] font-medium leading-none transition-[translate,scale,opacity,background-color,color] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none ${
        on
          ? "border-button-primary bg-button-primary text-button-content-primary hover:opacity-85"
          : "border-border-light bg-surface-primary text-text-primary hover:opacity-70"
      }`}
    >
      <span aria-hidden className="font-mono text-[13px]">
        {on ? "✓" : "+"}
      </span>
      {on ? "In build" : `Add ${name} to build`}
    </button>
  );
}
