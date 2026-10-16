"use client";

import { useEffect, useState } from "react";

export function InstallCommand({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      /* clipboard blocked: the text is selectable */
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label ? <p className="catalogue-eyebrow">{label}</p> : null}
      <div className="flex items-start gap-2 rounded-tile border border-border-06 bg-catalogue-code p-3">
        <code className="min-w-0 flex-1 select-all break-all font-mono text-[12.5px] leading-[1.6] text-text-primary">{command}</code>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="inline-flex h-7 w-[64px] shrink-0 cursor-pointer items-center justify-center rounded-pill bg-button-primary text-[12px] font-medium leading-none text-button-content-primary transition-opacity duration-200 ease-out hover:opacity-85"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
