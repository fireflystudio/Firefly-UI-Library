"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type FooterLink = {
  label: string;
  /** Destination. Leave out when `links` is set: the item then renders as a disclosure. */
  href?: string;
  /** false for pages that do not exist yet (avoids 404 prefetches) */
  prefetch?: boolean;
  /** Sub-links: the item becomes a "Policies ▾" disclosure that opens on hover, click or keyboard (ElevenLabs pattern) */
  links?: FooterLink[];
};
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
  /** One short sentence under the brand (17 / 18 / 20px) */
  tagline?: string;
  /** Link columns: 12px label + 16/17px links */
  columns: FooterColumn[];
  /** Email sign-up form. null hides it. */
  signup?: FooterSignup | null;
  /** "dark" (default): dark surface, light text. "light": page surface, ink text, light hairlines. */
  tone?: FooterTone;
  className?: string;
};

export type FooterTone = "dark" | "light";

/* Everything that changes between the two tones lives here; layout stays identical. */
const TONES: Record<
  FooterTone,
  { footer: string; hairline: string; label: string; link: string; input: string; arrow: string; status: string; brandText: string }
> = {
  dark: {
    footer: "bg-surface-dark text-text-on-dark",
    hairline: "bg-border-on-dark",
    label: "text-text-on-dark/60",
    link: "text-text-on-dark",
    input: "border-text-on-dark/50 text-text-on-dark placeholder:text-text-on-dark/50",
    arrow: "text-text-on-dark",
    status: "text-text-on-dark/60",
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
    brandText: "text-text-primary",
  },
};

/**
 * Footer v1
 * Footer with a top hairline and 64px above and below the content, dark by default or light
 * (`tone="light"`). Brand + tagline, link columns and an email sign-up form. A column link with
 * `links` renders as a disclosure (label + chevron) whose sub-links open on hover, click or keyboard.
 * Stacked on mobile; brand and columns side by side on tablet with the form below; on
 * desktop a three-column grid (brand | columns | form). No legal line (house decision 2026-10-20).
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
  tone = "dark",
  className = "",
}: FooterProps) {
  const t = TONES[tone];

  return (
    <footer className={`${t.footer} ${className}`}>
      <style href="firefly-footer-disclosure" precedence="default">{DISCLOSURE_CSS}</style>
      {/* Top hairline, 64px above the content, 80/96/112px below it (no bottom hairline or legal line) */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div aria-hidden className={`h-px w-full ${t.hairline}`} />
      </div>
      <Reveal
        {...reveal}
        amount={0.1}
        className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 pb-20 pt-16 md:gap-12 md:px-10 md:pb-24 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,360px)] xl:gap-x-10 xl:gap-y-16 xl:pb-28"
      >

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8 xl:contents">
          <div {...reveal} className="flex flex-col items-start gap-6 md:max-w-[300px] xl:max-w-[400px]">
            <Link href={brandHref} aria-label={brandLabel} className="inline-flex rounded-chip">
              {brand ?? <DefaultBrand textClass={t.brandText} />}
            </Link>
            {tagline ? (
              <p className="text-pretty text-[17px] font-normal leading-[1.3] tracking-[-0.01em] md:text-[18px] xl:text-[20px]">{tagline}</p>
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
        {column.links.map((link) =>
          link.links?.length ? (
            <FooterDisclosure key={link.label} link={link} linkClass={linkClass} />
          ) : (
            <li key={link.label}>
              <Link
                href={link.href ?? "#"}
                prefetch={link.prefetch}
                className={`inline-block text-[16px] leading-[1.4] tracking-[-0.01em] transition-opacity duration-200 ease-out hover:opacity-70 motion-reduce:transition-none md:text-[17px] ${linkClass}`}
              >
                {link.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/* Sub-links fade and rise in (transform/opacity only); nothing under reduced motion. */
const DISCLOSURE_CSS = `@keyframes firefly-footer-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.firefly-footer-in{animation:firefly-footer-in .3s var(--ease-out-soft) both}
@media (prefers-reduced-motion:reduce){.firefly-footer-in{animation:none}}`;

/**
 * "Policies ▾": a real <button aria-expanded aria-controls>. A mouse hover opens the sub-links
 * while the pointer stays; a click / Enter / Space (and a tap on touch screens, which has no hover)
 * pins them open until the next activation; Escape closes everything. They stay in the DOM.
 */
function FooterDisclosure({ link, linkClass }: { link: FooterLink; linkClass: string }) {
  const id = useId();
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || pinned;
  return (
    <li
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHover(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setHover(false);
          setPinned(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setPinned((p) => !p)}
        className={`inline-flex cursor-pointer items-center gap-1 text-[16px] leading-[1.4] tracking-[-0.01em] transition-opacity duration-200 ease-out hover:opacity-70 motion-reduce:transition-none md:text-[17px] ${linkClass}`}
      >
        {link.label}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 opacity-60 transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul id={id} hidden={!open} className="firefly-footer-in mt-1.5 pl-4">
        {link.links!.map((sub) => (
          <li key={sub.label} className="py-0.5">
            <Link
              href={sub.href ?? "#"}
              prefetch={sub.prefetch}
              className={`inline-block text-[15px] leading-[1.5] opacity-80 transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none md:text-[16px] ${linkClass}`}
            >
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
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
    <form {...reveal} onSubmit={handleSubmit} className={`flex w-full max-w-[360px] flex-col items-start gap-5 ${className}`}>
      <label htmlFor={`${id}-email`} className={`text-[12px] leading-[1.3] ${tone.label}`}>
        {label}
      </label>
      <div className={`flex w-full items-center gap-3 border-b pb-1.5 ${tone.input}`}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          onChange={() => done && setDone(false)}
          className="min-w-0 flex-1 bg-transparent p-0 text-[16px] leading-[1.4] tracking-[-0.01em] text-inherit md:text-[17px]"
        />
        <button
          type="submit"
          aria-label={buttonLabel}
          className={`flex size-8 shrink-0 cursor-pointer items-center justify-center transition-[translate,opacity] duration-200 ease-out hover:translate-x-0.5 hover:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-x-0 ${tone.arrow}`}
        >
          <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
