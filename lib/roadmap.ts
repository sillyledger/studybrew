// All content for the public roadmap page (/roadmap) lives here.
// Edit this file to update the roadmap; the page itself never needs changing.
// Section counts and the beta cup on the page are calculated from this data.

export type Stage = "brewing" | "next" | "served" | "someday";

export type RoadmapItem = {
  title: string;
  description: string;
  stage: Stage;
  /** Free text shown next to the item, e.g. "Started Nov 11", "Up next", "Sep". */
  date?: string;
  /** When set, a "Build log ↗" link is shown. Leave out to hide it. */
  buildLogUrl?: string;
  /** Only used for "brewing" items: how many steps are done out of the total. */
  progress?: { done: number; total: number };
};

export type BetaMilestone = {
  title: string;
  done: boolean;
};

/** Shown in the page header: "Public roadmap, updated …". */
export const ROADMAP_UPDATED = "Nov 13, 2026";

/** Milestones on the road to beta. The cup fills by done / total. */
export const BETA_MILESTONES: BetaMilestone[] = [
  { title: "Notes and notebooks", done: true },
  { title: "Tap a word and save it", done: true },
  { title: "New design", done: true },
  { title: "One home for your words", done: true },
  { title: "Review that sticks", done: true },
  { title: "A library to read from", done: false },
  { title: "Listen while you read", done: false },
  { title: "Works from anywhere", done: false },
];

/** Section copy for each stage, in the order the sections appear on the page. */
export const STAGES: {
  stage: Stage;
  tag: string;
  heading: string;
  text: string;
}[] = [
  {
    stage: "brewing",
    tag: "● Brewing now",
    heading: "On the stove.",
    text: "Being built right now. Fewer features, done properly.",
  },
  {
    stage: "next",
    tag: "○ Next pour",
    heading: "Coming soon.",
    text: "Decided and lined up. These start once the current brew is done.",
  },
  {
    stage: "served",
    tag: "✓ Served",
    heading: "In your cup.",
    text: "Live in the app today.",
  },
  {
    stage: "someday",
    tag: "Someday",
    heading: "On the shelf.",
    text: "Ideas we like. Not scheduled yet.",
  },
];

export const ROADMAP_ITEMS: RoadmapItem[] = [
  // Brewing now
  {
    stage: "brewing",
    title: "A library to read from",
    description:
      "Stories with your favourite characters, and short reads by level and topic. The first real reads are live.",
    progress: { done: 2, total: 3 },
    date: "Started Nov 13",
  },
  {
    stage: "brewing",
    title: "Save words while you read",
    description: "Every word you tap in a read goes straight into your words and reviews. Stories come next.",
    progress: { done: 1, total: 2 },
    date: "Started Nov 13",
  },

  // Next pour
  {
    stage: "next",
    title: "Listen while you read",
    description:
      "Every story episode with its audio, played right next to the text, wherever you are.",
    date: "Up next",
  },
  {
    stage: "next",
    title: "Works from anywhere",
    description: "Tested and fast for learners in mainland China and beyond.",
    date: "Planned",
  },
  {
    stage: "next",
    title: "Your first five minutes",
    description: "Pick your level and save your first word in under a minute.",
    date: "Planned",
  },
  {
    stage: "next",
    title: "Reads picked for you",
    description: "See how much of a text you already know, and get the right next read.",
    date: "Planned",
  },
  {
    stage: "next",
    title: "Made for your phone",
    description: "A layout built for learning on the go.",
    date: "Planned",
  },

  // Served, newest first
  {
    stage: "served",
    title: "One home for your words",
    description:
      "Every word and phrase in one place, with its status, next review, filters and export to CSV or Excel.",
    date: "Nov 13",
  },
  {
    stage: "served",
    title: "Review that sticks",
    description:
      "Daily reviews around a cup that fills as words wait for you, with real streaks and weekly progress.",
    date: "Nov 12",
  },
  {
    stage: "served",
    title: "Simple definitions",
    description:
      "Easy definitions written for learners, for 52,000 words. Switch to advanced any time.",
    date: "Nov 12",
  },
  {
    stage: "served",
    title: "Search everything",
    description: "Find any note or notebook in a second, with ⌘K from anywhere.",
    date: "Nov 12",
  },
  {
    stage: "served",
    title: "A safer Trash",
    description:
      "Deleted notes and notebooks wait 30 days, and notes move between notebooks with their words.",
    date: "Nov 12",
  },
  {
    stage: "served",
    title: "Notes replace Paste",
    description: "One simple way in: New note. Paste or write any English text and save words.",
    date: "Nov 11",
  },
  {
    stage: "served",
    title: "Settings",
    description: "Change your name and password from one simple window.",
    date: "Nov 11",
  },
  {
    stage: "served",
    title: "New design",
    description: "A calmer app built around stories and notes, with a new sidebar and Today page.",
    date: "Nov 10",
  },
  {
    stage: "served",
    title: "Tap a word, save it",
    description: "Built-in definitions on every word. Save the ones you don't know with one tap.",
    date: "Sep",
  },
  {
    stage: "served",
    title: "Notebooks and folders",
    description: "Keep your notes organised by topic, class or goal.",
    date: "Sep",
  },

  // Someday
  {
    stage: "someday",
    title: "Short conversations",
    description: "Everyday English dialogues, a new series.",
  },
  {
    stage: "someday",
    title: "Story Valley",
    description: "Simple stories for young learners.",
  },
  {
    stage: "someday",
    title: "Profile photos",
    description: "Make your account yours.",
  },
  {
    stage: "someday",
    title: "Chinese translations",
    description: "See words in Traditional or Simplified Chinese.",
  },
  {
    stage: "someday",
    title: "Apps for iPad, iPhone and Mac",
    description: "Study Brew on every device, even offline.",
  },
];

export function itemsForStage(stage: Stage): RoadmapItem[] {
  return ROADMAP_ITEMS.filter((item) => item.stage === stage);
}

export function betaProgress() {
  const total = BETA_MILESTONES.length;
  const done = BETA_MILESTONES.filter((m) => m.done).length;
  return { done, total, fraction: total === 0 ? 0 : done / total };
}
