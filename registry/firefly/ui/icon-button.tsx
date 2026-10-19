import type { ComponentPropsWithoutRef } from "react";

/**
 * Round icon-only button (carousel arrows, close, play/pause). Secondary = white with the
 * button shadow, like the ElevenLabs testimonial arrows (32px, 16px chevron, 2px stroke).
 * Always pass `aria-label`.
 */
export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonVariant = "secondary" | "primary" | "secondary-on-dark";

const sizes: Record<IconButtonSize, string> = { sm: "size-8", md: "size-10", lg: "size-11" };
const variants: Record<IconButtonVariant, string> = {
  secondary: "bg-button-secondary text-button-content-secondary shadow-button hover:bg-button-secondary-hover",
  primary: "bg-button-primary text-button-content-primary hover:bg-button-primary-hover",
  "secondary-on-dark": "bg-transparent text-text-on-dark shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] hover:bg-text-on-dark/10",
};

export function IconButton({
  size = "sm",
  variant = "secondary",
  className = "",
  type = "button",
  ...rest
}: { size?: IconButtonSize; variant?: IconButtonVariant; className?: string } & ComponentPropsWithoutRef<"button"> & { "aria-label": string }) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded-pill transition-[background-color,color,box-shadow] duration-150 ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    />
  );
}

/** 16px chevrons with a 2px stroke, for IconButton */
export function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function PauseIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <rect x="4" y="3" width="3" height="10" rx="1" />
      <rect x="9" y="3" width="3" height="10" rx="1" />
    </svg>
  );
}
export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M5 3.5v9l7-4.5-7-4.5Z" />
    </svg>
  );
}
