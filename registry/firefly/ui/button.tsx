import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Pill button, matched to the ElevenLabs reference: regular weight, three sizes, colour change
 * on hover (no lift), secondary = white with the half-pixel ring + soft shadow (no border).
 *
 * Variants: primary (black) · secondary (white, shadow) · on dark backgrounds: primary-on-dark
 * (white) · secondary-on-dark (transparent with a light ring). The old names dark / ghost /
 * light / ghost-dark still work as aliases.
 * Sizes: sm 36px (nav) · md 40px (tab bars, inline) · lg 44px (hero, section CTAs; default).
 */
export type ButtonVariant = "primary" | "secondary" | "primary-on-dark" | "secondary-on-dark" | "dark" | "ghost" | "light" | "ghost-dark";
export type ButtonSize = "sm" | "md" | "lg";

const ALIASES: Record<string, Exclude<ButtonVariant, "dark" | "ghost" | "light" | "ghost-dark">> = {
  dark: "primary",
  ghost: "secondary",
  light: "primary-on-dark",
  "ghost-dark": "secondary-on-dark",
};

export const buttonBase =
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-pill font-normal " +
  "transition-[background-color,color,box-shadow] duration-150 ease-standard " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive " +
  "disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";

export const buttonVariants = {
  primary: "bg-button-primary text-button-content-primary hover:bg-button-primary-hover",
  secondary: "bg-button-secondary text-button-content-secondary shadow-button hover:bg-button-secondary-hover",
  "primary-on-dark": "bg-surface-primary text-text-primary shadow-button hover:bg-button-secondary-hover",
  "secondary-on-dark": "bg-transparent text-text-on-dark shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] hover:bg-text-on-dark/10",
} as const;

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-[14px] leading-[21px]",
  md: "h-10 gap-1.5 px-4 text-[15px] leading-[22px]",
  lg: "h-11 gap-2 px-5 text-[16px] leading-[24px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "lg", className = "") {
  const v = (ALIASES[variant] ?? variant) as keyof typeof buttonVariants;
  return `${buttonBase} ${buttonVariants[v]} ${buttonSizes[size]} ${className}`;
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string };
type AsLink = Common & Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & { href: string };
type AsButton = Common & Omit<ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

/** Renders a Next <Link> when `href` is given, otherwise a native <button>. */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "lg", className = "", ...rest } = props;
  const classes = buttonClasses(variant, size, className);
  if (rest.href !== undefined) {
    return <Link className={classes} {...(rest as AsLink)} />;
  }
  const { type = "button", ...buttonProps } = rest as AsButton;
  return <button type={type} className={classes} {...buttonProps} />;
}
