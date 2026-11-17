import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CharacterCard from "@/components/CharacterCard";
import StoryValleyCastCard from "@/components/StoryValleyCastCard";
import StoriesBrowser, { type ShowCard } from "@/components/StoriesBrowser";
import { characters } from "@/lib/characters";
import { shows, showLinks } from "@/lib/shows";
import { storyValleyCast } from "@/lib/story-valley";
import { STORY_SHOWS, getStoryList } from "@/lib/stories-list";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Short English Stories for Learners | Study Brew",
  description:
    "Short English stories read by a fellow learner, from A1 to B2. Listen, read along and keep the words you want to remember.",
};

const HEADER_CAST = [
  { slug: "anna", name: "Anna" },
  { slug: "luna", name: "Luna" },
  { slug: "sara", name: "Sara" },
  { slug: "lisa", name: "Lisa" },
  { slug: "caspian", name: "Caspian" },
  { slug: "tom", name: "Tom" },
];

const linksFor = (id: "study" | "story") => {
  const show = shows.find((s) => s.id === id);
  return show ? showLinks(show) : [];
};

const SHOW_CARDS: ShowCard[] = [
  {
    key: "study-brew",
    name: STORY_SHOWS["study-brew"].name,
    color: STORY_SHOWS["study-brew"].color,
    level: "B1–B2",
    description: "Everyday stories, about 5 minutes. Daily life, travel and work.",
    cast: [
      { slug: "anna", name: "Anna" },
      { slug: "daniel", name: "Daniel" },
      { slug: "lisa", name: "Lisa" },
      { slug: "mei", name: "Mei" },
    ],
    links: linksFor("study"),
  },
  {
    key: "story-brew",
    name: STORY_SHOWS["story-brew"].name,
    color: STORY_SHOWS["story-brew"].color,
    level: "B1–B2",
    description: "Bedtime stories. Slow, calm English to fall asleep to.",
    cast: [
      { slug: "luna", name: "Luna" },
      { slug: "princess-maja", name: "Princess Maja" },
      { slug: "caspian", name: "Caspian" },
    ],
    links: linksFor("story"),
  },
  {
    key: "story-valley",
    name: STORY_SHOWS["story-valley"].name,
    color: STORY_SHOWS["story-valley"].color,
    level: "A1–A2",
    description: "Easy stories to share with your child, with Sara, Lucy and Tom.",
    cast: storyValleyCast.map(({ slug, name }) => ({ slug, name })),
    note: "● Played right here · no tracking",
  },
  {
    key: "simply-why",
    name: "Simply Why",
    color: "#F2C46B",
    level: "A1–A2",
    description: "One everyday “why” question in very easy English. About 3 minutes.",
    cast: [],
    comingSoon: "Coming in 2027",
  },
];

const STRIP = [
  { n: 1, title: "Listen", text: "Play it here, at your own speed. No Spotify needed." },
  { n: 2, title: "Read along", text: "The full text, with 3 words to know before you start." },
  {
    n: 3,
    title: "Keep the words",
    text: "Tap a word to see what it means. In the app, it goes to your notes.",
  },
];

export default async function StoriesPage() {
  const stories = await getStoryList();
  const now = Date.now();

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Header */}
        <section className="grid items-center gap-10 pb-14 pt-10 md:grid-cols-[1.4fr_1fr] md:pb-20 md:pt-16">
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
              <span className="h-px w-5 shrink-0 bg-teal-dim" />
              <span>Stories for English learners</span>
            </div>
            <h1 className="text-[clamp(2.8rem,7.5vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              Short stories,
              <br />
              <span className="text-teal">read by a fellow learner.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-text-muted">
              English stories with characters you&apos;ll get to know, from easy A1 to confident
              B2. Read by a non-native speaker who learned English too, so you hear clear, real
              English, not AI voices. Listen, read along, and keep the words you want to remember.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <div className="flex">
              {HEADER_CAST.map((c, i) => (
                <img
                  key={c.slug}
                  src={`/characters/${c.slug}.svg`}
                  alt={c.name}
                  title={c.name}
                  width={76}
                  height={76}
                  className={`h-[58px] w-[58px] rounded-full bg-panel-2 ring-4 ring-background sm:h-[76px] sm:w-[76px] ${
                    i ? "-ml-3 sm:-ml-4" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Shows, filters, featured story and grid */}
        <StoriesBrowser stories={stories} showCards={SHOW_CARDS} now={now} />

        {/* Not just a podcast */}
        <section className="pt-16 md:pt-24">
          <div className="grid overflow-hidden rounded-[22px] border border-line lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
            <div className="bg-gradient-to-br from-teal/[0.14] to-blue/[0.12] p-6 md:p-7">
              <h2 className="text-[1.5rem] font-bold leading-tight">Not just a podcast.</h2>
              <p className="mt-2 text-[0.93rem] leading-[1.6] text-text-muted">
                On Study Brew every story comes with its text, so you can read along and keep the
                words.
              </p>
            </div>
            {STRIP.map((part) => (
              <div key={part.n} className="border-t border-line p-6 md:p-7 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/15 text-[0.8rem] font-bold text-teal">
                    {part.n}
                  </span>
                  <h3 className="text-[1.05rem] font-bold">{part.title}</h3>
                </div>
                <p className="mt-2.5 text-[0.9rem] leading-[1.6] text-text-muted">{part.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the characters */}
        <section className="pb-20 pt-16 md:pb-24 md:pt-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold leading-tight">
              Meet the characters
            </h2>
            <Link
              href="/stories/characters"
              className="shrink-0 whitespace-nowrap border-b border-teal-dim pb-0.5 text-[0.84rem] font-medium text-teal transition-colors hover:border-teal"
            >
              All characters →
            </Link>
          </div>
          <div className="-mx-6 mt-6 overflow-x-auto px-6 md:-mx-14 md:px-14 [scrollbar-width:thin]">
            <ul className="flex gap-6 pb-6 pt-5">
              {characters.map((char, i) => (
                <li key={char.slug} className="w-[150px] shrink-0">
                  <CharacterCard char={char} index={i} />
                </li>
              ))}
              {/* Story Valley cast: plain links into Story Valley, never detail pages. */}
              {storyValleyCast.map((member, i) => (
                <li key={member.slug} className="w-[150px] shrink-0">
                  <StoryValleyCastCard
                    member={member}
                    index={characters.length + i}
                    href="/stories/story-valley"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
