import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

/** One piece of the article body. `p` and `h2` take `text`; `ul` takes `items`. */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; by?: string }
  | { type: "ul"; items: string[] };

export type NewsArticleProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** Link back to the index. null hides it. */
  back?: { label: string; href: string } | null;
  category?: string;
  /** Read time or date, e.g. "3 min read" */
  meta?: string;
  title: string;
  /** One line under the title, in the muted grey. */
  lead?: string;
  /** Small pill under the meta line, e.g. "Listen · 3m". Not wired to anything. */
  listenLabel?: string;
  /** Full-width artwork above the title (an <Image fill> in a 16:9 frame). */
  image?: ReactNode;
  blocks: ArticleBlock[];
  /** Reading column. The house default is 760px, as on the careers role page. */
  containerClassName?: string;
  className?: string;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * News Article v1
 * The story page: back link, category and read time, the h1, an optional "Listen" pill, optional
 * artwork, then the body — paragraphs, sub-headings, bullet lists and pull quotes.
 *
 * The column is 760px, the same as the careers role page, not the 1050px the design was drawn at:
 * at 1050 a line of 17px type runs past 110 characters, which is roughly twice what is comfortable
 * to read. Body type is 16 / 17 / 17, a step above the house body size, because this is the one
 * kind of page people actually read top to bottom.
 */
export function NewsArticle({
  id = "article",
  back = { label: "All news", href: "/news" },
  category,
  meta,
  title,
  lead,
  listenLabel,
  image,
  blocks,
  containerClassName = "max-w-[760px]",
  className = "",
}: NewsArticleProps) {
  const headingId = `${id}-heading`;

  return (
    <article
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page pt-[calc(64px+56px)] md:pt-[calc(64px+80px)] xl:pt-[calc(64px+120px)] ${className}`}
    >
      <div className={`mx-auto px-5 md:px-10 ${containerClassName}`}>
        <Reveal as="header" stagger={80}>
          {back ? (
            <Link
              href={back.href}
              {...reveal}
              className="inline-flex items-center gap-2 text-[13px] leading-[1.5] text-text-tertiary transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none md:text-[14px]"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {back.label}
            </Link>
          ) : null}

          {category || meta ? (
            <p {...reveal} className="mt-8 text-[13px] leading-[1.4] text-text-tertiary md:mt-10 md:text-[14px]">
              {[category, meta].filter(Boolean).join(" · ")}
            </p>
          ) : null}

          <h1
            id={headingId}
            {...reveal}
            className="mt-3 text-balance text-[28px] font-normal leading-[1.15] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]"
          >
            {title}
          </h1>

          {lead ? (
            <p {...reveal} className="mt-4 text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:mt-5 md:text-[18px] xl:text-[20px]">
              {lead}
            </p>
          ) : null}

          {listenLabel ? (
            <p
              {...reveal}
              className="mt-6 inline-flex items-center gap-2 rounded-pill border border-border-10 px-3.5 py-2 text-[13px] leading-[1.2] text-text-secondary md:mt-8 md:text-[14px]"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                <rect x="2.5" y="13.5" width="4" height="6.5" rx="2" />
                <rect x="17.5" y="13.5" width="4" height="6.5" rx="2" />
              </svg>
              {listenLabel}
            </p>
          ) : null}

          {image ? (
            <div {...reveal} className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-frame bg-surface-muted md:mt-10">
              {image}
            </div>
          ) : null}
        </Reveal>

        <Reveal className="mt-10 flex flex-col md:mt-12" amount={0.1}>
          {blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={`${i}-${block.text.slice(0, 24)}`}
                  id={slugify(block.text)}
                  {...reveal}
                  className="mt-10 text-pretty text-[22px] font-normal leading-[1.3] tracking-[-0.02em] text-text-primary first:mt-0 md:mt-12 md:text-[24px] xl:text-[28px]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={`${i}-ul`} {...reveal} className="mt-5 flex flex-col gap-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-[1.6] text-text-secondary md:text-[17px]">
                      <span aria-hidden="true" className="mt-[0.7em] block size-1.5 shrink-0 rounded-pill bg-text-quaternary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "quote") {
              return (
                <figure key={`${i}-quote`} {...reveal} className="mt-8 border-l-2 border-border-20 pl-5 md:mt-10 md:pl-6">
                  <blockquote className="text-pretty text-[20px] leading-[1.4] tracking-[-0.02em] text-text-primary md:text-[22px]">
                    {block.text}
                  </blockquote>
                  {block.by ? (
                    <figcaption className="mt-3 text-[14px] leading-[1.4] text-text-tertiary">{block.by}</figcaption>
                  ) : null}
                </figure>
              );
            }
            return (
              <p
                key={`${i}-${block.text.slice(0, 24)}`}
                {...reveal}
                className="mt-5 text-pretty text-[16px] leading-[1.6] text-text-secondary first:mt-0 md:text-[17px]"
              >
                {block.text}
              </p>
            );
          })}
        </Reveal>
      </div>
    </article>
  );
}
