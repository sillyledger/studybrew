import Link from "next/link";
import { getHelpArticle, helpArticleHref } from "@/lib/help";
import SoonTag from "./SoonTag";

const ROW = "flex items-center gap-3 border-b border-line px-4 py-3.5 text-[0.88rem] last:border-b-0";

/**
 * A small bordered list of Help articles. A row is a link when its article
 * is live in lib/help.ts, otherwise muted with a "Soon" tag.
 */
export default function HelpArticleList({ articles }: { articles: { topic: string; slug: string }[] }) {
  return (
    <ul className="my-5 overflow-hidden rounded-[12px] border border-line bg-panel-2">
      {articles.map(({ topic, slug }) => {
        const article = getHelpArticle(topic, slug);
        if (!article) return null;
        return (
          <li key={`${topic}/${slug}`} className="border-b border-line last:border-b-0">
            {article.live ? (
              <Link
                href={helpArticleHref(article)}
                className={`${ROW} font-semibold text-text-primary transition-colors hover:bg-panel`}
              >
                <span className="min-w-0 flex-1">{article.title}</span>
                <span aria-hidden="true" className="shrink-0 text-teal">
                  →
                </span>
              </Link>
            ) : (
              <div className={`${ROW} text-text-muted opacity-50`}>
                <span className="min-w-0">{article.title}</span>
                <SoonTag />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
