import type { Metadata } from "next";
import { headers } from "next/headers";
import Nav from "@/components/Nav";
import { ShieldIcon } from "@/components/Icons";
import LegacyStoryValley from "@/components/story/LegacyStoryValley";
import ListenBox from "@/components/story/ListenBox";
import StoryQuiz from "@/components/story/StoryQuiz";
import { KeyWordsCard, MoreStories, StoryHeader, StoryText, type MoreItem } from "@/components/story/StoryParts";
import { getPublicStory, ONE_OFF_SLUG, STORY_VALLEY_SHOW, type PublicStory } from "@/lib/public-story";
import { shows } from "@/lib/shows";
import { getStoryList } from "@/lib/stories-list";
import { storyValleyCast } from "@/lib/story-valley";
import { createClient } from "@/lib/supabase";

// Story Valley episode. The story comes from the app's public API (same as
// /stories/[slug]); when the API doesn't have it, the old page is shown.
//
// This page stays free of analytics, cookies, embeds and third-party scripts:
// components/Analytics.tsx skips everything under /stories/story-valley, the
// platforms are plain links that open in a new tab, and there's no saving or
// sign-up. The only requests after load go to our own app (app.studybrew.co):
// the audio file when Play is pressed, and a word's meaning when it's tapped.
export const revalidate = 300;

const GREEN = "#8FCB6E";
const KIDS = shows.find((s) => s.id === "kids");

interface Props {
  params: Promise<{ slug: string }>;
}

const DEFAULT_DESCRIPTION = "A simple A1-A2 English story for kids, read aloud by a real person.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const supabase = createClient();
  const { data: episode } = await supabase
    .from("posts")
    .select("title, seo_title, seo_description")
    .eq("slug", slug)
    .eq("target_site", "storyvalley.co")
    .eq("status", "published")
    .single();

  if (!episode) {
    return { title: "Story Not Found | Study Brew" };
  }

  return {
    title: episode.seo_title || `${episode.title} | Study Brew`,
    description: episode.seo_description || DEFAULT_DESCRIPTION,
  };
}

export default async function StoryValleyEpisode({ params }: Props) {
  const { slug } = await params;
  const story = await getPublicStory(slug);
  if (!story || story.show.slug !== STORY_VALLEY_SHOW) return <LegacyStoryValley slug={slug} />;

  // Spotify, Apple, YouTube and KKBOX: only Play here in mainland China.
  const inChina = (await headers()).get("x-vercel-ip-country") === "CN";
  const character = valleyCharacter(story);
  const { items: more, sameCharacter } = await moreEpisodes(story, character?.slug ?? null);

  return (
    <main className="flex flex-1 flex-col" style={{ "--accent": GREEN } as React.CSSProperties}>
      <Nav />

      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[minmax(0,1fr)] gap-12 px-4 pb-20 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <article className="min-w-0 lg:max-w-[700px]">
          <StoryHeader
            back={{ href: "/stories/story-valley", label: "Story Valley" }}
            title={story.title}
            character={character ? { name: character.name, avatar: character.avatar, href: null } : null}
            level="A1–A2"
            showName="Story Valley for Kids"
            category={null}
            minutes={story.minutes}
          />

          <ListenBox
            title={story.title}
            audioUrl={story.audio_url}
            spotifyEmbed={null}
            appleEmbed={null}
            links={inChina ? [] : listenLinks(story)}
          />

          <KeyWordsCard keyWords={story.key_words} />

          <StoryText story={story} canSave={false} />

          {story.quiz && Array.isArray(story.quiz.options) && story.quiz.options.length > 1 && (
            <StoryQuiz
              question={story.quiz.question}
              options={story.quiz.options}
              correctIndex={story.quiz.correct_index}
            />
          )}

          {/* For grown-ups */}
          <section className="mt-6 flex flex-col gap-4 rounded-[20px] bg-cream p-6 text-cream-ink sm:flex-row sm:items-start">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-cream-ink/[0.08] text-[#3e6b33]">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.95rem] leading-[1.65]">
                <b className="font-bold">For grown-ups.</b> This page uses no analytics, no cookies and no ads, and
                children never need an account. Learning English yourself?{" "}
                <a href="/" className="font-semibold underline underline-offset-4">
                  Study Brew
                </a>{" "}
                helps you keep the words.
              </p>
              <p className="mt-2 text-[0.88rem] text-cream-muted">
                Like the stories?{" "}
                <a
                  href="https://ko-fi.com/studybrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cream-ink underline underline-offset-4"
                >
                  Buy us a coffee on Ko-fi.
                </a>
              </p>
            </div>
          </section>
        </article>

        {/* Sidebar (below the story on phones) */}
        {more.length > 0 && (
          <aside className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <MoreStories heading={sameCharacter && character ? `More with ${character.name}` : "More from Story Valley"} items={more} />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

/** The episode's character from the Story Valley cast (with its avatar). */
function valleyCharacter(story: PublicStory) {
  const c = story.characters[0];
  if (!c || c.slug === ONE_OFF_SLUG) return null;
  const known = storyValleyCast.find((m) => m.slug === c.slug);
  return { slug: c.slug, name: c.name, avatar: known ? `/characters/${known.slug}.svg` : null };
}

/** Platform links (new tab, never embedded): the episode's own Spotify and
    Apple links, else the show's; YouTube and KKBOX from lib/shows.ts. */
function listenLinks(story: PublicStory): { label: string; href: string }[] {
  return [
    { label: "Spotify", href: story.spotify_url || KIDS?.spotifyUrl },
    { label: "Apple", href: story.apple_url || KIDS?.appleUrl },
    { label: "YouTube", href: KIDS?.youtubeUrl },
    { label: "KKBOX", href: KIDS?.kkboxUrl },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));
}

/** Three more Story Valley episodes with the same character (else any). */
async function moreEpisodes(
  story: PublicStory,
  characterSlug: string | null
): Promise<{ items: MoreItem[]; sameCharacter: boolean }> {
  const list = (await getStoryList()).filter((s) => s.isStoryValley && s.slug !== story.slug);
  const same = characterSlug ? list.filter((s) => s.characterKeys.includes(characterSlug)) : [];
  const items = (same.length ? same : list).slice(0, 3).map((s) => ({
    key: s.id,
    href: `/stories/story-valley/${s.slug}`,
    title: s.title,
    showName: "Story Valley for Kids",
    showColor: GREEN,
    level: "A1–A2",
    minutes: s.minutes,
    avatarName: s.character?.name ?? s.title,
    avatarSrc: s.character?.avatar ?? null,
  }));
  return { items, sameCharacter: same.length > 0 };
}
