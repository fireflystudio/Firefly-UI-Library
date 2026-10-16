"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, type ComponentType } from "react";
import { PreviewHost } from "@/components/catalogue/preview-host";
import type { PreviewProps } from "@/lib/types";

const ID_PATTERN = /^[a-z0-9-]+$/;

/** Each selected section's preview is loaded as its own chunk and stacked in page order. */
function Section({ id }: { id: string }) {
  const Component = useMemo<ComponentType<PreviewProps>>(
    () =>
      dynamic(() => import(`@/registry/firefly/sections/${id}/preview`).then((m) => m.default), {
        ssr: false,
        loading: () => <div className="h-40" aria-busy />,
      }),
    [id]
  );
  return <Component inBuild />;
}

function Assembled() {
  const params = useSearchParams();
  const ids = Array.from(new Set((params.get("items") ?? "").split(",").filter((id) => ID_PATTERN.test(id))));
  return (
    <PreviewHost>
      {ids.map((id) => (
        <Section key={id} id={id} />
      ))}
    </PreviewHost>
  );
}

export default function BuildPreviewPage() {
  return (
    <Suspense fallback={null}>
      <Assembled />
    </Suspense>
  );
}
