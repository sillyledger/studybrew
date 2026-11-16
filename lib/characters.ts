export interface Character {
  slug: string;
  name: string;
  role: string;
  // Short line shown on the character card in /stories
  description: string;
  // Longer paragraph shown on the character detail page
  bio: string;
  tags: string[];
  color: string;
  // Set to true once a real illustration exists at /public/characters/{slug}.svg
  hasAvatar: boolean;
  // Set to true while the character has no published stories yet
  comingSoon?: boolean;
  // Overrides the polaroid card link on /stories, e.g. to point straight at a published story
  href?: string;
  // Which audio show the character belongs to: Study Brew (everyday) or Story Brew (bedtime)
  show: "study" | "story";
  // Possessive pronoun, as the bio uses it ("Start with her first story")
  possessive: "her" | "his" | "their";
}

export const characters: Character[] = [
  {
    slug: "anna",
    name: "Anna",
    role: "The Curious Traveller",
    description: "28, freelance photographer. Always exploring.",
    bio: "Anna is a 28-year-old freelance photographer who is always exploring new places. She notices small details other people miss, and she is never afraid to ask questions or start a conversation with a stranger.",
    tags: ["28 years old", "Freelance photographer", "Curious"],
    color: "#E8A45A",
    hasAvatar: true,
    show: "study",
    possessive: "her",
  },
  {
    slug: "daniel",
    name: "Daniel",
    role: "The Quiet Problem-Solver",
    description: "31, developer. Works from home with his cat Biscuit.",
    bio: "Daniel is a 31-year-old developer who works from home with his cat Biscuit. He thinks before he speaks, likes routine, and finds calm, practical solutions to everyday problems.",
    tags: ["31 years old", "Developer", "Works from home"],
    color: "#7EB8C9",
    hasAvatar: true,
    show: "study",
    possessive: "his",
  },
  {
    slug: "lisa",
    name: "Lisa",
    role: "The New Starter",
    description: "26, marketing assistant. Just started a new job.",
    bio: "Lisa is a 26-year-old marketing assistant who has just started at a small design studio. Before that, she worked in a bookshop for three years. She gets nervous before big moments, but she asks questions, learns fast and always finds her feet.",
    tags: ["26 years old", "Marketing assistant", "New starter"],
    color: "#9DB7E0",
    hasAvatar: true,
    show: "study",
    possessive: "her",
  },
  {
    slug: "mei",
    name: "Mei",
    role: "The Student Abroad",
    description: "23, master's student. Just moved abroad from Taiwan.",
    bio: "Mei is a 23-year-old student from Taiwan who has just moved abroad for her master's degree. Everything is new: the classes, the city, the food and the language. She misses home sometimes, but she is curious, brave and always happy to share a bubble tea.",
    tags: ["23 years old", "Master's student", "From Taiwan"],
    color: "#F2C46B",
    hasAvatar: true,
    comingSoon: true,
    show: "study",
    possessive: "her",
  },
  {
    slug: "marco",
    name: "Marco",
    role: "The Friendly Neighbour",
    description: "28, community worker. Always cooking for others.",
    bio: "Marco is a 28-year-old community worker who is always cooking for others. He knows everyone on his street by name, and his door is never really closed.",
    tags: ["28 years old", "Community worker", "Always cooking"],
    color: "#A8D5A2",
    hasAvatar: true,
    show: "study",
    possessive: "his",
  },
  {
    slug: "luna",
    name: "Luna",
    role: "The Wandering Cat",
    description: "Travels with a worn notebook and favourite scarf.",
    bio: "Luna is a cat who travels with a worn notebook and her favourite scarf. She turns up in the most unexpected places, and somehow always finds her way into someone else's story.",
    tags: ["Wandering", "Notebook", "Favourite scarf"],
    color: "#B8A9E8",
    hasAvatar: true,
    show: "story",
    possessive: "her",
  },
  {
    slug: "princess-maja",
    name: "Princess Maja",
    role: "The Hopeful Princess",
    description: "A princess who keeps her hopes close to her chest.",
    bio: "Princess Maja lives in a world of wooden furniture and old stone walls, but her heart is set on something bigger than the life she was born into. She writes, she waits, and she is braver than she looks.",
    tags: ["Princess", "Bedtime Stories", "Hopeful"],
    color: "#E29B9B",
    hasAvatar: true,
    show: "story",
    possessive: "her",
  },
  {
    slug: "caspian",
    name: "Caspian",
    role: "The Rational Wizard",
    description: "60s, wizard. Lives quietly in his tower.",
    bio: "In his 60s, a quiet and slightly absent-minded wizard who has lived alone in a tower for decades. Used to the world arranging itself around him through magic, he has slowly stopped noticing it. Warm beneath his distance, deeply curious when reminded how to be.",
    tags: ["Wonder", "Solitude", "Small discoveries", "The cost of habit", "Learning to look again"],
    color: "#7CACDD",
    hasAvatar: true,
    href: "/stories/caspian-and-the-lost-magic",
    show: "story",
    possessive: "his",
  },
];

export function getCharacter(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}
