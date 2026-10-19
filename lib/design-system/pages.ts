/** Design-system pages, in sidebar order. Each is one route under /design-system (like Figma pages). */
export type DesignSystemPage = { id: string; name: string; href: string; description: string };

export const DESIGN_SYSTEM_PAGES: DesignSystemPage[] = [
  { id: "buttons", name: "Buttons", href: "/design-system/buttons", description: "Pill buttons, icon buttons, switch tabs and pagination dots." },
  { id: "typography", name: "Typography", href: "/design-system/typography", description: "Headline scale, body sizes, labels and the two-tone rule." },
  { id: "colours", name: "Colours", href: "/design-system/colours", description: "Every colour token read live from firefly.css." },
  { id: "motion", name: "Motion", href: "/design-system/motion", description: "Reveal, hover, easing and duration rules." },
  { id: "spacing", name: "Spacing & radii", href: "/design-system/spacing", description: "Breakpoints, section rhythm, containers, radii and shadows." },
  { id: "install", name: "Install", href: "/design-system/install", description: "The Base package every site installs first." },
];

export const DESIGN_SYSTEM_HOME = DESIGN_SYSTEM_PAGES[0].href;
