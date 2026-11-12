import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CharacterCard from "@/components/CharacterCard";
import StoryValleyCastCard from "@/components/StoryValleyCastCard";
import { characters } from "../../lib/characters";
import { shows, showLinks, type Show } from "../../lib/shows";
import { storyValleyCast } from "../../lib/story-valley";

export const metadata: Metadata = {
  title: "Audio Stories for English Learners | Study Brew",
  description:
    "Short, calm B1–B2 audio stories with real characters. Browse bedtime, daily life, and fantasy stories.",
};

interface Category {
  name: string;
  slug: string;
  description: string;
  available: boolean;
  emoji: string;
  /** Pill text for unavailable categories. Defaults to "Soon". */
  soonLabel?: string;
  /** Name of the show this category comes from. Shown in yellow under the
      description, and the row's dashed tab turns yellow to match. */
  fromShow?: string;
}

const categories: Category[] = [
  { name: "Bedtime Stories", slug: "bedtime", description: "Wind down with calm, slow English.", available: true, emoji: "🌙" },
  { name: "Daily Life", slug: "daily-life", description: "Everyday situations, natural English.", available: true, emoji: "☀️" },
  { name: "Travel", slug: "travel", description: "Stories from cities and quiet corners.", available: true, emoji: "✈️" },
  { name: "Career", slug: "career", description: "Work, ambition, and small victories.", available: true, emoji: "💼" },
  {
    name: "Curious Questions",
    slug: "curious-questions",
    description: "Why we do the things we do, in very easy English.",
    available: false,
    emoji: "🤔",
    soonLabel: "2027",
    fromShow: "Simply Why",
  },
  { name: "Fantasy", slug: "fantasy", description: "Magical worlds and unexpected adventures.", available: true, emoji: "✨" },
];

// Cycled across live categories only, in order — "Soon" categories always
// get the dashed/unfilled tab regardless of position, so this scales past
// six categories without hardcoding names.
const TAB_COLORS = ["bg-teal", "bg-blue", "bg-coral"];

const kidsShow = shows.find((s) => s.id === "kids");

const SHOW_LINK_CLASS =
  "whitespace-nowrap rounded-full border border-line px-3.5 py-2.5 font-medium text-[0.7rem] text-teal transition-colors hover:border-teal/60";

// Greyed, non-clickable version of SHOW_LINK_CLASS for shows that aren't out yet.
const SHOW_LINK_DISABLED_CLASS =
  "pointer-events-none whitespace-nowrap rounded-full border border-line px-3.5 py-2.5 font-medium text-[0.7rem] text-text-muted-2";

// Platforms a coming-soon show will be on, shown as greyed pills.
const COMING_SOON_PLATFORMS = ["Spotify", "Apple Podcasts", "Castbox"];

// Audience tag tint per show. Falls back to coral.
const AUDIENCE_TAG_CLASS: Partial<Record<Show["id"], string>> = {
  kids: "bg-coral-tint text-coral",
  why: "bg-yellow/10 text-yellow",
};

// Shows grouped by level, in display order.
const SHOW_GROUPS: { level: string; note: string; ids: Show["id"][] }[] = [
  { level: "A1–A2", note: "Just starting out", ids: ["kids", "why"] },
  { level: "B1–B2", note: "Ready for more", ids: ["study", "story"] },
];

export default function Stories() {
  let liveTabIndex = -1;

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-medium text-[0.8rem] text-teal">
          Audio stories
        </div>
        <h1 className="max-w-[16ch] text-[clamp(2.2rem,4vw,3.1rem)] font-bold leading-[1.02]">
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

          {/* Table of contents (categories). Each row: tab, number, title and
              description. Tab, number and "Soon" pill share the title's line
              height so they all centre on the title line. */}
          <div className="px-6 py-10 sm:px-10 md:py-12 md:pl-12 md:pr-10">
            <div className="mb-6 font-medium text-[0.74rem] text-text-muted-2">
              Contents
            </div>
            <ul className="list-none">
              {categories.map((cat, i) => {
                if (cat.available) liveTabIndex++;
                const tabClass = cat.available
                  ? TAB_COLORS[liveTabIndex % TAB_COLORS.length]
                  : `border-[1.5px] border-dashed ${cat.fromShow ? "border-yellow" : "border-line-strong"}`;
                const num = String(i + 1).padStart(2, "0");
                const dim = cat.available ? "" : "opacity-50";
                const rowClass = "flex w-full items-start gap-4";

                const inner = (
                  <>
                    <span className="flex h-7 shrink-0 items-center" aria-hidden="true">
                      <span className={`block h-6 w-[18px] rounded-[5px] ${tabClass}`} />
                    </span>
                    <span
                      className={`flex h-7 w-[1.6rem] shrink-0 items-center text-[0.8rem] font-medium tabular-nums text-text-muted-2 ${dim}`}
                    >
                      {num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className={dim}>
                        <h3 className="text-[1.2rem] font-bold leading-7">{cat.name}</h3>
                        <p className="mt-[0.15rem] text-[0.85rem] leading-[1.5] text-text-muted">
                          {cat.description}
                        </p>
                      </div>
                      {/* Outside the dimmed wrapper so the yellow stays at full strength. */}
                      {cat.fromShow && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-[0.72rem] font-medium text-yellow">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" aria-hidden="true" />
                          From {cat.fromShow}
                        </div>
                      )}
                    </div>
                    {!cat.available && (
                      <span className="flex h-7 shrink-0 items-center">
                        <span className="rounded-full border border-line px-2 py-[0.2rem] text-[0.68rem] font-medium leading-none text-text-muted-2">
                          {cat.soonLabel ?? "Soon"}
                        </span>
                      </span>
                    )}
                  </>
                );

                return (
                  <li
                    key={cat.slug}
                    className="border-b border-dashed border-line-soft py-4 last:border-none"
                  >
                    {cat.available ? (
                      <Link href={`/stories/${cat.slug}`} className={`group ${rowClass}`}>
                        {inner}
                      </Link>
                    ) : (
                      <div className={`cursor-not-allowed ${rowClass}`}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Four shows, grouped by level */}
          <div className="flex flex-col bg-panel-2 px-6 py-10 sm:px-10 md:py-12 md:pl-10 md:pr-12">
            <div className="mb-6 font-medium text-[0.74rem] text-text-muted-2">
              Four shows
            </div>
            <div className="flex flex-col gap-[1.75rem]">
              {SHOW_GROUPS.map((group) => {
                const groupShows = group.ids
                  .map((id) => shows.find((s) => s.id === id))
                  .filter((s): s is Show => s !== undefined);
                if (groupShows.length === 0) return null;

                return (
                  <div key={group.level}>
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-[0.82rem] font-bold">{group.level}</span>
                      <span className="text-[0.78rem] text-text-muted-2">{group.note}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {groupShows.map((show) => {
                        const links = showLinks(show);
                        const hasPills = links.length > 0 || !!show.comingSoon;
                        const meetHref = show.id === "kids" ? show.pageHref : undefined;

                        return (
                          <div
                            key={show.id}
                            className={`flex flex-col rounded-[14px] border px-[1.15rem] py-4 ${
                              show.comingSoon
                                ? "border-dashed border-line-strong bg-transparent"
                                : "border-line bg-panel"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${show.dot}`} />
                              <h3 className="text-[1.2rem] font-bold leading-none">{show.name}</h3>
                              {/* The group heading already shows the level, so only the audience tag goes here. */}
                              {show.audience && (
                                <span
                                  className={`ml-auto shrink-0 rounded-full px-2.5 py-[0.25rem] font-medium text-[0.68rem] ${
                                    AUDIENCE_TAG_CLASS[show.id] ?? "bg-coral-tint text-coral"
                                  }`}
                                >
                                  {show.audience}
                                </span>
                              )}
                            </div>
                            <p className="mt-2.5 text-[0.9rem] leading-[1.5] text-text-muted">
                              {show.description}
                            </p>
                            {/* Same gap both ways, so wrapped rows stay evenly spaced. */}
                            {hasPills && (
                              <div className="flex flex-wrap items-center gap-2.5 pt-4">
                                {show.comingSoon
                                  ? COMING_SOON_PLATFORMS.map((label) => (
                                      <span key={label} aria-disabled="true" className={SHOW_LINK_DISABLED_CLASS}>
                                        {label}
                                      </span>
                                    ))
                                  : links.map(({ href, label }) => (
                                      <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={SHOW_LINK_CLASS}
                                      >
                                        {label}
                                      </a>
                                    ))}
                              </div>
                            )}
                            {/* Status or page link on its own line under the pills, aligned right. */}
                            {show.comingSoon ? (
                              <div className="mt-3 text-right font-medium text-[0.7rem] text-text-muted-2">
                                {show.comingSoon}
                              </div>
                            ) : (
                              meetHref && (
                                <div className="mt-3 text-right">
                                  {/* Plain <a> on purpose: a full page load means analytics
                                      from the previous page never carries over. */}
                                  <a
                                    href={meetHref}
                                    className="font-medium text-[0.7rem] text-coral transition-opacity hover:opacity-80"
                                  >
                                    Meet Story Valley →
                                  </a>
                                </div>
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Characters, one shelf per show */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-24 md:px-14">
        <div className="mb-[1.1rem] font-medium text-[0.8rem] text-teal">
          Characters
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.05]">
            Who&apos;s in the stories
          </h2>
          <Link
            href="/stories/characters"
            className="whitespace-nowrap border-b border-teal-dim pb-0.5 text-[0.82rem] font-medium text-teal transition-colors hover:border-teal"
          >
            Meet all characters →
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-[4.5rem]">
          {shows.map((show) => {
            const cast = characters.filter((c) => c.show === show.id);
            if (cast.length === 0) return null;

            return (
              <div key={show.id}>
                <div className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
                  <span className={`h-2.5 w-2.5 shrink-0 self-center rounded-full ${show.dot}`} />
                  <h3 className="text-[1.6rem] font-bold leading-none">{show.name}</h3>
                  <span className="text-[0.92rem] text-text-muted">{show.tagline}</span>
                  <span className="ml-auto font-medium text-[0.72rem] text-text-muted">
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
                <h3 className="text-[1.6rem] font-bold leading-none">{kidsShow.name}</h3>
                <span className="text-[0.92rem] text-text-muted">{kidsShow.tagline}</span>
                <span className="ml-auto font-medium text-[0.72rem] text-text-muted">
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
