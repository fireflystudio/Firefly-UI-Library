import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CareersRole = {
  title: string;
  /** The role's page */
  href: string;
  /** Short facts shown on the right (e.g. ["Full-time", "Remote"]) */
  meta?: string[];
  prefetch?: boolean;
};

export type CareersRolesProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  headline: string;
  headlineMuted?: string;
  roles: CareersRole[];
  /** Shown instead of the list when `roles` is empty */
  emptyText?: string;
  /** Width + side padding of the content column, so it lines up with the site's nav and footer. Default = the library column (1072px at 1440). */
  containerClassName?: string;
  className?: string;
};

/**
 * Careers Roles v1
 * "Open roles": a section headline and a hairline list of roles, each row a link to the role page
 * (title left, facts + arrow right; facts move under the title on phones). On hover the title nudges
 * 5px right and the arrow fades in. Rows stagger in.
 */
export function CareersRoles({
  id = "open-roles",
  headline,
  headlineMuted,
  roles,
  emptyText = "No open roles right now. Check back soon.",
  containerClassName = "max-w-[1200px] px-5 md:px-10 xl:px-16",
  className = "",
}: CareersRolesProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page pb-16 pt-8 md:pb-24 md:pt-12 xl:pb-[120px] xl:pt-[60px] ${className}`}>
      <div className={`mx-auto ${containerClassName}`}>
        <Reveal stagger={60}>
          <h2 id={headingId} {...reveal} className="max-w-[1000px] text-balance text-[24px] leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[28px] xl:text-[32px]">
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          {roles.length ? (
            <ul className="mt-6 border-t border-border-10 md:mt-8">
              {roles.map((role) => (
                <li key={role.href} {...reveal} className="border-b border-border-10">
                  <Link href={role.href} prefetch={role.prefetch} className="group flex items-center justify-between gap-6 py-5 md:py-6">
                    <span className="flex min-w-0 flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
                      <span className="text-[16px] font-medium leading-[normal] text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none md:text-[17px] xl:text-[18px]">
                        {role.title}
                      </span>
                      {role.meta?.length ? (
                        <span className="text-[13px] leading-[1.5] text-text-tertiary md:hidden md:text-[14px]">{role.meta.join(" · ")}</span>
                      ) : null}
                    </span>
                    <span className="flex shrink-0 items-center gap-6 text-[14px] leading-[1.5] text-text-tertiary md:text-[15px]">
                      {role.meta?.map((m) => (
                        <span key={m} className="hidden md:inline">
                          {m}
                        </span>
                      ))}
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        aria-hidden="true"
                        focusable="false"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-text-primary opacity-40 transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p {...reveal} className="mt-5 text-[17px] leading-[1.4] tracking-[-0.01em] text-text-secondary md:mt-6 md:text-[18px] xl:text-[20px]">
              {emptyText}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
