import type { PropDoc } from "@/lib/types";

export function PropsTable({ props }: { props: PropDoc[] }) {
  if (props.length === 0) {
    return <p className="text-[14px] text-text-nav">This item has no props: it installs files you use directly.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-tile border border-border-06">
      <table className="w-full min-w-[640px] border-collapse text-left text-[13.5px] leading-[1.5]">
        <thead>
          <tr className="border-b border-border-06 bg-surface-muted">
            <th scope="col" className="px-4 py-2.5 font-medium text-text-nav">Prop</th>
            <th scope="col" className="px-4 py-2.5 font-medium text-text-nav">Type</th>
            <th scope="col" className="px-4 py-2.5 font-medium text-text-nav">Default</th>
            <th scope="col" className="px-4 py-2.5 font-medium text-text-nav">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-border-06 last:border-b-0">
              <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-[12.5px] text-text-primary">{p.name}</td>
              <td className="px-4 py-3 align-top font-mono text-[12px] text-text-tertiary">{p.type}</td>
              <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-[12px] text-text-quaternary">{p.default ?? "—"}</td>
              <td className="min-w-[240px] px-4 py-3 align-top text-text-nav">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
