import { notFound } from "next/navigation";
import { PreviewHost } from "@/components/catalogue/preview-host";
import { getItems } from "@/lib/catalogue";
import { loadExample } from "@/lib/previews";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const items = await getItems();
  return items.filter((i) => i.hasExample).map((i) => ({ id: i.id }));
}

/** "Final" preview: the section filled with real example content (example.tsx next to the component). */
export default async function ExamplePage({ params }: { params: Params }) {
  const { id } = await params;
  const Example = await loadExample(id);
  if (!Example) notFound();
  return (
    <PreviewHost>
      <Example />
    </PreviewHost>
  );
}
