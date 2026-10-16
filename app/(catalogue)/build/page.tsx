import type { Metadata } from "next";
import { BuildList } from "@/components/catalogue/build-list";
import { PageHeader } from "@/components/catalogue/page-header";
import { getItems } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Build site",
  description: "Assemble selected sections into a page preview and copy one install command.",
};

export default async function BuildPage() {
  const items = await getItems();
  return (
    <>
      <div className="mx-auto max-w-[1392px] pb-8 pt-[calc(64px+24px)] md:pb-10 md:pt-[calc(64px+32px)]">
        <PageHeader title="Build site" />
      </div>
      <div className="pb-24">
        <BuildList items={items} />
      </div>
    </>
  );
}
