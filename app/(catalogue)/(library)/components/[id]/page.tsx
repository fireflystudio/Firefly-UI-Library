import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToBuild } from "@/components/catalogue/add-to-build";
import { ComponentPreview } from "@/components/catalogue/component-preview";
import { ViewSwitch } from "@/components/catalogue/view-mode";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { getItem, getItems } from "@/lib/catalogue";

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

  return (
    <article className="pb-16">
      <Reveal className="flex flex-col gap-6">
        <div {...reveal} className="flex items-center justify-between gap-4">
          <h1 className="text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[44px]">
            {item.name}
          </h1>
          <ViewSwitch />
        </div>
      </Reveal>

      <div className="mt-8 md:mt-10">
        <ComponentPreview
          src={`/preview/${item.id}`}
          title={item.name}
          scrollInside={item.previewScroll}
          exampleSrc={
            item.hasExample ? `/preview/${item.id}/example` : undefined
          }
          actions={<AddToBuild id={item.id} name={item.name} compact />}
        />
      </div>
    </article>
  );
}
