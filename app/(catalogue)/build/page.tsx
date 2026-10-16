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
      <div className="pb-8 md:pb-10">
        <PageHeader title="Build site" />
      </div>
      <div className="pb-24">
        <BuildList items={items} />
      </div>
    </>
  );
}
