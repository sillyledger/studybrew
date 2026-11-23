import Link from "next/link";
import { getHelpNeighbours, helpArticleHref, type HelpArticle } from "@/lib/help";

function Card({ article, dir }: { article: HelpArticle; dir: "prev" | "next" }) {
  return (
    <Link
      href={helpArticleHref(article)}
      className={`block rounded-[12px] border border-line bg-panel-2 px-4 py-3.5 transition-colors hover:border-line-strong hover:bg-panel ${
        dir === "next" ? "text-right sm:col-start-2" : ""
      }`}
    >
      <span className="block text-[0.7rem] font-semibold text-text-muted-2">
        {dir === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="mt-1 block text-[0.9rem] font-bold tracking-[-0.02em] text-text-primary">{article.title}</span>
    </Link>
  );
}

export default function HelpPrevNext({ topic, article }: { topic: string; article: string }) {
  const { prev, next } = getHelpNeighbours(topic, article);
  if (!prev && !next) return null;
  return (
    <nav aria-label="More help articles" className="mt-12 grid gap-3 sm:grid-cols-2">
      {prev && <Card article={prev} dir="prev" />}
      {next && <Card article={next} dir="next" />}
    </nav>
  );
}
