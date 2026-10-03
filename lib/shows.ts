export interface Show {
  id: "study" | "story";
  name: string;
  tagline: string;
  description: string;
  dot: string; // tailwind bg class
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
    spotifyUrl: "",
    youtubeUrl: "https://www.youtube.com/@studybrewcontent",
  },
  {
    id: "story",
    name: "Story Brew",
    tagline: "Bedtime stories",
    description: "Bedtime stories. Slow, calm English to fall asleep to.",
    dot: "bg-teal",
    spotifyUrl: "https://open.spotify.com/show/0GAoPPFz1IpP5FSIVO5Tkq",
    youtubeUrl: "https://www.youtube.com/@storybrewcontent",
  },
];
