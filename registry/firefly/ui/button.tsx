import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "dark" | "ghost" | "light";
export type ButtonSize = "sm" | "md";

const base =
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-pill font-medium leading-none " +
  "transition-[translate,scale,opacity] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  /** Primary pill on light backgrounds */
  dark: "bg-button-primary text-button-content-primary hover:opacity-85",
  /** Secondary pill on light backgrounds */
  ghost: "border border-border-light bg-surface-primary text-text-primary hover:opacity-70",
  /** Primary pill on dark backgrounds */
  light: "bg-surface-primary text-text-primary hover:opacity-85",
};

// nav button 13px / 34px tall; hero button 14px / 43px tall
const sizes: Record<ButtonSize, string> = {
  sm: "h-[34px] px-4 text-[13px]",
  md: "h-[43px] px-5 text-[14px]",
};

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string };
type AsLink = Common & Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & { href: string };
type AsButton = Common & Omit<ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

/** Pill button. Renders a Next <Link> when `href` is given, otherwise a native <button>. */
export function Button(props: AsLink | AsButton) {
  const { variant = "dark", size = "md", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (rest.href !== undefined) {
    return <Link className={classes} {...(rest as AsLink)} />;
  }
  const { type = "button", ...buttonProps } = rest as AsButton;
  return <button type={type} className={classes} {...buttonProps} />;
}
