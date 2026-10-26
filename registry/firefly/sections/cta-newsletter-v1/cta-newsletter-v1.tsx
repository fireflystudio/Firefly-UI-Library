"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CtaNewsletterProps = {
  /** Section id (anchor) */
  id?: string;
  /** Light page background (default) or the dark section */
  tone?: "dark" | "light";
  /** Small mono label above the heading */
  eyebrow?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** One line under the heading */
  body?: string;
  /** Accessible (visually hidden) label of the email field */
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** Shown in the status slot after a successful submit */
  confirmation?: string;
  /** Small line under the form. Shares the slot with the confirmation, so nothing shifts. */
  privacyNote?: string;
  /** Up to three short ticked items under the form */
  benefits?: string[];
  /** Optional card below the form (e.g. a sample issue). Default none. */
  visual?: ReactNode;
  className?: string;
};

const TONES = {
  dark: {
    section: "bg-surface-dark text-text-on-dark",
    eyebrow: "text-text-on-dark/60",
    body: "text-text-on-dark/60",
    field: "border-transparent bg-surface-primary",
    status: "text-text-on-dark",
    note: "text-text-on-dark/60",
    benefit: "text-text-on-dark/70",
    tick: "text-text-on-dark",
  },
  light: {
    section: "bg-surface-page text-text-primary",
    eyebrow: "text-text-quaternary",
    body: "text-text-nav",
    field: "border-border-light bg-surface-primary",
    status: "text-text-primary",
    note: "text-text-nav",
    benefit: "text-text-nav",
    tick: "text-text-primary",
  },
} as const;

/**
 * CTA Newsletter v1
 * Centred sign-up section: mono eyebrow, two-tone statement heading (30/40/48px), one lead line and a
 * real <form>: a pill with a labelled type="email" input and a dark submit pill. Submitting calls
 * preventDefault and shows the confirmation in a reserved role="status" slot (fixed height, no
 * layout shift); typing again clears it. Optional ticked benefits and a visual slot below.
 *
 * Nothing is sent anywhere until a backend is connected: the submit handler only prevents the
 * default and shows the confirmation. Wire the real request where `setDone(true)` is called.
 */
export function CtaNewsletter({
  id = "newsletter",
  tone = "light",
  eyebrow,
  headline,
  headlineMuted,
  body,
  label = "Email address",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  confirmation = "Thanks — you're on the list.",
  privacyNote,
  benefits,
  visual,
  className = "",
}: CtaNewsletterProps) {
  const t = TONES[tone];
  const headingId = `${id}-heading`;
  const fieldId = useId();
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet: confirm inline only.
    setDone(true);
    e.currentTarget.reset();
  };

  return (
    <section id={id} aria-labelledby={headingId} className={`${t.section} px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex w-full max-w-content flex-col items-center text-center">
        {eyebrow ? (
          <p {...reveal} className={`mb-5 font-mono text-[12px] font-normal uppercase leading-[normal] tracking-[0.08em] md:mb-6 ${t.eyebrow}`}>
            {eyebrow}
          </p>
        ) : null}

        <h2
          {...reveal}
          id={headingId}
          className="max-w-[1000px] text-balance text-[30px] font-normal leading-[1.1] tracking-[-0.025em] md:text-[40px] xl:text-[48px]"
        >
          <TwoTone text={headline} muted={headlineMuted} onDark={tone === "dark"} />
        </h2>

        {body ? (
          <p {...reveal} className={`mt-4 max-w-[600px] text-pretty text-[17px] font-normal leading-[1.4] tracking-[-0.01em] md:mt-5 md:text-[18px] xl:text-[20px] ${t.body}`}>
            {body}
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-[440px] flex-col items-stretch md:mt-10">
          <div
            {...reveal}
            className={`flex w-full items-center gap-2 rounded-pill border p-1.5 pl-5 focus-within:border-border-interactive focus-within:ring-2 focus-within:ring-border-interactive/25 ${t.field}`}
          >
            <label htmlFor={fieldId} className="sr-only">
              {label}
            </label>
            <input
              id={fieldId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              onChange={() => done && setDone(false)}
              className="min-w-0 flex-1 bg-transparent py-2 text-[15px] leading-[normal] text-text-primary outline-none placeholder:text-text-placeholder"
            />
            <Button type="submit" size="sm" className="shrink-0">
              {buttonLabel}
            </Button>
          </div>

          {/* Reserved slot: the privacy note and the confirmation share it, so nothing shifts. */}
          <div {...reveal} className="relative mt-3 h-5 w-full text-[13px] font-normal leading-5 md:text-[14px]">
            {privacyNote ? (
              <p
                aria-hidden={done}
                className={`truncate transition-opacity duration-200 ease-out motion-reduce:transition-none ${done ? "opacity-0" : "opacity-100"} ${t.note}`}
              >
                {privacyNote}
              </p>
            ) : null}
            <p
              role="status"
              className={`absolute inset-x-0 top-0 truncate transition-opacity duration-200 ease-out motion-reduce:transition-none ${done ? "opacity-100" : "opacity-0"} ${t.status}`}
            >
              {done ? confirmation : ""}
            </p>
          </div>
        </form>

        {benefits?.length ? (
          <ul {...reveal} className={`mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] font-normal leading-[normal] ${t.benefit}`}>
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Tick className={t.tick} />
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        {visual ? (
          <div {...reveal} className="mt-10 w-full max-w-[760px] md:mt-14 xl:mt-16">
            {visual}
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none" className={`shrink-0 ${className}`}>
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
