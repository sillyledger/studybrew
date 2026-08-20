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

const IDIOMS_CARDS: FlashcardCard[] = [
  { word: "break the ice", pos: "idiom", definition: "to make people feel more comfortable in a social situation", example: "He told a joke to break the ice at the meeting." },
  { word: "piece of cake", pos: "idiom", definition: "something very easy to do", example: "The test was a piece of cake." },
  { word: "under the weather", pos: "idiom", definition: "feeling slightly ill", example: "I'm staying home today, I feel a bit under the weather." },
  { word: "hit the books", pos: "idiom", definition: "to study hard", example: "I need to hit the books before my exam." },
  { word: "once in a blue moon", pos: "idiom", definition: "very rarely", example: "We only eat out once in a blue moon." },
  { word: "cost an arm and a leg", pos: "idiom", definition: "to be very expensive", example: "That new phone cost an arm and a leg." },
  { word: "let the cat out of the bag", pos: "idiom", definition: "to accidentally reveal a secret", example: "She let the cat out of the bag about the surprise party." },
  { word: "on the same page", pos: "idiom", definition: "having the same understanding or opinion as someone else", example: "Let's make sure we're on the same page before we start." },
  { word: "speak of the devil", pos: "idiom", definition: "said when someone you were just talking about suddenly appears", example: "Speak of the devil, here comes Tom now." },
  { word: "hang in there", pos: "idiom", definition: "to stay positive during a difficult situation", example: "Hang in there, the exam will be over soon." },
  { word: "call it a day", pos: "idiom", definition: "to stop working on something for the rest of the day", example: "We've done enough, let's call it a day." },
  { word: "get out of hand", pos: "idiom", definition: "to become difficult to control", example: "The party got out of hand and the neighbors complained." },
  { word: "keep an eye on", pos: "idiom", definition: "to watch or take care of something", example: "Can you keep an eye on my bag while I go to the bathroom?" },
  { word: "miss the boat", pos: "idiom", definition: "to lose a chance to do something", example: "If you don't apply now, you'll miss the boat." },
  { word: "give someone a piece of your mind", pos: "idiom", definition: "to tell someone honestly that you are angry with them", example: "I gave him a piece of my mind after he was late again." },
  { word: "back to square one", pos: "idiom", definition: "to start again from the beginning", example: "Our plan failed, so we're back to square one." },
  { word: "bite the bullet", pos: "idiom", definition: "to force yourself to do something unpleasant", example: "I decided to bite the bullet and finish the report." },
  { word: "hit the nail on the head", pos: "idiom", definition: "to describe exactly what is causing a problem", example: "You hit the nail on the head with that comment." },
  { word: "the ball is in your court", pos: "idiom", definition: "it's your turn to make a decision or take action", example: "I've done my part, now the ball is in your court." },
  { word: "take it with a grain of salt", pos: "idiom", definition: "to not fully believe something", example: "You should take his advice with a grain of salt." },
];

const GRAMMAR_CARDS: FlashcardCard[] = [
  { word: "Present Simple vs Present Continuous", pos: "grammar", definition: "Use the present simple for habits and facts, and the present continuous for actions happening right now.", example: "I work every day, but right now I'm working from home." },
  { word: "Past Simple vs Present Perfect", pos: "grammar", definition: "Use the past simple for finished actions with a specific time, and the present perfect for past actions connected to now.", example: "I visited Paris last year. / I have visited Paris three times." },
  { word: "First Conditional", pos: "grammar", definition: "Use 'if + present simple, will + base verb' to talk about real future possibilities.", example: "If it rains, I will stay home." },
  { word: "Second Conditional", pos: "grammar", definition: "Use 'if + past simple, would + base verb' to talk about unreal or unlikely situations.", example: "If I won the lottery, I would travel the world." },
  { word: "Third Conditional", pos: "grammar", definition: "Use 'if + past perfect, would have + past participle' to talk about impossible past situations.", example: "If I had studied harder, I would have passed the exam." },
  { word: "Passive Voice", pos: "grammar", definition: "Use the passive voice when the action is more important than who did it.", example: "The letter was sent yesterday." },
  { word: "Comparatives and Superlatives", pos: "grammar", definition: "Use comparatives to compare two things and superlatives to compare three or more.", example: "She is taller than me, but he is the tallest in the class." },
  { word: "Countable and Uncountable Nouns", pos: "grammar", definition: "Countable nouns have plural forms, uncountable nouns don't and use words like 'some' or 'much'.", example: "I have three apples, but I need some water." },
  { word: "Modal Verbs of Obligation", pos: "grammar", definition: "Use 'must' and 'have to' to talk about obligation, and 'don't have to' to talk about no obligation.", example: "You must wear a seatbelt, but you don't have to wear a helmet." },
  { word: "Reported Speech", pos: "grammar", definition: "When reporting what someone said, verb tenses usually move one step back.", example: "She said, \"I am tired.\" → She said she was tired." },
  { word: "Relative Clauses", pos: "grammar", definition: "Use 'who', 'which', and 'that' to give more information about a noun.", example: "The man who called you is my brother." },
  { word: "Present Perfect Continuous", pos: "grammar", definition: "Use the present perfect continuous to emphasize the duration of an action that started in the past and continues now.", example: "I have been studying English for three years." },
  { word: "Used to", pos: "grammar", definition: "Use 'used to' to talk about past habits or states that are no longer true.", example: "I used to live in Taipei, but now I live in Tainan." },
  { word: "Gerunds and Infinitives", pos: "grammar", definition: "Some verbs are followed by a gerund (-ing), and others by an infinitive (to + verb).", example: "I enjoy reading, but I want to learn Spanish." },
  { word: "Question Tags", pos: "grammar", definition: "Add a short question at the end of a sentence to confirm information.", example: "You're coming to the party, aren't you?" },
  { word: "Articles: a/an vs the", pos: "grammar", definition: "Use 'a/an' for something general or first mentioned, and 'the' for something specific or already mentioned.", example: "I saw a dog. The dog was very friendly." },
  { word: "Prepositions of Time", pos: "grammar", definition: "Use 'in' for months and years, 'on' for days and dates, and 'at' for specific times.", example: "The meeting is on Monday at 3pm in March." },
  { word: "Phrasal Verbs", pos: "grammar", definition: "A phrasal verb is a verb combined with a preposition or adverb that creates a new meaning.", example: "Can you look after my cat this weekend?" },
  { word: "Present Continuous for Future Plans", pos: "grammar", definition: "Use the present continuous to talk about fixed future arrangements.", example: "I'm meeting my friend tomorrow at noon." },
  { word: "Zero Conditional", pos: "grammar", definition: "Use 'if + present simple, present simple' to talk about general truths and facts.", example: "If you heat ice, it melts." },
];

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
    available: true,
    count: IDIOMS_CARDS.length,
    cards: IDIOMS_CARDS,
  },
  {
    slug: "grammar",
    name: "Grammar",
    description: "The patterns and structures behind natural English.",
    tab: "bg-blue",
    available: true,
    count: GRAMMAR_CARDS.length,
    cards: GRAMMAR_CARDS,
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((cat) => cat.slug === slug);
}
