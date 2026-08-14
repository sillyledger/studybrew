export type FlashcardCard = {
  word: string;
  pos: string;
  definition: string;
  example: string;
};

export type FlashcardCategory = {
  slug: string;
  name: string;
  description: string;
  tab: string;
  available: boolean;
  count: number;
  cards?: FlashcardCard[];
};

const EVERYDAY_WORDS_CARDS: FlashcardCard[] = [
  {
    word: "worried",
    pos: "adjective",
    definition:
      "feeling nervous or unhappy because you think something bad might happen",
    example: "She was worried about her exam results.",
  },
  {
    word: "convenient",
    pos: "adjective",
    definition: "easy or useful for a particular situation",
    example: "Is it convenient to meet at 3pm instead?",
  },
  {
    word: "tired",
    pos: "adjective",
    definition: "needing rest or sleep",
    example: "I was really tired after the long flight.",
  },
  {
    word: "interested",
    pos: "adjective",
    definition: "wanting to know or learn more about something",
    example: "He was interested in how the machine worked.",
  },
  {
    word: "embarrassed",
    pos: "adjective",
    definition: "feeling shy, awkward, or ashamed",
    example: "He looked embarrassed when he forgot her name.",
  },
  {
    word: "confident",
    pos: "adjective",
    definition: "sure of your own abilities",
    example: "She felt confident before the interview.",
  },
  {
    word: "anxious",
    pos: "adjective",
    definition: "worried or nervous about something",
    example: "I'm anxious about the exam results.",
  },
  {
    word: "flexible",
    pos: "adjective",
    definition: "able to change or adapt easily",
    example: "My work schedule is pretty flexible.",
  },
  {
    word: "reliable",
    pos: "adjective",
    definition: "able to be trusted; consistent",
    example: "He's a reliable person — he always keeps his word.",
  },
  {
    word: "generous",
    pos: "adjective",
    definition: "willing to give more than expected",
    example: "It was generous of you to help without being asked.",
  },
  {
    word: "difficult",
    pos: "adjective",
    definition: "hard to deal with or satisfy",
    example: "He can be difficult when things don't go his way.",
  },
  {
    word: "grateful",
    pos: "adjective",
    definition: "feeling or showing thanks",
    example: "I'm grateful for everything you've done.",
  },
  {
    word: "polite",
    pos: "adjective",
    definition: "having good manners; respectful and considerate",
    example: "It's polite to say thank you.",
  },
  {
    word: "opportunity",
    pos: "noun",
    definition: "a chance to do something",
    example: "This job is a great opportunity for her career.",
  },
  {
    word: "routine",
    pos: "noun",
    definition: "the usual things you do regularly, in order",
    example: "Waking up at 6am is part of my morning routine.",
  },
  {
    word: "deadline",
    pos: "noun",
    definition: "the date or time something must be finished by",
    example: "The deadline for the report is Friday.",
  },
  {
    word: "habit",
    pos: "noun",
    definition: "something you do regularly, often without thinking",
    example: "Checking his phone first thing is a bad habit.",
  },
  {
    word: "decision",
    pos: "noun",
    definition: "a choice you make after thinking about something",
    example: "Moving abroad was a difficult decision.",
  },
  {
    word: "relationship",
    pos: "noun",
    definition: "the way two people or things are connected",
    example: "They have a close relationship with their neighbors.",
  },
  {
    word: "environment",
    pos: "noun",
    definition: "the conditions or surroundings you live or work in",
    example: "She works better in a quiet environment.",
  },
  {
    word: "schedule",
    pos: "noun",
    definition: "a plan of things to do and when to do them",
    example: "My schedule is packed this week.",
  },
  {
    word: "colleague",
    pos: "noun",
    definition: "a person you work with",
    example: "I had lunch with a colleague from the office.",
  },
  {
    word: "neighbor",
    pos: "noun",
    definition: "someone who lives near you",
    example: "Our neighbor is very friendly.",
  },
  {
    word: "task",
    pos: "noun",
    definition: "a piece of work that needs to be done",
    example: "I have a few tasks to finish before dinner.",
  },
  {
    word: "journey",
    pos: "noun",
    definition: "an act of traveling from one place to another",
    example: "Her journey to work takes about 40 minutes.",
  },
];

const VERBS_CARDS: FlashcardCard[] = [
  {
    word: "avoid",
    pos: "verb",
    definition: "to stay away from something or not let it happen",
    example: "She tried to avoid making eye contact.",
  },
  {
    word: "borrow",
    pos: "verb",
    definition: "to take something and return it later",
    example: "Can I borrow your pen for a minute?",
  },
  {
    word: "complain",
    pos: "verb",
    definition: "to say you are unhappy about something",
    example: "He complained about the noise next door.",
  },
  {
    word: "deserve",
    pos: "verb",
    definition: "to have earned something because of your actions",
    example: "She deserves a break after all that work.",
  },
  {
    word: "doubt",
    pos: "verb",
    definition: "to feel unsure about something",
    example: "I doubt he'll arrive on time.",
  },
  {
    word: "encourage",
    pos: "verb",
    definition: "to give someone confidence to do something",
    example: "Her teacher encouraged her to keep trying.",
  },
  {
    word: "escape",
    pos: "verb",
    definition: "to get away from a place or situation",
    example: "The dog escaped through a hole in the fence.",
  },
  {
    word: "improve",
    pos: "verb",
    definition: "to make or become better",
    example: "His English has really improved this year.",
  },
  {
    word: "involve",
    pos: "verb",
    definition: "to include as a necessary part",
    example: "The job involves a lot of travel.",
  },
  {
    word: "manage",
    pos: "verb",
    definition: "to succeed in doing something difficult",
    example: "I managed to finish the report on time.",
  },
  {
    word: "mention",
    pos: "verb",
    definition: "to talk about something briefly",
    example: "She mentioned she might move next year.",
  },
  {
    word: "notice",
    pos: "verb",
    definition: "to become aware of something",
    example: "Did you notice he changed his hairstyle?",
  },
  {
    word: "prevent",
    pos: "verb",
    definition: "to stop something from happening",
    example: "Regular exercise can prevent many health problems.",
  },
  {
    word: "recommend",
    pos: "verb",
    definition: "to suggest something as good or suitable",
    example: "Can you recommend a good restaurant nearby?",
  },
  {
    word: "reduce",
    pos: "verb",
    definition: "to make something smaller or less",
    example: "The company reduced its prices last month.",
  },
  {
    word: "refuse",
    pos: "verb",
    definition: "to say you will not do or accept something",
    example: "He refused to answer the question.",
  },
  {
    word: "remind",
    pos: "verb",
    definition: "to help someone remember something",
    example: "Remind me to call her tomorrow.",
  },
  {
    word: "replace",
    pos: "verb",
    definition: "to put a new thing in place of an old one",
    example: "We need to replace the broken window.",
  },
  {
    word: "suggest",
    pos: "verb",
    definition: "to offer an idea or plan",
    example: "I suggest we leave a bit earlier.",
  },
  {
    word: "suppose",
    pos: "verb",
    definition: "to think something is likely true",
    example: "I suppose you're right.",
  },
  {
    word: "warn",
    pos: "verb",
    definition: "to tell someone about a possible danger",
    example: "She warned him about the icy road.",
  },
  {
    word: "afford",
    pos: "verb",
    definition: "to have enough money or time for something",
    example: "We can't afford a vacation this year.",
  },
  {
    word: "apologize",
    pos: "verb",
    definition: "to say sorry for something",
    example: "He apologized for being late.",
  },
  {
    word: "arrange",
    pos: "verb",
    definition: "to plan or organize something in advance",
    example: "Let's arrange a time to meet.",
  },
  {
    word: "confirm",
    pos: "verb",
    definition: "to state that something is true or certain",
    example: "Please confirm your appointment by email.",
  },
];

// TODO: Idioms/Grammar aren't backed by real deck data yet. Wire up real
// `cards` arrays for them (and drop the static `count`) once written.
export const CATEGORIES: FlashcardCategory[] = [
  {
    slug: "everyday-words",
    name: "Everyday Words",
    description: "The words that come up constantly — start here.",
    tab: "bg-teal",
    available: true,
    count: EVERYDAY_WORDS_CARDS.length,
    cards: EVERYDAY_WORDS_CARDS,
  },
  {
    slug: "verbs",
    name: "Verbs",
    description: "Actions, states, and the words that make sentences move.",
    tab: "bg-blue",
    available: true,
    count: VERBS_CARDS.length,
    cards: VERBS_CARDS,
  },
  {
    slug: "idioms",
    name: "Idioms",
    description: "Phrases that don't mean what they literally say.",
    tab: "bg-coral",
    available: false,
    count: 0,
  },
  {
    slug: "grammar",
    name: "Grammar",
    description: "The patterns and structures behind natural English.",
    tab: "bg-blue",
    available: false,
    count: 0,
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((cat) => cat.slug === slug);
}
