import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Cup from '@/components/Cup'
import LegacyStory from '@/components/story/LegacyStory'
import ListenBox from '@/components/story/ListenBox'
import StoryQuiz from '@/components/story/StoryQuiz'
import { SavedWords, StoryWordsProvider, TappableText } from '@/components/story/StoryWords'
import { getStoryList, STORY_SHOWS, type StoryListItem } from '@/lib/stories-list'
import { SIGNUP } from '@/lib/site'
import {
  appleEmbedUrl,
  categoryHref,
  findPublicStory,
  getPublicStory,
  keyPhrases,
  mainCharacter,
  spotifyEmbedUrl,
  tokenize,
  type PublicStory,
} from '@/lib/public-story'

// /stories/[slug] for Study Brew and Story Brew. The story comes from the
// app's public API (lib/public-story.ts); when the API doesn't have it, the
// old page (posts table) is shown instead. Server-rendered except the listen
// box, tap-a-word and the quiz (components/story).

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

  // Spotify and Apple can't be reached from mainland China: only Play here.
  const inChina = (await headers()).get('x-vercel-ip-country') === 'CN'
  const character = mainCharacter(story)
  const more = await moreStories(story, slug, character?.slug ?? null)
  const phrases = keyPhrases(story.key_words)

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <StoryWordsProvider>
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[minmax(0,1fr)] gap-12 px-4 pb-20 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <article className="min-w-0 lg:max-w-[700px]">
            <a href={categoryHref(story.category)} className="text-[0.85rem] text-text-muted transition-colors hover:text-text-primary">
              ← {story.category || 'Stories'}
            </a>

            {/* Header */}
            <header className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              {character && (
                <MaybeLink href={character.href} label={`More about ${character.name}`}>
                  <Avatar name={character.name} src={character.avatar} size="h-[84px] w-[84px] text-[2rem]" ring />
                </MaybeLink>
              )}
              <div className="min-w-0">
                <h1 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-text-primary sm:text-[2.5rem]">
                  {story.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.86rem] text-text-muted">
                  {character && (
                    <MaybeLink href={character.href} className="font-semibold text-text-primary hover:underline">
                      {character.name}
                    </MaybeLink>
                  )}
                  {story.level && (
                    <span className="rounded-full border border-teal/60 px-2.5 py-[3px] text-[0.72rem] font-semibold leading-none text-teal">
                      {story.level}
                    </span>
                  )}
                  <span>
                    <span className="font-semibold text-teal">{story.show.name}</span>
                    {story.category && <> · {story.category}</>}
                  </span>
                  {story.minutes > 0 && <span>· {story.minutes} min</span>}
                </div>
              </div>
            </header>

            <ListenBox
              title={story.title}
              audioUrl={story.audio_url}
              spotifyEmbed={inChina ? null : spotifyEmbedUrl(story.spotify_url)}
              appleEmbed={inChina ? null : appleEmbedUrl(story.apple_url)}
            />

            {story.key_words.length > 0 && (
              <section aria-labelledby="before-you-listen" className="mt-5 rounded-[20px] bg-cream p-5 text-cream-ink sm:p-6">
                <h2 id="before-you-listen" className="text-[1rem] font-bold tracking-[-0.02em]">
                  Before you listen: {story.key_words.length} {story.key_words.length === 1 ? 'word' : 'words'} to know
                </h2>
                <dl className="mt-3.5 flex flex-col gap-2.5">
                  {story.key_words.map((k) => (
                    <div key={k.word} className="text-[0.93rem] leading-[1.5]">
                      <dt className="inline font-bold">{k.word}</dt>
                      <dd className="inline text-[#4a4134]"> · {k.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* The story */}
            <p className="mt-12 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-teal">
              Tap any word to see what it means
            </p>
            <TappableText>
              <div className="story-text mt-5">
                {story.body.map((block, i) =>
                  block.type === 'heading' ? (
                    <h2 key={i}>
                      <Words text={block.text} phrases={phrases} />
                    </h2>
                  ) : (
                    <p key={i}>
                      {block.speaker && <span className="speaker">{block.speaker}: </span>}
                      <Words text={block.text} phrases={phrases} />
                    </p>
                  )
                )}
              </div>
            </TappableText>

            {story.quiz && Array.isArray(story.quiz.options) && story.quiz.options.length > 1 && (
              <StoryQuiz
                question={story.quiz.question}
                options={story.quiz.options}
                correctIndex={story.quiz.correct_index}
              />
            )}

            {/* End card */}
            <section className="mt-6 flex flex-col items-center rounded-[20px] border border-line bg-panel-2 px-6 py-9 text-center">
              <Cup fraction={0.62} id="story-end-cup" ariaLabel="Study Brew cup" className="w-[64px]" />
              <h2 className="mt-4 text-[1.3rem] font-bold tracking-[-0.03em]">Keep the words from this story</h2>
              <p className="mt-2 max-w-[400px] text-[0.92rem] leading-[1.6] text-text-muted">
                Save the words you tap, then see them again in a short daily review. That&apos;s how they stick.
              </p>
              <a
                href={SIGNUP.href}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-[12px] bg-teal px-6 text-[0.92rem] font-semibold text-teal-ink hover:opacity-90"
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

              {more.length > 0 && (
                <div className="rounded-[20px] bg-panel p-5">
                  <h2 className="text-[0.95rem] font-bold tracking-[-0.02em]">
                    {character ? `More with ${character.name}` : `More from ${story.show.name}`}
                  </h2>
                  <ul className="mt-2 flex flex-col">
                    {more.map((s) => (
                      <li key={s.id}>
                        <a href={s.href} className="-mx-2 flex items-start gap-3 rounded-[12px] px-2 py-2.5 hover:bg-panel-hover">
                          <Avatar name={s.character?.name ?? s.title} src={s.character?.avatar ?? null} size="h-9 w-9 text-[0.85rem]" />
                          <span className="min-w-0">
                            <span className="block text-[0.72rem] font-semibold" style={{ color: STORY_SHOWS[s.show].color }}>
                              {STORY_SHOWS[s.show].name}
                            </span>
                            <span className="mt-0.5 block text-[0.88rem] font-semibold leading-[1.35]">{s.title}</span>
                            <span className="mt-0.5 block text-[0.74rem] text-text-muted">
                              {STORY_SHOWS[s.show].level} · {s.minutes} min
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </StoryWordsProvider>

      <style>{`
        .story-text p { color: rgba(232,232,232,0.92); font-size: 19px; line-height: 1.9; margin-bottom: 1.35em; }
        .story-text h2 { color: var(--color-text-primary); font-size: 22px; margin: 1.6em 0 0.6em; }
        @media (min-width: 768px) { .story-text p { font-size: 21px; line-height: 1.95; } }
        .story-text .speaker { font-weight: 600; color: var(--color-text-primary); }
        .story-text [data-w] { cursor: pointer; border-radius: 5px; transition: background-color .15s; -webkit-tap-highlight-color: transparent; }
        .story-text [data-w]:hover { background: rgba(93,202,165,0.12); }
        .story-text .kw { text-decoration: underline; text-decoration-color: #F2C46B; text-decoration-thickness: 3px; text-underline-offset: 6px; text-decoration-skip-ink: none; }
        .story-text .is-saved { text-decoration: underline; text-decoration-color: #5DCAA5; text-decoration-thickness: 3px; text-underline-offset: 6px; }
        .story-text .is-open { background: rgba(93,202,165,0.22); }
      `}</style>
    </main>
  )
}

/** Story text as tappable word spans (server-rendered). */
function Words({ text, phrases }: { text: string; phrases: string[][] }) {
  return (
    <>
      {tokenize(text, phrases).map((t, i) =>
        t.key ? (
          <span key={i} data-w={t.key} className={t.keyWord ? 'kw' : undefined}>
            {t.text}
          </span>
        ) : (
          t.text
        )
      )}
    </>
  )
}

function Avatar({ name, src, size, ring }: { name: string; src: string | null; size: string; ring?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-panel font-bold text-teal ${size} ${
        ring ? 'ring-2 ring-teal ring-offset-4 ring-offset-background' : ''
      }`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        name.trim().charAt(0).toUpperCase()
      )}
    </span>
  )
}

function MaybeLink({
  href,
  label,
  className,
  children,
}: {
  href: string | null
  label?: string
  className?: string
  children: React.ReactNode
}) {
  return href ? (
    <a href={href} aria-label={label} className={className}>
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  )
}

/** Three more stories: with the same character, or from the same show for One-off stories. */
async function moreStories(story: PublicStory, pageSlug: string, characterSlug: string | null): Promise<StoryListItem[]> {
  const list = await getStoryList()
  return list
    .filter((s) => !s.isStoryValley && s.slug !== story.slug && s.slug !== pageSlug)
    .filter((s) => (characterSlug ? s.characterKeys.includes(characterSlug) : s.show === story.show.slug))
    .slice(0, 3)
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
