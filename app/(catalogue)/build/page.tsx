import type { Metadata } from "next";
import { BuildChat } from "@/components/catalogue/build-chat";
import { BuildList } from "@/components/catalogue/build-list";
import { PageHeader } from "@/components/catalogue/page-header";
import { getItems } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Build site",
  description: "Describe a site, get a page composed from the library with copy and photos, then install it.",
};

export default async function BuildPage() {
  const items = (await getItems()).filter((i) => i.area !== "app");
  return (
    <>
      <div className="pb-6 md:pb-8">
        <PageHeader title="Build site" />
      </div>
      <div className="grid gap-8 pb-16 xl:grid-cols-[400px_minmax(0,1fr)] xl:items-start xl:gap-10">
        <div className="xl:sticky xl:top-8 xl:h-[calc(100vh-128px)] xl:min-h-[560px]">
          <BuildChat />
        </div>
        <div className="min-w-0">
          <BuildList items={items} />
        </div>
      </div>
    </>
  );
}
