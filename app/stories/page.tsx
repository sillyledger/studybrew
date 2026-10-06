import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CharacterCard from "@/components/CharacterCard";
import StoryValleyCastCard from "@/components/StoryValleyCastCard";
import { characters } from "../../lib/characters";
import { shows } from "../../lib/shows";
import { storyValleyCast } from "../../lib/story-valley";

export const metadata: Metadata = {
  title: "Audio Stories for English Learners | Study Brew",
  description:
    "Short, calm B1–B2 audio stories with real characters. Browse bedtime, daily life, and fantasy stories.",
};

const categories = [
  { name: "Bedtime Stories", slug: "bedtime", description: "Wind down with calm, slow English.", available: true, emoji: "🌙" },
  { name: "Daily Life", slug: "daily-life", description: "Everyday situations, natural English.", available: true, emoji: "☀️" },
  { name: "Travel", slug: "travel", description: "Stories from cities and quiet corners.", available: false, emoji: "✈️" },
  { name: "Career", slug: "career", description: "Work, ambition, and small victories.", available: false, emoji: "💼" },
  { name: "Culture", slug: "culture", description: "Habits, traditions, and human moments.", available: false, emoji: "🌍" },
  { name: "Fantasy", slug: "fantasy", description: "Magical worlds and unexpected adventures.", available: true, emoji: "✨" },
];

// Cycled across live categories only, in order — "Soon" categories always
// get the dashed/unfilled tab regardless of position, so this scales past
// six categories without hardcoding names.
const TAB_COLORS = ["bg-teal", "bg-blue", "bg-coral"];

const kidsShow = shows.find((s) => s.id === "kids");

const SHOW_LINK_CLASS =
  "rounded-full border border-line px-3.5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-teal transition-colors hover:border-teal/60";

export default function Stories() {
  let liveTabIndex = -1;

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
          Audio stories
        </div>
        <h1 className="max-w-[16ch] text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          Find your story.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Short audio stories with real characters and everyday situations,
          written and recorded by a non-native speaker.
        </p>
      </div>

      {/* Notebook spread */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-14">
        <div className="relative grid min-h-[560px] grid-cols-1 overflow-hidden rounded-[22px] bg-panel shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] md:grid-cols-2">
          {/* Spine */}
          <div className="absolute inset-y-[6%] left-1/2 hidden w-px bg-line md:block" />
          <div className="absolute inset-y-[6%] left-1/2 hidden w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/25 to-transparent md:block" />

          {/* Table of contents (categories) */}
          <div className="py-12 pl-12 pr-10 md:pl-[4.5rem]">
            <div className="mb-6 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-text-muted-2">
              Contents
            </div>
            <ul className="list-none">
              {categories.map((cat, i) => {
                if (cat.available) liveTabIndex++;
                const tabClass = cat.available
                  ? TAB_COLORS[liveTabIndex % TAB_COLORS.length]
                  : "border border-dashed border-r-0 border-line";
                const num = String(i + 1).padStart(2, "0");

                const inner = (
                  <>
                    <span
                      className={`absolute -left-[26px] top-1/2 h-8 w-[26px] -translate-y-1/2 rounded-l-[6px] ${tabClass}`}
                    />
                    <span
                      className={`w-[1.6rem] shrink-0 font-mono text-[0.8rem] text-text-muted-2 ${cat.available ? "" : "opacity-50"}`}
                    >
                      {num}
                    </span>
                    <div className={cat.available ? "" : "opacity-50"}>
                      <h3 className="text-[1.2rem] font-bold">{cat.name}</h3>
                      <p className="mt-[0.15rem] text-[0.85rem] text-text-muted">
                        {cat.description}
                      </p>
                    </div>
                    {!cat.available && (
                      <span className="ml-auto shrink-0 self-center rounded-full border border-line px-2 py-[0.2rem] font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-2">
                        Soon
                      </span>
                    )}
                  </>
                );

                return (
                  <li
                    key={cat.slug}
                    className="relative flex items-baseline gap-4 border-b border-dashed border-line-soft py-4 last:border-none"
                  >
                    {cat.available ? (
                      <Link href={`/stories/${cat.slug}`} className="flex w-full items-baseline gap-4">
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex w-full cursor-not-allowed items-baseline gap-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Three shows */}
          <div className="flex flex-col bg-panel-2 py-12 pl-10 pr-12">
            <div className="mb-6 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-text-muted-2">
              Three shows
            </div>
            <div className="flex flex-1 flex-col gap-4">
              {shows.map((show) => (
                <div
                  key={show.id}
                  className="flex flex-1 flex-col rounded-[14px] border border-line bg-panel p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${show.dot}`} />
                    <h3 className="text-[1.45rem] font-black leading-none">{show.name}</h3>
                    <span className="ml-auto shrink-0 rounded-full border border-line px-2 py-[0.2rem] font-mono text-[0.6rem] tracking-wide text-text-muted">
                      {show.level}
                    </span>
                  </div>
                  {show.audience && (
                    <span className="mt-2.5 self-start rounded-full bg-coral-tint px-2.5 py-[0.25rem] font-mono text-[0.6rem] uppercase tracking-[0.1em] text-coral">
                      {show.audience}
                    </span>
                  )}
                  <p className="mt-2.5 text-[0.9rem] leading-[1.5] text-text-muted">
                    {show.description}
                  </p>
                  {(show.spotifyUrl || show.youtubeUrl || show.pageHref) && (
                    <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-4">
                      {show.spotifyUrl && (
                        <a href={show.spotifyUrl} target="_blank" rel="noopener noreferrer" className={SHOW_LINK_CLASS}>
                          Spotify
                        </a>
                      )}
                      {show.youtubeUrl && (
                        <a href={show.youtubeUrl} target="_blank" rel="noopener noreferrer" className={SHOW_LINK_CLASS}>
                          YouTube
                        </a>
                      )}
                      {show.id === "kids" && show.pageHref && (
                        // Plain <a> on purpose: a full page load means analytics
                        // from the previous page never carries over.
                        <a
                          href={show.pageHref}
                          className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.1em] text-coral transition-opacity hover:opacity-80"
                        >
                          Meet Story Valley →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Characters, one shelf per show */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-24 md:px-14">
        <div className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
          Characters
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-[1.05]">
          Who&apos;s in the stories
        </h2>

        <div className="mt-12 flex flex-col gap-[4.5rem]">
          {shows.map((show) => {
            const cast = characters.filter((c) => c.show === show.id);
            if (cast.length === 0) return null;

            return (
              <div key={show.id}>
                <div className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
                  <span className={`h-2.5 w-2.5 shrink-0 self-center rounded-full ${show.dot}`} />
                  <h3 className="text-[1.6rem] font-black leading-none">{show.name}</h3>
                  <span className="text-[0.92rem] text-text-muted">{show.tagline}</span>
                  <span className="ml-auto font-mono text-[0.72rem] text-text-muted">
                    {cast.length} {cast.length === 1 ? "character" : "characters"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:gap-x-7">
                  {cast.map((char, i) => (
                    <CharacterCard key={char.slug} char={char} index={i} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Story Valley shelf. Built from lib/story-valley.ts so these
              characters never get detail pages. */}
          {kidsShow && (
            <div>
              <div className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
                <span className={`h-2.5 w-2.5 shrink-0 self-center rounded-full ${kidsShow.dot}`} />
                <h3 className="text-[1.6rem] font-black leading-none">{kidsShow.name}</h3>
                <span className="text-[0.92rem] text-text-muted">{kidsShow.tagline}</span>
                <span className="ml-auto font-mono text-[0.72rem] text-text-muted">
                  {storyValleyCast.length} characters
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:gap-x-7">
                {storyValleyCast.map((member, i) => (
                  <StoryValleyCastCard
                    key={member.slug}
                    member={member}
                    index={i}
                    href="/stories/story-valley"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
