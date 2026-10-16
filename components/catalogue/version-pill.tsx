export function VersionPill({ version, className = "" }: { version: number | string; className?: string }) {
  return (
    <span
      className={`inline-flex h-[22px] shrink-0 items-center rounded-pill border border-border-10 px-2 font-mono text-[11px] leading-none text-text-nav ${className}`}
    >
      v{version}
    </span>
  );
}
