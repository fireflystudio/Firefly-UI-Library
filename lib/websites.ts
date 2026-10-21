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
    description: "An AI venture-intelligence platform that helps investors and founders find, assess and reach the right deals.",
    url: "https://startupmap-mu.vercel.app",
    github: "https://github.com/lukasznosekk/Startupmap",
    thumbnail: "/images/websites/startupmap.jpg",
    year: "2026",
  },
  {
    id: "solve",
    name: "Solve",
    description: "A seed-stage health company building software, devices and products that improve patient outcomes.",
    url: "https://solve-inky.vercel.app",
    github: "https://github.com/lukasznosekk/Solve",
    thumbnail: "/images/websites/solve.jpg",
    year: "2026",
  },
  {
    id: "verb",
    name: "Verb",
    description: "Verb Reader is a feed of your favourite content, with summaries, audio and suggestions that matter to you.",
    url: "https://verb-rho.vercel.app",
    github: "https://github.com/lukasznosekk/Verb",
    thumbnail: "/images/websites/verb.jpg",
    year: "2026",
  },
];
