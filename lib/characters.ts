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
  // Set to true once a real illustration exists at /public/characters/{slug}.png
  hasAvatar: boolean;
  // Set to true while the character has no published stories yet
  comingSoon?: boolean;
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
    hasAvatar: false,
  },
  {
    slug: "daniel",
    name: "Daniel",
    role: "The Quiet Problem-Solver",
    description: "31, developer. Works from home with his cat Biscuit.",
    bio: "Daniel is a 31-year-old developer who works from home with his cat Biscuit. He thinks before he speaks, likes routine, and finds calm, practical solutions to everyday problems.",
    tags: ["31 years old", "Developer", "Works from home"],
    color: "#7EB8C9",
    hasAvatar: false,
  },
  {
    slug: "luna",
    name: "Luna",
    role: "The Wandering Cat",
    description: "Travels with a worn notebook and favourite scarf.",
    bio: "Luna is a cat who travels with a worn notebook and her favourite scarf. She turns up in the most unexpected places, and somehow always finds her way into someone else's story.",
    tags: ["Wandering", "Notebook", "Favourite scarf"],
    color: "#B8A9E8",
    hasAvatar: false,
  },
  {
    slug: "marco",
    name: "Marco",
    role: "The Friendly Neighbour",
    description: "28, community worker. Always cooking for others.",
    bio: "Marco is a 28-year-old community worker who is always cooking for others. He knows everyone on his street by name, and his door is never really closed.",
    tags: ["28 years old", "Community worker", "Always cooking"],
    color: "#A8D5A2",
    hasAvatar: false,
  },
  {
    slug: "princess-maja",
    name: "Princess Maja",
    role: "The Hopeful Princess",
    description: "A princess who keeps her hopes close to her chest.",
    bio: "Princess Maja lives in a world of wooden furniture and old stone walls, but her heart is set on something bigger than the life she was born into. She writes, she waits, and she is braver than she looks.",
    tags: ["Princess", "Bedtime Stories", "Hopeful"],
    color: "#E29B9B",
    hasAvatar: false,
  },
  {
    slug: "caspian",
    name: "Caspian",
    role: "The Rational Wizard",
    description: "60s, wizard. Lives quietly in his tower.",
    bio: "In his 60s, a quiet and slightly absent-minded wizard who has lived alone in a tower for decades. Used to the world arranging itself around him through magic, he has slowly stopped noticing it. Warm beneath his distance, deeply curious when reminded how to be.",
    tags: ["Wonder", "Solitude", "Small discoveries", "The cost of habit", "Learning to look again"],
    color: "#7CACDD",
    hasAvatar: false,
    comingSoon: true,
  },
];

export function getCharacter(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}
