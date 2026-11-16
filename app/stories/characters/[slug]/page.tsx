import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import CharacterStories from "@/components/CharacterStories";
import { Cover, LevelPill, StoryLink } from "@/components/StoryCards";
import {
  characters,
  comingSoonPill,
  comingSoonSentence,
  getCharacter,
  type Character,
} from "@/lib/characters";
import { PLATFORMS, shows } from "@/lib/shows";
import { STORY_SHOWS, getStoryList } from "@/lib/stories-list";
import { APP_WELCOME_URL, SIGNUPS_OPEN } from "@/lib/site";

// Same as /stories.
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

function firstSentence(text: string) {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) return { title: "Character Not Found | Study Brew" };
  return {
    title: `${character.name}, ${character.role} | Study Brew Stories`,
    description: `${firstSentence(character.bio)} Short English stories for B1–B2 learners.`,
  };
}

const SHOW_KEY = { study: "study-brew", story: "story-brew" } as const;

/** Spotify, Apple and YouTube links for the character's show. */
function alsoOn(character: Character) {
  const show = shows.find((s) => s.id === character.show);
  if (!show) return [];
  return PLATFORMS.filter((p) => p.key !== "castboxUrl").flatMap((p) => {
    const href = show[p.key];
    return href ? [{ href, label: p.label, ariaLabel: p.ariaLabel }] : [];
  });
}

function mostCommon(values: string[]) {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
}

function PortraitAvatar({ character, size }: { character: Character; size: string }) {
  return character.hasAvatar ? (
    <img src={`/characters/${character.slug}.svg`} alt="" className={size} />
  ) : (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full bg-teal text-[4rem] font-bold text-teal-ink ${size}`}
    >
      {character.name.charAt(0)}
    </span>
  );
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const showKey = SHOW_KEY[character.show];
  const show = STORY_SHOWS[showKey];

  // Same loader as /stories, filtered to this character (first-name match).
  const stories = (await getStoryList()).filter(
    (s) => !s.isStoryValley && s.characterKeys.includes(character.slug)
  );
  const hasStories = stories.length > 0 && !character.comingSoon;
  const first = hasStories ? stories[stories.length - 1] : null; // oldest
  const category = hasStories ? mostCommon(stories.map((s) => s.category)) : undefined;
  const avgMinutes = hasStories
    ? Math.round(stories.reduce((sum, s) => sum + s.minutes, 0) / stories.length)
    : 0;
  const links = alsoOn(character);
  const others = characters
    .filter((c) => c.show === character.show && c.slug !== character.slug)
    .slice(0, 3);

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Hero */}
        <section className="pb-12 pt-8 md:pb-16 md:pt-12">
          <Link
            href="/stories/characters"
            className="text-[0.8rem] font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            ← All characters
          </Link>

          <div className="mt-8 grid items-center gap-10 md:grid-cols-[330px_minmax(0,1fr)] md:gap-14">
            {/* Polaroid */}
            <figure className="relative mx-auto w-full max-w-[250px] -rotate-3 rounded-[8px] bg-text-primary p-3.5 pb-5 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.85)] md:max-w-[330px] md:p-4 md:pb-6">
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-[4deg] border border-coral/70 bg-coral/[0.55]"
              />
              <div className="flex aspect-square items-center justify-center rounded-[4px] bg-panel">
                <PortraitAvatar character={character} size="h-[72%] w-[72%] max-h-[240px] max-w-[240px]" />
              </div>
              <figcaption className="mt-3 text-center">
                <div className="text-[1.3rem] font-bold text-ink md:text-[1.45rem]">{character.name}</div>
                <div className="mt-0.5 text-[0.76rem] font-medium text-text-muted-2">{character.role}</div>
              </figcaption>
            </figure>

            {/* Info */}
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
                <span className="h-px w-5 shrink-0 bg-teal-dim" />
                <span>
                  {show.name}
                  {category ? ` · ${category}` : ""}
                </span>
              </div>
              <h1 className="text-[clamp(3rem,7vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.04em]">
                {character.name}
              </h1>
              <p className="mt-3 text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-teal">
                {character.role}
              </p>
              <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-[1.65] text-text-muted">
                {character.bio}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {character.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line-strong bg-panel px-3 py-1 text-[0.8rem] text-text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <dl className="mt-7 grid max-w-[520px] grid-cols-3 divide-x divide-line overflow-hidden rounded-[16px] border border-line">
                {[
                  [String(hasStories ? stories.length : 0), hasStories && stories.length === 1 ? "story" : "stories"],
                  ["B1–B2", "level"],
                  [hasStories ? `~${avgMinutes}` : "–", "min each"],
                ].map(([value, label]) => (
                  <div key={label} className="px-4 py-3">
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <span className="block text-[1.25rem] font-bold leading-tight">{value}</span>
                      <span className="text-[0.76rem] text-text-muted-2">{label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                {first && (
                  <StoryLink
                    story={first}
                    className="inline-flex items-center justify-center rounded-[10px] bg-teal px-5 py-3 text-[0.92rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
                  >
                    ▶ Start with {character.possessive} first story
                  </StoryLink>
                )}
                {links.length > 0 && (
                  <p className="text-[0.78rem] text-text-muted-2">
                    Also on{" "}
                    {links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && " · "}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={l.ariaLabel}
                          className="underline-offset-2 transition-colors hover:text-text-primary hover:underline"
                        >
                          {l.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {first ? (
          <>
            {/* Start here */}
            <section aria-label="Start here">
              <article className="grid overflow-hidden rounded-[22px] border border-line bg-panel-2 md:grid-cols-[260px_minmax(0,1fr)]">
                <StoryLink story={first} className="block">
                  <Cover story={first} height="h-[190px] md:h-full md:min-h-[240px]" avatar={120} />
                </StoryLink>
                <div className="flex flex-col p-6 md:p-8">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-yellow">
                    Start here · Episode 1
                  </span>
                  <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                    <StoryLink story={first} className="transition-colors hover:text-teal">
                      {first.title}
                    </StoryLink>
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-[0.96rem] leading-[1.6] text-text-muted">
                    {first.teaser}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.84rem] text-text-muted">
                    <LevelPill level={first.level} />
                    <span>{first.minutes} min</span>
                    <StoryLink
                      story={first}
                      className="ml-auto inline-flex items-center justify-center rounded-[10px] border border-line-strong px-4 py-2.5 text-[0.88rem] font-semibold text-text-primary transition-colors hover:bg-panel-hover"
                    >
                      ▶ Listen &amp; read
                    </StoryLink>
                  </div>
                </div>
              </article>
            </section>

            <CharacterStories name={character.name} stories={stories} />
          </>
        ) : (
          <section className="rounded-[18px] border border-dashed border-line-strong px-6 py-12 text-center">
            <p className="text-[1.15rem] font-bold">{comingSoonSentence(character)}</p>
            <Link
              href="/stories"
              className="mt-3 inline-block border-b border-teal-dim pb-0.5 text-[0.88rem] font-medium text-teal transition-colors hover:border-teal"
            >
              Browse all stories
            </Link>
          </section>
        )}

        {/* Read along */}
        <section className="pt-14 md:pt-20">
          <div className="flex flex-col gap-5 rounded-[22px] border border-teal/40 bg-teal/[0.06] p-6 sm:flex-row sm:items-center md:p-8">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-teal/15 text-[1.3rem]"
            >
              ☕
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[1.3rem] font-bold leading-tight">Read along with {character.name}.</h2>
              <p className="mt-1.5 max-w-[60ch] text-[0.93rem] leading-[1.6] text-text-muted">
                Every story has its full text and 3 words to know. In the app, every word you tap
                goes to your notes.
              </p>
            </div>
            {SIGNUPS_OPEN ? (
              <a
                href={APP_WELCOME_URL}
                className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] border border-line-strong px-4 py-2.5 text-[0.85rem] font-semibold transition-colors hover:bg-panel-hover sm:self-auto"
              >
                Start learning, it&apos;s free
              </a>
            ) : (
              <Link
                href="/roadmap"
                className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] border border-line-strong px-4 py-2.5 text-[0.85rem] font-semibold transition-colors hover:bg-panel-hover sm:self-auto"
              >
                See the roadmap
              </Link>
            )}
          </div>
        </section>

        {/* More characters */}
        {others.length > 0 && (
          <section className="pb-20 pt-14 md:pb-24 md:pt-20">
            <div className="mb-6 flex items-end justify-between gap-6">
              <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">
                More {show.name} characters
              </h2>
              <Link
                href="/stories/characters"
                className="shrink-0 whitespace-nowrap border-b border-teal-dim pb-0.5 text-[0.84rem] font-medium text-teal transition-colors hover:border-teal"
              >
                All characters →
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/stories/characters/${c.slug}`}
                    className="group flex items-center gap-4 rounded-[16px] border border-line bg-panel-2 p-4 transition-colors hover:border-line-strong hover:bg-panel"
                  >
                    <PortraitAvatar character={c} size="h-14 w-14 shrink-0 rounded-full text-[1.4rem]" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[1rem] font-bold">{c.name}</span>
                        {c.comingSoon && (
                          <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.66rem] font-medium leading-none text-text-muted-2">
                            {comingSoonPill(c)}
                          </span>
                        )}
                      </div>
                      <div className="truncate text-[0.82rem] text-text-muted">{c.role}</div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-text-muted-2 transition-colors group-hover:text-teal"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {others.length === 0 && <div className="pb-20 md:pb-24" />}
      </div>
    </main>
  );
}
