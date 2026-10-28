import { NewsArticle } from "./news-article-v1";

export default function Preview() {
  return (
    <NewsArticle
      back={null}
      category="Product"
      meta="3 min read"
      title="The headline of the story, long enough to wrap onto a second line"
      lead="One line under the title that says what the story is about."
      listenLabel="Listen · 3m"
      blocks={[
        { type: "p", text: "The opening paragraph of the article sits in a 760px column, which keeps a line at about seventy characters — roughly what is comfortable to read without losing the start of the next line." },
        { type: "h2", text: "A sub-heading inside the article" },
        { type: "p", text: "A second paragraph under the sub-heading, in the same reading size as the first." },
        { type: "ul", items: ["A bullet in the list", "A second bullet"] },
      ]}
      className="pb-16 md:pb-24"
    />
  );
}
