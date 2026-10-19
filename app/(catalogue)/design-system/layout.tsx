import { DesignSystemBar } from "@/components/catalogue/sidebar";

/** Design-system area: below xl the pages show as a pill row (the sidebar lists them from xl). */
export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 xl:hidden">
        <DesignSystemBar />
      </div>
      {children}
    </>
  );
}
