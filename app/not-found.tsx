import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-start justify-center gap-4 px-5 pt-24 md:px-8">
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-quaternary">404</p>
      <h1 className="text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px]">
        Nothing here. <span className="text-text-muted">The component may have moved.</span>
      </h1>
      <Link href="/" className="inline-flex h-[43px] items-center rounded-pill bg-button-primary px-5 text-[14px] font-medium text-button-content-primary transition-opacity duration-200 ease-out hover:opacity-85">
        Back to the library
      </Link>
    </main>
  );
}
