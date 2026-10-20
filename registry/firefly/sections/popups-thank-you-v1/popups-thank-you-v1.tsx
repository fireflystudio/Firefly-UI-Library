"use client";

import { useId, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, Popup } from "@/components/ui/popup";

export type ThankYouPanelProps = {
  title: string;
  body?: string;
  closeLabel?: string;
  onClose: () => void;
  /** Icon in the circle; the Base check mark by default */
  icon?: ReactNode;
  /** id for the heading (Popup's labelledBy); generated when omitted */
  id?: string;
};

const focusOnMount = (el: HTMLElement | null) => el?.focus();

/**
 * The confirmation itself: an icon in a soft circle, a short title, one line of body and a full-width
 * Close button. Use it standalone inside <ThankYouPopup> or pass it as the `success` view of the
 * Sign-up Popup (V1 flow, where it crossfades in over the form). Focus lands on the title when it
 * mounts, so screen readers hear the confirmation.
 */
export function ThankYouPanel({ title, body, closeLabel = "Close", onClose, icon, id }: ThankYouPanelProps) {
  const generated = useId();
  const headingId = id ?? `${generated}-title`;
  return (
    <div className="flex flex-col items-start">
      <span aria-hidden className="flex size-12 items-center justify-center rounded-pill bg-surface-muted text-text-primary">
        {icon ?? <CheckIcon />}
      </span>
      <h2 id={headingId} ref={focusOnMount} tabIndex={-1} className="mt-5 text-[22px] leading-[1.3] tracking-[-0.02em] outline-none md:text-[24px]">
        {title}
      </h2>
      {body ? <p className="mt-2 text-[15px] leading-[1.55] text-text-tertiary md:text-[16px]">{body}</p> : null}
      <Button type="button" variant="primary" size="lg" className="mt-6 w-full" onClick={onClose}>
        {closeLabel}
      </Button>
    </div>
  );
}

export type ThankYouPopupProps = Omit<ThankYouPanelProps, "id"> & { open: boolean };

/** Thank-you Popup v1: the confirmation panel in its own modal popup (Base <Popup>). */
export function ThankYouPopup({ open, onClose, ...panel }: ThankYouPopupProps) {
  const id = useId();
  return (
    <Popup open={open} onClose={onClose} labelledBy={`${id}-title`} closeLabel={panel.closeLabel}>
      <ThankYouPanel {...panel} id={`${id}-title`} onClose={onClose} />
    </Popup>
  );
}
