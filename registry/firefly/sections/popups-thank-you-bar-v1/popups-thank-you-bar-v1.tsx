"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { CheckIcon, CloseIcon } from "@/components/ui/popup";

export type ThankYouBarProps = {
  open: boolean;
  onClose: () => void;
  /** Bold first part, e.g. "You're in." */
  title: string;
  /** Grey second part, e.g. "We will let you know when we launch." */
  body?: string;
  /** Hide automatically after this many ms; 0 keeps it until dismissed. Pauses while hovered or focused. */
  autoHideMs?: number;
  dismissLabel?: string;
  /** Icon in the circle; the Base check mark by default */
  icon?: ReactNode;
};

/**
 * Thank-you Bar v1 (the "V2" confirmation): a white pill that slides down from the top edge of the
 * page, over the navigation, with the check mark, a bold title, grey body and a × button. Hides
 * itself after `autoHideMs` unless the pointer or focus is on it; `role="status"` so screen readers
 * announce it without stealing focus. Instant under reduced motion.
 */
export function ThankYouBar({ open, onClose, title, body, autoHideMs = 6000, dismissLabel = "Dismiss", icon }: ThankYouBarProps) {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open || paused || !autoHideMs) return;
    const t = window.setTimeout(onClose, autoHideMs);
    return () => window.clearTimeout(t);
  }, [open, paused, autoHideMs, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="pointer-events-none fixed inset-x-4 top-4 z-[60] flex justify-center md:top-5">
          <motion.div
            role="status"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="pointer-events-auto flex w-full max-w-[560px] items-center gap-3 rounded-frame bg-surface-primary py-3 pl-3 pr-2 text-text-primary shadow-[var(--shadow-card-drop),0_0_0_0.5px_var(--color-border-16)] md:rounded-pill md:pl-3.5"
          >
            <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-surface-muted">
              {icon ?? <CheckIcon size={18} />}
            </span>
            <p className="min-w-0 flex-1 text-[14px] leading-[1.35] md:text-[15px]">
              <span className="font-medium">{title}</span>
              {body ? <span className="text-text-tertiary"> {body}</span> : null}
            </p>
            <IconButton aria-label={dismissLabel} onClick={onClose} className="shrink-0 shadow-none">
              <CloseIcon />
            </IconButton>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
