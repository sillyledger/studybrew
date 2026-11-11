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
export const ROADMAP_UPDATED = "Nov 11, 2026";

/** Milestones on the road to beta. The cup fills by done / total. */
export const BETA_MILESTONES: BetaMilestone[] = [
  { title: "New design and sidebar", done: true },
  { title: "Account and settings", done: true },
  { title: "Notes replace Paste", done: true },
  { title: "Notebooks and notes", done: false },
  { title: "Words in one place", done: false },
  { title: "Review sessions", done: false },
  { title: "Real streaks", done: false },
  { title: "Testing and beta", done: false },
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
    title: "One home for your words",
    description:
      "Every saved word lives in one place, wherever you saved it: a note, a story or a deck.",
    progress: { done: 2, total: 4 },
    date: "Started Nov 11",
  },
  {
    stage: "brewing",
    title: "Review that sticks",
    description: "Short daily sessions that bring words back right before you forget them.",
    progress: { done: 1, total: 3 },
    date: "Started Nov 11",
  },
  {
    stage: "brewing",
    title: "Stories reader",
    description: "Read the Study Brew stories chapter by chapter and save words as you go.",
    progress: { done: 2, total: 3 },
    date: "Started Nov 10",
  },

  // Next pour
  {
    stage: "next",
    title: "Listen while you read",
    description: "Every story episode with its audio, played right next to the text.",
    date: "Up next",
  },
  {
    stage: "next",
    title: "Real streaks",
    description: "Your daily streak and goal, based on what you actually read and review.",
    date: "Planned",
  },
  {
    stage: "next",
    title: "Learning settings",
    description: "Pick a daily goal and choose how definitions show up.",
    date: "Planned",
  },
  {
    stage: "next",
    title: "Works from anywhere",
    description: "Tested and fast for learners in mainland China and beyond.",
    date: "Planned",
  },

  // Served
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
];

export function itemsForStage(stage: Stage): RoadmapItem[] {
  return ROADMAP_ITEMS.filter((item) => item.stage === stage);
}

export function betaProgress() {
  const total = BETA_MILESTONES.length;
  const done = BETA_MILESTONES.filter((m) => m.done).length;
  return { done, total, fraction: total === 0 ? 0 : done / total };
}
