"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";

/**
 * Modal popup shell (Base). A native <dialog> gives the focus trap, the inert page, Escape and
 * focus restore; motion adds the overlay fade and the panel rise-in (instant under reduced
 * motion). Clicking the overlay, the × or pressing Escape calls `onClose`; the dialog closes once
 * the exit animation has finished. Mark the control that should receive focus on open with
 * `data-autofocus` (otherwise the first input or button in the panel gets it).
 */
export function Popup({
  open,
  onClose,
  labelledBy,
  children,
  closeLabel = "Close",
  width = "max-w-[440px]",
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  /** id of the panel's heading */
  labelledBy: string;
  children: ReactNode;
  /** Accessible name of the × button */
  closeLabel?: string;
  /** Tailwind max-width class for the panel */
  width?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Show the native dialog (modal), lock the page scroll, move focus into the panel
  useEffect(() => {
    const d = ref.current;
    if (!d || !open) return;
    if (!d.open) d.showModal();
    const panel = panelRef.current;
    (panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>("input, button"))?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // The native dialog closes once the exit animation has finished
  const onExitComplete = () => {
    const d = ref.current;
    if (d?.open) d.close();
  };
  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (open) onClose();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-visible border-0 bg-transparent p-0 text-text-primary backdrop:bg-transparent"
    >
      <AnimatePresence onExitComplete={onExitComplete}>
        {open ? (
          <motion.div
            key="overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-surface-inverse/40 px-4 backdrop-blur-sm"
          >
            <motion.div
              key="panel"
              ref={panelRef}
              onClick={stop}
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
              className={`relative w-full ${width} rounded-card bg-surface-primary p-6 shadow-[var(--shadow-card-drop),0_0_0_0.5px_var(--color-border-16)] md:p-8 ${className}`}
            >
              {children}
              <IconButton aria-label={closeLabel} onClick={onClose} className="absolute right-4 top-4 md:right-5 md:top-5">
                <CloseIcon />
              </IconButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}

/** 16px × for IconButton */
export function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Check mark for confirmations */
export function CheckIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M4.5 11.5l4.2 4.2L17.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
