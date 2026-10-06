// Story Valley cast. Kept separate from lib/characters.ts on purpose: that
// file drives the character detail pages and the sitemap, and those pages
// run analytics. The Story Valley page does not.
export interface StoryValleyCharacter {
  slug: string;
  name: string;
  role: string;
  line: string;
}

export const storyValleyCast: StoryValleyCharacter[] = [
  { slug: "sara", name: "Sara", role: "The Curious Girl", line: "Age 6. Always asks, 'What is this?'" },
  { slug: "lucy", name: "Lucy", role: "The Little Orange Cat", line: "Explores the valley on her own." },
  { slug: "tom", name: "Tom", role: "The Little Builder", line: "Age 7. Loves to build, fix and try things." },
];
