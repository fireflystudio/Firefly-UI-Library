import { NewsFeatured } from "./news-featured-v1";

export default function Preview() {
  return (
    <div className="bg-surface-page py-16 md:py-24">
      <NewsFeatured
        category="Product"
        meta="3 min read"
        title="The long headline of the story that opens the news page"
        href="#"
      />
    </div>
  );
}
