import { notFound } from "next/navigation";
import { PreviewHost } from "@/components/catalogue/preview-host";
import { getItems } from "@/lib/catalogue";
import { loadPreview } from "@/lib/previews";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const items = await getItems();
  return items.map((i) => ({ id: i.id }));
}

export default async function PreviewPage({ params }: { params: Params }) {
  const { id } = await params;
  const Preview = await loadPreview(id);
  if (!Preview) notFound();
  return (
    <PreviewHost>
      <Preview />
    </PreviewHost>
  );
}
