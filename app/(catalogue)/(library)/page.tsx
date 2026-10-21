import { Suspense } from "react";
import { Dashboard } from "@/components/catalogue/dashboard";
import { getItems } from "@/lib/catalogue";
import { WEB_CATEGORIES } from "@/lib/categories";

export default async function HomePage() {
  const items = (await getItems()).filter((i) => i.area !== "app");
  return (
    <>
      <h1 className="sr-only">Firefly UI Library</h1>
      <Suspense fallback={null}>
        <Dashboard items={items} categories={WEB_CATEGORIES} />
      </Suspense>
    </>
  );
}
