import { Suspense } from "react";
import { Dashboard } from "@/components/catalogue/dashboard";
import { PageHeader } from "@/components/catalogue/page-header";
import { getItems } from "@/lib/catalogue";
import { CATEGORIES } from "@/lib/categories";

export default async function HomePage() {
  const items = await getItems();
  return (
    <>
      <PageHeader title="Firefly UI Library" />
      <Suspense fallback={null}>
        <Dashboard items={items} categories={CATEGORIES} />
      </Suspense>
    </>
  );
}
