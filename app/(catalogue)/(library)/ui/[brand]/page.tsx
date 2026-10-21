import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Dashboard } from "@/components/catalogue/dashboard";
import { BRANDS, brandById } from "@/lib/brands";
import { getItems } from "@/lib/catalogue";
import { APP_CATEGORIES } from "@/lib/categories";

type Params = Promise<{ brand: string }>;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brand } = await params;
  const b = brandById(brand);
  return b ? { title: `${b.name} UI components`, description: b.description } : {};
}

/** A brand's product UI: single elements and whole flows, grouped like the web sections. */
export default async function BrandPage({ params }: { params: Params }) {
  const { brand } = await params;
  const b = brandById(brand);
  if (!b) notFound();
  const items = (await getItems()).filter((i) => i.area === "app" && i.brand === b.id);
  return (
    <>
      <h1 className="sr-only">{b.name} UI components</h1>
      <Suspense fallback={null}>
        <Dashboard items={items} categories={APP_CATEGORIES} showViewSwitch={false} />
      </Suspense>
    </>
  );
}
