import { NewsIndex } from "./news-index-v1";

const ITEMS = Array.from({ length: 6 }, (_, i) => ({
  title: "The headline of a story in the index, two lines long",
  href: "#",
  category: ["Product", "Research", "Company"][i % 3],
  meta: "3 min read",
}));

export default function Preview() {
  return (
    <div className="bg-surface-page py-16 md:py-24">
      <NewsIndex categories={["Product", "Research", "Company"]} items={ITEMS} />
    </div>
  );
}
