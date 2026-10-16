import type { PropDoc } from "@/lib/types";

/** Props reference as a responsive list: name | type + default, description underneath. */
export function PropsTable({ props }: { props: PropDoc[] }) {
  if (props.length === 0) {
    return <p className="text-[14px] text-text-nav">This item has no props: it installs files you use directly.</p>;
  }
  return (
    <ul className="divide-y divide-border-06 rounded-tile border border-border-06 bg-surface-primary">
      {props.map((p) => (
        <li key={p.name} className="grid gap-x-6 gap-y-1.5 px-4 py-3.5 md:grid-cols-[minmax(120px,200px)_minmax(0,1fr)]">
          <code className="break-words font-mono text-[13px] leading-[1.5] text-text-primary">{p.name}</code>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 font-mono text-[12px] leading-[1.5]">
              <span className="text-text-tertiary">{p.type}</span>
              {p.default ? (
                <span className="text-text-quaternary">
                  default <span className="text-text-tertiary">{p.default}</span>
                </span>
              ) : null}
            </p>
            <p className="text-[14px] leading-[1.5] text-text-nav">{p.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
