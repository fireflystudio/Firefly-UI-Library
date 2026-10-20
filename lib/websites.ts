export type Website = {
  id: string;
  name: string;
  description: string;
  /** Live site; omit until deployed */
  url?: string;
  github?: string;
  /** Screenshot in public/images/websites/ (16:10) */
  thumbnail?: string;
  year: string;
};

export const WEBSITES: Website[] = [
  {
    id: "startupmap",
    name: "Startupmap",
    description:
      "Marketing site for an AI venture-intelligence product: home, investors, founders and reader pages. The library's first patterns were distilled from this build.",
    github: "https://github.com/lukasznosekk/Startupmap",
    thumbnail: "/images/websites/startupmap.jpg",
    year: "2026",
  },
  {
    id: "solve",
    name: "Solve",
    description: "Five-page site for a health company (Platform, Health, Labs, Spinealign): photo heroes, scroll-driven steps, a product carousel, a navigation dropdown and the sign-up popup flow.",
    url: "https://solve-inky.vercel.app",
    github: "https://github.com/lukasznosekk/Solve",
    year: "2026",
  },
];
