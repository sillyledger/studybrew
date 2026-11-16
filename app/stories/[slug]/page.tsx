import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Nav from '@/components/Nav'
import LegacyStory from '@/components/story/LegacyStory'
import ListenBox from '@/components/story/ListenBox'
import StoryQuiz from '@/components/story/StoryQuiz'
import { SavedWords, StoryWordsProvider } from '@/components/story/StoryWords'
import { KeyWordsCard, MoreStories, StoryHeader, StoryText, type MoreItem } from '@/components/story/StoryParts'
import { getStoryList, STORY_SHOWS } from '@/lib/stories-list'
import { SIGNUP } from '@/lib/site'
import {
  appleEmbedUrl,
  categoryHref,
  findPublicStory,
  getPublicStory,
  mainCharacter,
  spotifyEmbedUrl,
  STORY_VALLEY_SHOW,
  type PublicStory,
} from '@/lib/public-story'

// /stories/[slug] for Study Brew and Story Brew. The story comes from the
// app's public API (lib/public-story.ts); when the API doesn't have it, the
// old page (posts table) is shown instead. Server-rendered except the listen
// box, tap-a-word and the quiz (components/story). Story Valley stories
// redirect to /stories/story-valley/[slug] (no analytics, no embeds there).

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const supabase = createClient()
  const { data: story } = await supabase
    .from('posts')
    .select('title, seo_title, seo_description')
    .eq('slug', slug)
    .eq('target_site', 'studybrew.co')
    .eq('status', 'published')
    .single()

  if (!story) {
    // Only in the app: use its title and teaser.
    const api = await getPublicStory(slug)
    if (api) return { title: `${api.title} | Study Brew`, description: api.teaser || undefined }
    return { title: 'Story Not Found | Study Brew' }
  }

  return {
    title: story.seo_title || `${story.title} | Study Brew`,
    description:
      story.seo_description || 'A short, calm audio story for B1–B2 English learners.',
  }
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params
  // By slug; if the app uses a different slug, by the site post's title.
  const story = await findPublicStory(slug, () => postTitle(slug))
  if (!story) return <LegacyStory slug={slug} />
  if (story.show.slug === STORY_VALLEY_SHOW) redirect(`/stories/story-valley/${story.slug}`)

  // Spotify and Apple can't be reached from mainland China: only Play here.
  const inChina = (await headers()).get('x-vercel-ip-country') === 'CN'
  const character = mainCharacter(story)
  const more = await moreStories(story, slug, character?.slug ?? null)

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <StoryWordsProvider>
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[minmax(0,1fr)] gap-12 px-4 pb-20 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <article className="min-w-0 lg:max-w-[700px]">
            <StoryHeader
              back={{ href: categoryHref(story.category), label: story.category || 'Stories' }}
              title={story.title}
              character={character}
              level={story.level}
              showName={story.show.name}
              category={story.category}
              minutes={story.minutes}
            />

            <ListenBox
              title={story.title}
              audioUrl={story.audio_url}
              spotifyEmbed={inChina ? null : spotifyEmbedUrl(story.spotify_url)}
              appleEmbed={inChina ? null : appleEmbedUrl(story.apple_url)}
            />

            <KeyWordsCard keyWords={story.key_words} />

            <StoryText story={story} />

            {story.quiz && Array.isArray(story.quiz.options) && story.quiz.options.length > 1 && (
              <StoryQuiz
                question={story.quiz.question}
                options={story.quiz.options}
                correctIndex={story.quiz.correct_index}
              />
            )}

            {/* End card */}
            <section className="mt-6 flex flex-col items-start gap-5 rounded-[20px] border border-teal/30 bg-[linear-gradient(135deg,#1f2b27,#242426_60%)] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
              <svg width="88" height="80" viewBox="0 0 88 80" aria-hidden="true" className="shrink-0">
                <path d="M30 8c-4 6 4 8 0 14M44 4c-4 6 4 8 0 14" stroke="#9a9894" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M14 28h52v20c0 14-11 24-26 24S14 62 14 48z" fill="none" stroke="#ECEAE6" strokeWidth="3" />
                <path d="M17 36h46v12c0 12-10 21-23 21S17 60 17 48z" fill="#5a3a26" />
                <path d="M17 36h46" stroke="#c49a6c" strokeWidth="3" />
                <path d="M66 34c10 0 10 16 0 16" fill="none" stroke="#ECEAE6" strokeWidth="3" />
                <path d="M6 76h76" stroke="#ECEAE6" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="min-w-0 flex-1">
                <h2 className="text-[1.35rem] font-bold leading-[1.2] tracking-[-0.02em]">Keep the words from this story</h2>
                <p className="mt-1.5 text-[0.92rem] leading-[1.5] text-text-muted">
                  Save words as you read, see them again in a short daily review, and take notes on anything you read
                  in English. Free to start.
                </p>
              </div>
              <a
                href={SIGNUP.href}
                className="inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-[12px] bg-teal px-5 text-[0.9rem] font-semibold text-teal-ink hover:opacity-90"
              >
                {SIGNUP.label}
              </a>
            </section>
          </article>

          {/* Sidebar (below the story on phones) */}
          <aside className="min-w-0">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <div className="rounded-[20px] bg-panel p-5">
                <SavedWords />
              </div>
              <MoreStories
                heading={character ? `More with ${character.name}` : `More from ${story.show.name}`}
                items={more}
              />
            </div>
          </aside>
        </div>
      </StoryWordsProvider>
    </main>
  )
}

/** Three more stories: with the same character, or from the same show for One-off stories. */
async function moreStories(story: PublicStory, pageSlug: string, characterSlug: string | null): Promise<MoreItem[]> {
  const list = await getStoryList()
  return list
    .filter((s) => !s.isStoryValley && s.slug !== story.slug && s.slug !== pageSlug)
    .filter((s) => (characterSlug ? s.characterKeys.includes(characterSlug) : s.show === story.show.slug))
    .slice(0, 3)
    .map((s) => ({
      key: s.id,
      href: s.href,
      title: s.title,
      showName: STORY_SHOWS[s.show].name,
      showColor: STORY_SHOWS[s.show].color,
      level: STORY_SHOWS[s.show].level,
      minutes: s.minutes,
      avatarName: s.character?.name ?? s.title,
      avatarSrc: s.character?.avatar ?? null,
    }))
}

/** The site post's title, for matching the app's story by title. */
async function postTitle(slug: string): Promise<string | null> {
  const { data } = await createClient()
    .from('posts')
    .select('title')
    .eq('slug', slug)
    .eq('target_site', 'studybrew.co')
    .eq('status', 'published')
    .maybeSingle()
  return data?.title ?? null
}
