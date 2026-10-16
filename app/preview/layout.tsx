import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Bare layout for preview iframes: no catalogue chrome. */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
