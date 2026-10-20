"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Popup } from "@/components/ui/popup";

export type SignupPopupProps = {
  open: boolean;
  onClose: () => void;
  /** Receives the email once it passes validation. Return a promise to show the pending label while it runs; throw to show `failedMessage`. */
  onSubmit: (email: string) => void | Promise<void>;
  title: string;
  /** One short sentence under the title */
  body?: string;
  emailLabel?: string;
  placeholder?: string;
  submitLabel?: string;
  pendingLabel?: string;
  invalidMessage?: string;
  failedMessage?: string;
  /** Small reassurance line under the button, e.g. "No spam, just the launch." */
  note?: string;
  /**
   * Thank-you view that crossfades in inside the popup after a successful submit (V1), e.g.
   * <ThankYouPanel …/> from the Thank-you Popup. Omit it and the popup closes instead (V2: show the
   * Thank-you Bar from `onSubmit`).
   */
  success?: ReactNode;
  closeLabel?: string;
};

/**
 * Sign-up Popup v1: a modal with one labelled email field and a primary button. Validates inline
 * (reserved error slot, no layout shift), then either crossfades to the `success` view inside the
 * popup or closes and leaves the confirmation to the site. Built on the Base <Popup>.
 */
export function SignupPopup({
  open,
  onClose,
  onSubmit,
  title,
  body,
  emailLabel = "Email address",
  placeholder = "name@example.com",
  submitLabel = "Join",
  pendingLabel = "Joining…",
  invalidMessage = "Enter a valid email address.",
  failedMessage = "Something went wrong. Please try again.",
  note,
  success,
  closeLabel = "Close",
}: SignupPopupProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // A fresh form every time the popup opens
  useEffect(() => {
    if (open) {
      setDone(false);
      setPending(false);
      setError(null);
    }
  }, [open]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input || pending) return;
    if (!input.value.trim() || !input.checkValidity()) {
      setError(invalidMessage);
      input.focus();
      return;
    }
    setError(null);
    try {
      setPending(true);
      await onSubmit(input.value.trim());
    } catch {
      setPending(false);
      setError(failedMessage);
      return;
    }
    setPending(false);
    if (success) setDone(true);
    else onClose();
  };

  const view = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <Popup open={open} onClose={onClose} labelledBy={`${id}-title`} closeLabel={closeLabel}>
      <AnimatePresence mode="wait" initial={false}>
        {done && success ? (
          <motion.div key="done" {...view}>
            {success}
          </motion.div>
        ) : (
          <motion.form key="form" {...view} onSubmit={submit} noValidate className="flex flex-col">
            <h2 id={`${id}-title`} className="pr-10 text-[22px] leading-[1.3] tracking-[-0.02em] md:text-[24px]">
              {title}
            </h2>
            {body ? <p className="mt-2 text-[15px] leading-[1.55] text-text-tertiary md:text-[16px]">{body}</p> : null}
            <label htmlFor={`${id}-email`} className="mt-6 text-[13px] font-medium leading-5 md:text-[14px]">
              {emailLabel}
            </label>
            <input
              ref={inputRef}
              id={`${id}-email`}
              data-autofocus
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              disabled={pending}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={() => error && setError(null)}
              className={`mt-2 h-11 w-full rounded-tile bg-surface-primary px-4 text-[15px] text-text-primary placeholder:text-text-placeholder focus:outline-2 focus:outline-offset-1 focus:outline-border-interactive disabled:opacity-60 md:text-[16px] ${
                error ? "shadow-[0_0_0_1px_var(--color-status-negative)]" : "shadow-[0_0_0_0.5px_var(--color-border-24)]"
              }`}
            />
            {/* Reserved slot: the error never shifts the layout */}
            <p id={`${id}-error`} role="alert" className="mt-2 min-h-5 text-[13px] leading-5 text-status-negative">
              {error}
            </p>
            <Button type="submit" variant="primary" size="lg" className="mt-3 w-full" disabled={pending}>
              {pending ? pendingLabel : submitLabel}
            </Button>
            {note ? <p className="mt-4 text-center text-[12px] leading-[1.4] text-text-quaternary md:text-[13px]">{note}</p> : null}
          </motion.form>
        )}
      </AnimatePresence>
    </Popup>
  );
}
