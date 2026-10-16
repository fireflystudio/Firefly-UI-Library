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
      <div className="pb-10 md:pb-12">
        <PageHeader
          size="md"
          eyebrow="Build site"
          title="Stack the sections you picked,"
          titleMuted="then install them in one go."
          lead="Reorder the list to match the page from top to bottom. The preview shows the assembled page; the command installs the base and every section into a site."
        />
      </div>
      <div className="pb-24">
        <BuildList items={items} />
      </div>
    </>
  );
}
