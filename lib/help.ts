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
  /** Short intro shown on the topic page and used as its meta description. */
  intro: string;
  articles: HelpArticle[];
};

type ArticleInput = Omit<HelpArticle, "topic" | "live"> & { live?: boolean };

function topic(slug: string, title: string, dot: HelpDot, intro: string, articles: ArticleInput[]): HelpTopic {
  return {
    slug,
    title,
    dot,
    intro,
    articles: articles.map((a) => ({ ...a, topic: slug, live: a.live ?? false })),
  };
}

export const HELP_TOPICS: HelpTopic[] = [
  topic("getting-started", "Getting started", "teal", "First five minutes, guest mode, making an account.", [
    {
      slug: "get-started-in-5-minutes",
      title: "Get started in 5 minutes",
      description: "Save your first word in about a minute, no account needed.",
      live: true,
    },
    {
      slug: "trying-without-an-account",
      title: "Trying it without an account",
      description: "What you can do as a guest, and how to keep your words.",
      live: true,
    },
    {
      slug: "using-on-your-phone",
      title: "Using it on your phone",
      description: "Use Study Brew in your phone's browser.",
      live: true,
    },
  ]),
  topic("notes-notebooks", "Notes & notebooks", "blue", "Importing, notebooks and folders, search and trash.", [
    {
      slug: "import-into-a-note",
      title: "Import into a note",
      description: "Bring in a web page, PDF, Word file or text.",
      live: true,
    },
    {
      slug: "notebooks-and-folders",
      title: "Notebooks & folders",
      description: "Keep your notes in notebooks and coloured folders.",
      live: true,
    },
    {
      slug: "search-and-trash",
      title: "Search and trash",
      description: "Find any note fast, and get deleted ones back.",
      live: true,
    },
  ]),
  topic("words-review", "Words & review", "coral", "Saving words, reviewing them, and exporting them.", [
    {
      slug: "tap-a-word-save-it",
      title: "Tap a word, save it",
      description: "See what a word means and save it.",
      live: true,
    },
    {
      slug: "how-reviewing-works",
      title: "How reviewing works",
      description: "Flip, rate, and empty the cup each day.",
      live: true,
    },
    {
      slug: "export-your-words",
      title: "Export your words",
      description: "Download your words as CSV or Excel.",
      live: true,
    },
  ]),
  topic("stories-audio", "Stories & audio", "yellow", "Listening to stories and saving words from them.", [
    {
      slug: "listening-to-stories",
      title: "Listening to stories",
      description: "Play stories here, on Spotify or Apple Podcasts.",
      live: true,
    },
    {
      slug: "saving-words-from-stories",
      title: "Saving words from stories",
      description: "Save words while you read and listen.",
      live: true,
    },
  ]),
  topic("account-plans", "Account & plans", "teal", "Free and Plus, and beta codes.", [
    {
      slug: "free-and-plus",
      title: "Free and Plus",
      description: "What each plan includes.",
      live: true,
    },
    {
      slug: "beta-codes",
      title: "Beta codes",
      description: "Turn on Plus with a beta code.",
      live: true,
    },
  ]),
  topic("privacy-data", "Privacy & data", "blue", "What Study Brew stores, and how to export or delete it.", [
    {
      slug: "what-study-brew-stores",
      title: "What Study Brew stores",
      description: "What we keep, and what we never do.",
      live: true,
    },
    {
      slug: "export-or-delete-your-data",
      title: "Export or delete your data",
      description: "Download your words or delete your account.",
      live: true,
    },
  ]),
];

export const HELP_ARTICLES: HelpArticle[] = HELP_TOPICS.flatMap((t) => t.articles);

export function helpArticleHref(article: Pick<HelpArticle, "topic" | "slug">): string {
  return `/help/${article.topic}/${article.slug}`;
}

export function helpTopicHref(slug: string): string {
  return `/help/${slug}`;
}

export function getHelpTopic(slug: string): HelpTopic | undefined {
  return HELP_TOPICS.find((t) => t.slug === slug);
}

/** Number of live articles in a topic. */
export function helpTopicCount(slug: string): number {
  return getHelpTopic(slug)?.articles.filter((a) => a.live).length ?? 0;
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
