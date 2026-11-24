import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "./HelpArticleLayout";
import { getHelpTopic, helpArticleHref, helpTopicHref, type HelpDot } from "@/lib/help";

const EYEBROW: Record<HelpDot, string> = {
  teal: "text-teal",
  blue: "text-blue",
  coral: "text-coral",
  yellow: "text-yellow",
};

function requireTopic(slug: string) {
  const topic = getHelpTopic(slug);
  if (!topic) throw new Error(`Unknown help topic: ${slug}`);
  return topic;
}

export function helpTopicMetadata(slug: string): Metadata {
  const topic = requireTopic(slug);
  return {
    title: `${topic.title} help | Study Brew`,
    description: topic.intro,
    alternates: { canonical: `https://studybrew.co${helpTopicHref(slug)}` },
  };
}

/** A Help topic page: intro plus a card list of its live articles. */
export default function HelpTopicPage({ slug }: { slug: string }) {
  const topic = requireTopic(slug);
  const articles = topic.articles.filter((a) => a.live);
  return (
    <HelpArticleLayout topic={topic.slug}>
      <div className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] ${EYEBROW[topic.dot]}`}>Help center</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">{topic.title}</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">
        {articles.length} {articles.length === 1 ? "article" : "articles"}
      </p>
      <hr className="mb-6 mt-6 border-line" />

      <p className="my-4 text-[0.92rem] leading-[1.75] text-white/80">{topic.intro}</p>

      <ul className="my-6 overflow-hidden rounded-2xl border border-line bg-panel-2">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-line last:border-b-0">
            <Link
              href={helpArticleHref(article)}
              className="flex items-center gap-3.5 px-4 py-4 transition-colors hover:bg-panel"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[0.92rem] font-semibold tracking-[-0.02em] text-text-primary">
                  {article.title}
                </span>
                <span className="mt-0.5 block text-[0.8rem] leading-[1.45] text-text-muted">{article.description}</span>
              </span>
              <span className="shrink-0 text-teal" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </HelpArticleLayout>
  );
}
