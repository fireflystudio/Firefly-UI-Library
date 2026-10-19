import type { ReactNode } from "react";

/** White card on the grey app background: a titled block of specimens. */
export function Specimen({ title, note, children, className = "", bodyClassName = "" }: { title: string; note?: string; children: ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <section aria-label={title} className={`flex flex-col overflow-clip rounded-card border border-border-06 bg-surface-primary ${className}`}>
      <div className="flex flex-col gap-0.5 border-b border-border-06 px-5 py-4">
        <h2 className="text-[15px] font-medium leading-[normal] text-text-primary">{title}</h2>
        {note ? <p className="text-[13px] leading-[1.5] text-text-nav">{note}</p> : null}
      </div>
      <div className={`p-5 md:p-6 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

/** One specimen with a small caption under it. */
export function Item({ caption, children, className = "" }: { caption: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-2.5 ${className}`}>
      {/* Negative margin + padding: the row may scroll sideways on phones without clipping the button shadows */}
      <div className="-m-2 flex min-h-11 max-w-[calc(100%+16px)] items-center overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
      <p className="text-[12px] leading-[normal] text-text-quaternary">{caption}</p>
    </div>
  );
}

/** Compact spec table (sizes, durations …). */
export function SpecTable({ head, rows }: { head: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-left text-[13px] leading-[1.5]">
        <thead>
          <tr className="border-b border-border-06 text-text-quaternary">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-4 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border-04 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 pr-4 align-top ${j === 0 ? "font-medium text-text-primary" : "text-text-nav"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Page intro under the title: one short paragraph, no eyebrow. */
export function Intro({ children }: { children: ReactNode }) {
  return <p className="max-w-[640px] text-[14px] leading-[1.55] text-text-nav">{children}</p>;
}
