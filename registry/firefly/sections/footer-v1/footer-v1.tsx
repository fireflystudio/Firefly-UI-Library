"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type FooterLink = { label: string; href: string; /** false for pages that do not exist yet (avoids 404 prefetches) */ prefetch?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterSignup = {
  /** Small label above the field, also the input's accessible name */
  label: string;
  placeholder?: string;
  /** Shown in the reserved status slot after submit */
  confirmation?: string;
  /** Accessible name of the arrow button */
  buttonLabel?: string;
  /** Called with the entered email on submit. Nothing is sent anywhere until a site wires this. */
  onSubmit?: (email: string) => void;
};

export type FooterProps = {
  /** Logo or wordmark. Defaults to a light tile with a dark square + "Brand" text. */
  brand?: ReactNode;
  /** Accessible name of the brand link */
  brandLabel?: string;
  brandHref?: string;
  /** One short sentence under the brand (18 / 20 / 24px) */
  tagline?: string;
  /** Link columns: 12px label + 20px links */
  columns: FooterColumn[];
  /** Email sign-up form. null hides it. */
  signup?: FooterSignup | null;
  /** Bottom line, e.g. "© 2026 Brand. All rights reserved." */
  legal?: string;
  /** Small links on the bottom line */
  legalLinks?: FooterLink[];
  /** "dark" (default): dark surface, light text. "light": page surface, ink text, light hairlines. */
  tone?: FooterTone;
  className?: string;
};

export type FooterTone = "dark" | "light";

/* Everything that changes between the two tones lives here; layout stays identical. */
const TONES: Record<
  FooterTone,
  { footer: string; hairline: string; label: string; link: string; input: string; arrow: string; status: string; legal: string; brandText: string }
> = {
  dark: {
    footer: "bg-surface-dark text-text-on-dark",
    hairline: "bg-border-on-dark",
    label: "text-text-on-dark/60",
    link: "text-text-on-dark",
    input: "border-text-on-dark/50 text-text-on-dark placeholder:text-text-on-dark/50",
    arrow: "text-text-on-dark",
    status: "text-text-on-dark/60",
    legal: "border-border-on-dark text-text-on-dark/60",
    brandText: "text-text-on-dark",
  },
  light: {
    footer: "bg-surface-page text-text-primary",
    hairline: "bg-border-light",
    label: "text-text-tertiary",
    link: "text-text-primary",
    input: "border-text-primary/40 text-text-primary placeholder:text-text-placeholder",
    arrow: "text-text-primary",
    status: "text-text-tertiary",
    legal: "border-border-light text-text-tertiary",
    brandText: "text-text-primary",
  },
};

/**
 * Footer v1
 * Footer with a top hairline, dark by default or light (`tone="light"`). Brand + tagline, link
 * columns and an email sign-up form.
 * Stacked on mobile; brand and columns side by side on tablet with the form below; on
 * desktop a three-column grid (brand | columns | form). Optional legal line with small links.
 * The form is a real <form> with a labelled email input: it prevents default, confirms inline
 * in a reserved role="status" slot (no layout shift) and calls `signup.onSubmit` if given.
 */
export function Footer({
  brand,
  brandLabel = "Home",
  brandHref = "/",
  tagline,
  columns,
  signup = { label: "Sign up for updates" },
  legal,
  legalLinks,
  tone = "dark",
  className = "",
}: FooterProps) {
  const hasLegal = Boolean(legal || legalLinks?.length);
  const t = TONES[tone];

  return (
    <footer className={`${t.footer} ${className}`}>
      <Reveal
        {...reveal}
        amount={0.1}
        className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 pb-10 md:gap-12 md:px-10 md:pb-12 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,440px)] xl:gap-x-10 xl:gap-y-16 xl:pb-16"
      >
        <div aria-hidden className={`h-px w-full xl:col-span-3 ${t.hairline}`} />

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8 xl:contents">
          <div {...reveal} className="flex flex-col items-start gap-6 md:max-w-[300px] xl:max-w-[400px]">
            <Link href={brandHref} aria-label={brandLabel} className="inline-flex rounded-chip">
              {brand ?? <DefaultBrand textClass={t.brandText} />}
            </Link>
            {tagline ? (
              <p className="text-pretty text-[18px] font-normal leading-[1.3] tracking-[-0.02em] md:text-[20px] xl:text-[24px]">{tagline}</p>
            ) : null}
          </div>

          {columns.length ? (
            <nav {...reveal} aria-label="Footer" className="flex gap-10 md:gap-16">
              {columns.map((column) => (
                <FooterColumnList key={column.title} column={column} labelClass={t.label} linkClass={t.link} />
              ))}
            </nav>
          ) : null}
        </div>

        {signup ? <SignupForm {...signup} tone={t} className="xl:col-start-3" /> : null}

        {hasLegal ? (
          <div
            {...reveal}
            className={`flex flex-col gap-3 border-t pt-6 text-[12px] leading-[1.3] md:flex-row md:items-center md:justify-between xl:col-span-3 ${t.legal}`}
          >
            {legal ? <p>{legal}</p> : null}
            {legalLinks?.length ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} prefetch={l.prefetch} className="transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </Reveal>
    </footer>
  );
}

function FooterColumnList({ column, labelClass, linkClass }: { column: FooterColumn; labelClass: string; linkClass: string }) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <p id={id} className={`text-[12px] leading-[1.3] ${labelClass}`}>
        {column.title}
      </p>
      <ul aria-labelledby={id} className="flex flex-col gap-1">
        {column.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              prefetch={link.prefetch}
              className={`inline-block text-[20px] leading-[1.3] tracking-[-0.02em] transition-opacity duration-200 ease-out hover:opacity-70 motion-reduce:transition-none ${linkClass}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SignupForm({
  label,
  placeholder = "Enter your email",
  confirmation = "Thanks — you’re on the list.",
  buttonLabel = "Subscribe",
  onSubmit,
  tone,
  className = "",
}: FooterSignup & { tone: (typeof TONES)[FooterTone]; className?: string }) {
  const id = useId();
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    onSubmit?.(email);
    setDone(true);
    e.currentTarget.reset();
  };

  return (
    <form {...reveal} onSubmit={handleSubmit} className={`flex w-full max-w-[440px] flex-col items-start gap-5 ${className}`}>
      <label htmlFor={`${id}-email`} className={`text-[12px] leading-[1.3] ${tone.label}`}>
        {label}
      </label>
      <div className={`flex w-full items-center gap-3 border-b pb-2 ${tone.input}`}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          onChange={() => done && setDone(false)}
          className="min-w-0 flex-1 bg-transparent p-0 text-[20px] leading-[1.3] tracking-[-0.02em] text-inherit md:text-[24px]"
        />
        <button
          type="submit"
          aria-label={buttonLabel}
          className={`flex size-8 shrink-0 cursor-pointer items-center justify-center transition-[translate,opacity] duration-200 ease-out hover:translate-x-0.5 hover:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-x-0 ${tone.arrow}`}
        >
          <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      {/* Reserved slot: always one line tall so the confirmation never shifts the layout */}
      <p role="status" aria-live="polite" className={`min-h-[16px] text-[12px] leading-[1.3] ${tone.status}`}>
        {done ? confirmation : ""}
      </p>
    </form>
  );
}

function DefaultBrand({ textClass }: { textClass: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-chip bg-surface-muted">
        <span className="block size-3 rounded-[2px] bg-surface-dark" />
      </span>
      <span className={`text-[18px] font-medium leading-none tracking-[-0.01em] ${textClass}`}>Brand</span>
    </span>
  );
}
