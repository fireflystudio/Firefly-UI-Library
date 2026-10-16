import { Dashboard } from "@/components/catalogue/dashboard";
import { PageHeader } from "@/components/catalogue/page-header";
import { getItems } from "@/lib/catalogue";
import { CATEGORIES } from "@/lib/categories";

export default async function HomePage() {
  const items = await getItems();
  const used = CATEGORIES.filter((c) => items.some((i) => i.category === c.id));
  return (
    <>
      <div className="pb-10 md:pb-12">
        <PageHeader
          eyebrow={`Firefly UI Library · ${items.length} ${items.length === 1 ? "component" : "components"} · ${used.length} ${used.length === 1 ? "category" : "categories"}`}
          title="Every section Firefly builds,"
          titleMuted="content-free and ready to install."
          lead="Open a component to test it at mobile, tablet and desktop widths, read its props and copy the install command. Tick sections to assemble a page in Build site."
        />
      </div>
      <Dashboard items={items} categories={CATEGORIES} />
    </>
  );
}
