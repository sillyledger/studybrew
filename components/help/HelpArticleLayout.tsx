import Nav from "@/components/Nav";
import HelpSidebar from "./HelpSidebar";

/**
 * Page shell for a Help article: Nav, then a sidebar (240px) beside the
 * article column (max 660px). Below 860px the sidebar stacks above.
 */
export default function HelpArticleLayout({
  topic,
  article,
  children,
}: {
  topic: string;
  article?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="mx-auto w-full max-w-[1120px] px-6 pb-20 pt-12 md:px-14 md:pt-14">
        <div className="grid gap-10 min-[860px]:grid-cols-[240px_minmax(0,660px)] min-[860px]:gap-16">
          <HelpSidebar activeTopic={topic} activeArticle={article} />
          <article className="min-w-0">{children}</article>
        </div>
      </div>
    </main>
  );
}
