import Link from "next/link";
import { HELP_TOPICS, helpArticleHref, type HelpDot } from "@/lib/help";
import SoonTag from "./SoonTag";

const DOT: Record<HelpDot, string> = {
  teal: "bg-teal",
  blue: "bg-blue",
  coral: "bg-coral",
  yellow: "bg-yellow",
};

export default function HelpSidebar({
  activeTopic,
  activeArticle,
}: {
  activeTopic?: string;
  activeArticle?: string;
}) {
  return (
    <aside className="self-start min-[860px]:sticky min-[860px]:top-24">
      <Link
        href="/help"
        className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-text-muted transition-colors hover:text-text-primary"
      >
        ← Help Center
      </Link>

      <nav aria-label="Help articles" className="mt-6 flex flex-col gap-6">
        {HELP_TOPICS.map((topic) => (
          <div key={topic.slug}>
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-[2px] ${DOT[topic.dot]}`} />
              <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-text-muted-2">
                {topic.title}
              </span>
            </div>
            <ul className="border-l border-line">
              {topic.articles.map((article) => {
                const active = article.topic === activeTopic && article.slug === activeArticle;
                if (!article.live) {
                  return (
                    <li
                      key={article.slug}
                      className="flex items-center gap-2 py-1.5 pl-3.5 text-[0.8rem] text-text-muted opacity-50"
                    >
                      <span className="min-w-0">{article.title}</span>
                      <SoonTag />
                    </li>
                  );
                }
                return (
                  <li key={article.slug}>
                    <Link
                      href={helpArticleHref(article)}
                      aria-current={active ? "page" : undefined}
                      className={`-ml-px block border-l-2 py-1.5 pl-3.5 text-[0.8rem] transition-colors ${
                        active
                          ? "border-teal font-semibold text-text-primary"
                          : "border-transparent text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
