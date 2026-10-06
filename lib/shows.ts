export interface Show {
  id: "study" | "story" | "kids";
  name: string;
  tagline: string;
  description: string;
  dot: string; // tailwind bg class
  level: string;
  audience?: string;
  pageHref?: string;
  spotifyUrl: string;
  youtubeUrl: string;
}

export const shows: Show[] = [
  {
    id: "study",
    name: "Study Brew",
    tagline: "Everyday stories",
    description: "Short everyday stories, about 5 minutes each. Daily life, travel and work.",
    dot: "bg-blue",
    level: "B1-B2",
    spotifyUrl: "",
    youtubeUrl: "https://www.youtube.com/@studybrewcontent",
  },
  {
    id: "story",
    name: "Story Brew",
    tagline: "Bedtime stories",
    description: "Bedtime stories. Slow, calm English to fall asleep to.",
    dot: "bg-teal",
    level: "B1-B2",
    spotifyUrl: "https://open.spotify.com/show/0GAoPPFz1IpP5FSIVO5Tkq",
    youtubeUrl: "https://www.youtube.com/@storybrewcontent",
  },
  {
    id: "kids",
    name: "Story Valley",
    tagline: "English stories for kids",
    description: "Simple English stories to share with your child. Read aloud by a real person, not an AI voice.",
    dot: "bg-coral",
    level: "A1-A2",
    audience: "For parents and kids",
    pageHref: "/stories/story-valley",
    spotifyUrl: "https://open.spotify.com/show/27Wog0yJmW32FzZ9UozwXs",
    youtubeUrl: "https://www.youtube.com/@StoryValleyKids",
  },
];
