import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToBuild } from "@/components/catalogue/add-to-build";
import { ComponentPreview } from "@/components/catalogue/component-preview";
import { InstallCommand } from "@/components/catalogue/install-command";
import { PropsTable } from "@/components/catalogue/props-table";
import { VersionPill } from "@/components/catalogue/version-pill";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { getItem, getItems } from "@/lib/catalogue";
import { BASE_ITEM_ID, REGISTRY_URL, installCommand } from "@/lib/registry-url";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const items = await getItems();
  return items.map((i) => ({ id: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return {};
  return {
    title: `${item.name} v${item.version}`,
    description: item.description,
  };
}

export default async function ComponentPage({ params }: { params: Params }) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();
  const isBase = item.id === BASE_ITEM_ID;

  return (
    <article className="pb-24">
      <Reveal className="flex flex-col gap-6">
        <div
          {...reveal}
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8"
        >
          <div className="flex flex-col">
            <h1 className="flex flex-wrap items-center gap-3 text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[44px]">
              {item.name}
              <VersionPill
                version={item.version}
                className="h-[26px] text-[12px]"
              />
            </h1>
          </div>
          <div className="shrink-0">
            <AddToBuild id={item.id} name={item.name} />
          </div>
        </div>
      </Reveal>

      <div className="mt-8 md:mt-10">
        <ComponentPreview
          src={`/preview/${item.id}`}
          title={item.name}
          scrollInside={item.previewScroll}
        />
      </div>

      <div className="mt-14 grid gap-12 md:mt-16 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12">
        <Reveal
          as="section"
          aria-labelledby="props-heading"
          className="flex min-w-0 flex-col gap-5"
        >
          <h2
            {...reveal}
            id="props-heading"
            className="text-[24px] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary"
          >
            {isBase ? "What it installs" : "Props"}
          </h2>
          <div {...reveal}>
            <PropsTable props={item.props} />
          </div>
        </Reveal>

        <Reveal as="aside" className="flex flex-col gap-6">
          <section
            aria-labelledby="install-heading"
            {...reveal}
            className="flex flex-col gap-4 rounded-card border border-border-06 bg-surface-primary p-5"
          >
            <h2
              id="install-heading"
              className="text-[24px] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary"
            >
              Install
            </h2>
            <p className="text-[14px] leading-[1.55] text-text-nav">
              Run inside the site&rsquo;s folder. The files are copied into the
              project, so the site owns its copy.
            </p>
            {isBase ? (
              <InstallCommand
                label="Step 1 · base"
                command={installCommand([BASE_ITEM_ID])}
              />
            ) : (
              <>
                <InstallCommand
                  label="Step 1 · base (once per site)"
                  command={installCommand([BASE_ITEM_ID])}
                />
                <InstallCommand
                  label={`Step 2 · ${item.name} v${item.version}`}
                  command={installCommand([item.id])}
                />
              </>
            )}
            {isBase ? (
              <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-[13.5px] leading-[1.55] text-text-nav">
                <li>
                  First time in a site: save{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    {REGISTRY_URL}/components.json
                  </code>{" "}
                  as{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    components.json
                  </code>{" "}
                  in the project root, so shadcn knows where files go.
                </li>
                <li>
                  Add{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    @import &quot;./firefly.css&quot;;
                  </code>{" "}
                  under the Tailwind import in{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    app/globals.css
                  </code>
                  .
                </li>
                <li>
                  Load Inter and IBM Plex Mono with{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    next/font
                  </code>{" "}
                  as{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    --font-inter
                  </code>{" "}
                  and{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    --font-plex-mono
                  </code>
                  .
                </li>
                <li>
                  Put{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    &lt;MotionScript /&gt;
                  </code>{" "}
                  inside{" "}
                  <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">
                    &lt;head&gt;
                  </code>{" "}
                  in the root layout.
                </li>
              </ol>
            ) : null}
          </section>

          <section
            aria-labelledby="files-heading"
            {...reveal}
            className="flex flex-col gap-3 rounded-card border border-border-06 bg-surface-primary p-5"
          >
            <h2 id="files-heading" className="catalogue-eyebrow">
              Files
            </h2>
            <ul className="flex flex-col divide-y divide-border-06 rounded-tile border border-border-06 bg-surface-muted/60">
              {item.files.map((f) => (
                <li
                  key={f.path}
                  className="px-3.5 py-2.5 font-mono text-[12px] leading-[1.5] text-text-primary"
                >
                  {f.target}
                </li>
              ))}
            </ul>
            {item.dependencies && item.dependencies.length > 0 ? (
              <p className="text-[13px] text-text-nav">
                npm:{" "}
                {item.dependencies.map((d) => (
                  <code
                    key={d}
                    className="ml-1 rounded-chip bg-catalogue-code px-1 font-mono text-[12px]"
                  >
                    {d}
                  </code>
                ))}
              </p>
            ) : null}
          </section>

          <section
            aria-labelledby="changelog-heading"
            {...reveal}
            className="flex flex-col gap-3 rounded-card border border-border-06 bg-surface-primary p-5"
          >
            <h2 id="changelog-heading" className="catalogue-eyebrow">
              Changelog
            </h2>
            <ol className="flex flex-col gap-3">
              {item.changelog.map((c) => (
                <li
                  key={c.version}
                  className="flex gap-3 text-[13.5px] leading-[1.55]"
                >
                  <span className="w-[88px] shrink-0 font-mono text-[12px] text-text-quaternary">
                    v{c.version}
                    <br />
                    {c.date}
                  </span>
                  <span className="text-text-nav">{c.notes}</span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>
    </article>
  );
}
