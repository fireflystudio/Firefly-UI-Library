import { NewsIndex } from "./news-index-v1";

/* The library holds no pictures, so the artwork slot is a plain grey block here: enough to show
   the shape of a card (picture, then the type under it) without shipping an image. */
const ITEMS = Array.from({ length: 10 }, (_, i) => ({
  title: "The headline of a story in the index, two lines long",
  href: "#",
  category: ["Product", "Research", "Company"][i % 3],
  meta: "3 min read",
  image: <span className="absolute inset-0 block bg-surface-muted" />,
}));

export default function Preview() {
  return (
    <div className="bg-surface-page py-16 md:py-24">
      <NewsIndex categories={["Product", "Research", "Company"]} items={ITEMS} />
    </div>
  );
}
