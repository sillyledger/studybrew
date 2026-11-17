export interface Show {
  id: "study" | "story" | "kids" | "why";
  name: string;
  tagline: string;
  description: string;
  dot: string; // tailwind bg class
  level: string;
  audience?: string;
  pageHref?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleUrl?: string;
  castboxUrl?: string;
  kkboxUrl?: string;
  xiaoyuzhouUrl?: string;
  comingSoon?: string; // e.g. "Coming 2027"; shows the card as not yet live
}

export const shows: Show[] = [
  {
    id: "study",
    name: "Study Brew",
    tagline: "Everyday stories",
    description: "Short everyday stories, about 5 minutes each. Daily life, travel and work.",
    dot: "bg-blue",
    level: "B1-B2",
    spotifyUrl: "https://open.spotify.com/show/6YwUpruVGDrJRQE0B0xc1f",
    appleUrl: "https://podcasts.apple.com/podcast/study-brew-english-stories-for-learners-b1-b2/id6820542456",
    youtubeUrl: "https://www.youtube.com/@studybrewcontent",
    castboxUrl: "https://castbox.fm/vh/7445980",
  },
  {
    id: "story",
    name: "Story Brew",
    tagline: "Bedtime stories",
    description: "Bedtime stories. Slow, calm English to fall asleep to.",
    dot: "bg-teal",
    level: "B1-B2",
    spotifyUrl: "https://open.spotify.com/show/0GAoPPFz1IpP5FSIVO5Tkq",
    appleUrl: "https://podcasts.apple.com/podcast/story-brew-b1-b2-english-bedtime-stories-for-learners/id1893692455",
    youtubeUrl: "https://www.youtube.com/@storybrewcontent",
    castboxUrl: "https://castbox.fm/vh/7168522",
  },
  {
    id: "kids",
    name: "Story Valley for Kids",
    tagline: "English stories for kids",
    description: "Simple English stories to share with your child. Read aloud by a non-native speaker, not an AI voice.",
    dot: "bg-coral",
    level: "A1-A2",
    audience: "For parents and kids",
    pageHref: "/stories/story-valley",
    spotifyUrl: "https://open.spotify.com/show/27Wog0yJmW32FzZ9UozwXs",
    appleUrl: "https://podcasts.apple.com/podcast/story-valley-a1-a2-english-stories-for-kids/id6818182854",
    youtubeUrl: "https://www.youtube.com/@StoryValleyKids",
    castboxUrl: "https://castbox.fm/vh/7436136",
    kkboxUrl: "https://podcast.kkbox.com/sg/channel/XaMsi5utgfA-Sd14GR",
    xiaoyuzhouUrl: "https://www.xiaoyuzhoufm.com/podcast/6afa6ef3eb0ec5ac6d196818",
  },
  {
    id: "why",
    name: "Simply Why",
    tagline: "Everyday why questions",
    description: "One everyday “why” question in very easy English. About 3 minutes, with a cup of coffee.",
    dot: "bg-yellow",
    level: "A1-A2",
    audience: "For curious adults",
    comingSoon: "Coming 2027",
  },
];

// Listening platforms in the order every page shows them. `label` is the
// short pill text; `name` is the full platform name for screen readers.
export const PLATFORMS = [
  { key: "spotifyUrl", label: "Spotify", name: "Spotify", ariaLabel: "Listen on Spotify" },
  { key: "appleUrl", label: "Apple", name: "Apple Podcasts", ariaLabel: "Listen on Apple Podcasts" },
  { key: "youtubeUrl", label: "YouTube", name: "YouTube", ariaLabel: "Watch on YouTube" },
  { key: "castboxUrl", label: "Castbox", name: "Castbox", ariaLabel: "Listen on Castbox" },
  { key: "kkboxUrl", label: "KKBOX", name: "KKBOX", ariaLabel: "Listen on KKBOX" },
  { key: "xiaoyuzhouUrl", label: "小宇宙", name: "小宇宙", ariaLabel: "在小宇宙收听" },
] as const satisfies readonly { key: keyof Show; label: string; name: string; ariaLabel: string }[];

export interface ShowLink {
  href: string;
  label: string;
  ariaLabel: string;
}

/** The show's listening links that have a URL, in platform order. */
export function showLinks(show: Show): ShowLink[] {
  return PLATFORMS.flatMap(({ key, label, ariaLabel }) => {
    const href = show[key];
    return href ? [{ href, label, ariaLabel }] : [];
  });
}
