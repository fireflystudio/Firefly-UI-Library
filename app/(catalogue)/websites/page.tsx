import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/catalogue/page-header";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { WEBSITES } from "@/lib/websites";

export const metadata: Metadata = {
  title: "Websites",
  description: "Finished Firefly websites built with the library's patterns.",
};

export default function WebsitesPage() {
  return (
    <>
      <div className="pb-8 md:pb-10">
        <PageHeader title="Websites" />
      </div>
      <Reveal as="ul" amount={0.05} className="grid grid-cols-1 gap-5 pb-24 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {WEBSITES.map((site) => (
          <li key={site.id} {...reveal} className="min-w-0">
            <article className="group flex h-full flex-col overflow-clip rounded-card border border-border-06 bg-surface-primary transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-drop motion-reduce:transition-none">
              <div className="relative aspect-[16/10] overflow-clip border-b border-border-06 bg-surface-secondary">
                {site.thumbnail ? (
                  <Image
                    src={site.thumbnail}
                    alt={`${site.name} homepage`}
                    fill
                    sizes="(min-width: 1280px) 448px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                ) : (
                  <Placeholder label="Screenshot" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[18px] font-medium leading-[normal] text-text-primary">{site.name}</h2>
                  <span className="font-mono text-[11px] text-text-quaternary">{site.year}</span>
                </div>
                <p className="text-[14px] leading-[1.5] text-text-nav">{site.description}</p>
                <div className="mt-auto flex items-center gap-4 pt-3 text-[13px] font-medium">
                  {site.url ? (
                    <a href={site.url} target="_blank" rel="noreferrer" className="text-text-primary transition-opacity duration-200 ease-out hover:opacity-60">
                      Visit site ↗
                    </a>
                  ) : (
                    <span className="text-text-quaternary">Not public yet</span>
                  )}
                  {site.github ? (
                    <a href={site.github} target="_blank" rel="noreferrer" className="text-text-nav transition-opacity duration-200 ease-out hover:opacity-60">
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </li>
        ))}
      </Reveal>
    </>
  );
}
