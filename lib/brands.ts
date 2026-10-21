export type Brand = {
  id: string;
  name: string;
  description: string;
};

/** Brands whose product UI lives in the "UI Components" tab. Ids match `meta.brand` of app items. */
export const BRANDS: Brand[] = [
  { id: "verb", name: "Verb", description: "Verb Reader: a feed of favourite content with summaries, audio and interests." },
];

export const brandById = (id: string) => BRANDS.find((b) => b.id === id);
