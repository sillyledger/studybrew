// Help Center topics and articles, in the order they appear in the sidebar
// and in Previous / Next links. Set live: true once an article page exists
// at /help/[topic]/[article].

export type HelpDot = "teal" | "blue" | "coral" | "yellow";

export type HelpArticle = {
  topic: string;
  slug: string;
  title: string;
  description: string;
  live: boolean;
};

export type HelpTopic = {
  slug: string;
  title: string;
  dot: HelpDot;
  articles: HelpArticle[];
};

type ArticleInput = Omit<HelpArticle, "topic" | "live"> & { live?: boolean };

function topic(slug: string, title: string, dot: HelpDot, articles: ArticleInput[]): HelpTopic {
  return {
    slug,
    title,
    dot,
    articles: articles.map((a) => ({ ...a, topic: slug, live: a.live ?? false })),
  };
}

export const HELP_TOPICS: HelpTopic[] = [
  topic("getting-started", "Getting started", "teal", [
    {
      slug: "get-started-in-5-minutes",
      title: "Get started in 5 minutes",
      description: "Read a short story, tap a word and save it, no account needed.",
      live: true,
    },
    {
      slug: "trying-without-an-account",
      title: "Trying it without an account",
      description: "What you can do as a guest, and what an account keeps for you.",
    },
    {
      slug: "using-on-your-phone",
      title: "Using it on your phone",
      description: "Study Brew in your phone's browser, with the mobile menu.",
    },
  ]),
  topic("notes-notebooks", "Notes & notebooks", "blue", [
    {
      slug: "import-into-a-note",
      title: "Import into a note",
      description: "Bring in a web page, a Word file, a PDF or your own text as a note in Study Brew.",
      live: true,
    },
    {
      slug: "notebooks-and-folders",
      title: "Notebooks & folders",
      description: "Keep notes by class, topic or goal.",
    },
    {
      slug: "search-and-trash",
      title: "Search and trash",
      description: "Find any note with ⌘K, and bring back notes from the trash.",
    },
  ]),
  topic("words-review", "Words & review", "coral", [
    {
      slug: "tap-a-word-save-it",
      title: "Tap a word, save it",
      description: "See a meaning right under the word and save it to your list.",
    },
    {
      slug: "how-reviewing-works",
      title: "How reviewing works",
      description: "Why saved words return tomorrow, what the cup means, how streaks count.",
    },
    {
      slug: "export-your-words",
      title: "Export your words",
      description: "Download your saved words as CSV or Excel.",
    },
  ]),
  topic("stories-audio", "Stories & audio", "yellow", [
    {
      slug: "listening-to-stories",
      title: "Listening to stories",
      description: "Play a story with the transcript, at your level.",
    },
    {
      slug: "saving-words-from-stories",
      title: "Saving words from stories",
      description: "Tap words in a story and save them for review.",
    },
  ]),
  topic("account-plans", "Account & plans", "teal", [
    {
      slug: "free-and-plus",
      title: "Free and Plus",
      description: "What each plan includes, and its limits.",
    },
    {
      slug: "beta-codes",
      title: "Beta codes",
      description: "How to use a Beta code to get Study Brew Plus.",
    },
  ]),
  topic("privacy-data", "Privacy & data", "blue", [
    {
      slug: "what-study-brew-stores",
      title: "What Study Brew stores",
      description: "The data Study Brew keeps, and why.",
    },
    {
      slug: "export-or-delete-your-data",
      title: "Export or delete your data",
      description: "Download everything, or delete your account and data.",
    },
  ]),
];

export const HELP_ARTICLES: HelpArticle[] = HELP_TOPICS.flatMap((t) => t.articles);

export function helpArticleHref(article: Pick<HelpArticle, "topic" | "slug">): string {
  return `/help/${article.topic}/${article.slug}`;
}

export function getHelpTopic(slug: string): HelpTopic | undefined {
  return HELP_TOPICS.find((t) => t.slug === slug);
}

export function getHelpArticle(topicSlug: string, articleSlug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.topic === topicSlug && a.slug === articleSlug);
}

/** The nearest live articles before and after this one, in HELP_ARTICLES order. */
export function getHelpNeighbours(topicSlug: string, articleSlug: string) {
  const live = HELP_ARTICLES.filter((a) => a.live);
  const i = live.findIndex((a) => a.topic === topicSlug && a.slug === articleSlug);
  if (i === -1) return { prev: undefined, next: undefined };
  return { prev: live[i - 1], next: live[i + 1] };
}
