import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type NewsFeaturedProps = {
  /** Section id (anchor) */
  id?: string;
  /** Category of the story, shown before the read time */
  category?: string;
  /** Read time or date, e.g. "3 min read" */
  meta?: string;
  title: string;
  href: string;
  /** Fills the card behind the copy (an <Image fill>). Without it the card is a quiet surface. */
  image?: ReactNode;
  /** Width + side padding of the content column (match the site's other sections). */
  containerClassName?: string;
  className?: string;
};

/**
 * News Featured v1
 * The lead story of a news index: one wide card with the category, the read time and the headline
 * at the bottom left, and a round arrow in the corner. The whole card is a link; it lifts 3px on
 * hover and the arrow slides.
 *
 * With `image` the card is a photo under a dark gradient and the copy is white. Without one — a
 * site that has no photography yet — it is a quiet surface with a soft brand wash, so the page
 * still opens on one big headline instead of an empty frame.
 */
export function NewsFeatured({
  id = "featured",
  category,
  meta,
  title,
  href,
  image,
  containerClassName = "max-w-content",
  className = "",
}: NewsFeaturedProps) {
  const headingId = `${id}-heading`;
  const onImage = Boolean(image);

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 md:px-10 xl:px-16 ${className}`}>
      <Reveal className={`mx-auto w-full ${containerClassName}`}>
        <Link
          href={href}
          {...reveal}
          className={`group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-frame p-6 transition-[translate] duration-200 ease-out hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:min-h-[420px] md:p-10 xl:min-h-[480px] xl:p-12 ${
            onImage ? "bg-surface-dark text-text-on-dark" : "bg-surface-muted text-text-primary"
          }`}
        >
          {image ? (
            <>
              <div aria-hidden className="absolute inset-0 transition-[scale] duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
                {image}
              </div>
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-surface-inverse/80 via-surface-inverse/20 to-transparent" />
            </>
          ) : (
            /* No photography yet: a soft brand wash in the corner instead of an empty grey block. */
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-10%] top-[-30%] size-[70%] bg-[radial-gradient(closest-side,var(--color-glow)_0%,transparent_100%)] opacity-70"
            />
          )}

          <div className="relative flex flex-col">
            {category || meta ? (
              <p className={`text-[13px] leading-[1.4] md:text-[14px] ${onImage ? "text-text-on-dark/70" : "text-text-tertiary"}`}>
                {[category, meta].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            <h2
              id={headingId}
              className="mt-3 max-w-[20ch] text-balance text-[30px] font-normal leading-[1.1] tracking-[-0.025em] md:mt-4 md:text-[40px] xl:text-[48px]"
            >
              {title}
            </h2>
          </div>

          <span
            aria-hidden
            className={`absolute right-6 top-6 flex size-10 items-center justify-center rounded-pill transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none md:right-10 md:top-10 xl:right-12 xl:top-12 ${
              onImage ? "bg-surface-primary/90 text-text-primary" : "bg-surface-primary text-text-primary shadow-button"
            }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
