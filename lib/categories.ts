import type { Category, CategoryId } from "./types";

/** Dashboard order */
export const CATEGORIES: Category[] = [
  {
    id: "base",
    name: "Base",
    description: "Install first: design tokens, the reveal and parallax system, buttons and placeholders.",
  },
  { id: "navigation", name: "Navigation", description: "Fixed headers that compact on scroll, with mobile and slide-out menus." },
  { id: "hero", name: "Hero", description: "Above-the-fold openers with a two-tone headline, CTA pair and a large visual." },
  { id: "features", name: "Features", description: "Copy + visual rows: interactive steps, check lists and clickable lenses." },
  { id: "stats", name: "Stats & compare", description: "Numbers that nudge on hover, stat grids and before/after comparisons." },
  { id: "carousels", name: "Carousels", description: "Cover-flow cards with drag, keyboard, autoplay and a pause button." },
  { id: "logos", name: "Logos", description: "Logo marquees that pause on hover and stay static under reduced motion." },
  { id: "bento", name: "Bento", description: "Card grids with product mockups drawn in container-query units." },
  { id: "testimonials", name: "Testimonials", description: "Quotes with attribution on dark or light backgrounds." },
  { id: "faq", name: "FAQ", description: "Accordions with one question open at a time, split or centered." },
  { id: "cta", name: "CTA", description: "Closing calls to action: demo pills and newsletter sign-up." },
  { id: "popups", name: "Pop-ups", description: "Modal sign-up popup, a thank-you popup (V1) and a thank-you bar that slides from the top (V2)." },
  { id: "footer", name: "Footer", description: "Dark footers with link columns and an email sign-up." },
];

export const categoryById = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
