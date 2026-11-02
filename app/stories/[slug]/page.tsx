import type { Metadata } from 'next'
import { createClient } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'

export const revalidate = 60

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
    return { title: 'Story Not Found | Study Brew' }
  }

  return {
    title: story.seo_title || `${story.title} | Study Brew`,
    description:
      story.seo_description || 'A short, calm audio story for B1–B2 English learners.',
  }
}

function spotifyEmbedUrl(url: string): string | null {
  const match = url.match(/spotify\.com\/(episode|track)\/([a-zA-Z0-9]+)/)
  if (!match) return null
  return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params

  const supabase = createClient()
  const { data: story } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('target_site', 'studybrew.co')
    .eq('status', 'published')
    .single()

  if (!story) notFound()

  const embedUrl = story.spotify_url ? spotifyEmbedUrl(story.spotify_url) : null

  const CATEGORY_SLUGS: Record<string, string> = {
    'Bedtime Stories': 'bedtime',
    'Daily Life': 'daily-life',
    'Fantasy': 'fantasy',
    'Travel': 'travel',
    'Career': 'career',
  }

  const backHref = story.category && CATEGORY_SLUGS[story.category]
    ? `/stories/${CATEGORY_SLUGS[story.category]}`
    : '/stories'

  const backLabel = story.category ? `← ${story.category}` : '← Stories'

  return (
    <main className="flex flex-1 flex-col">

      <Nav />

      <section className="px-6 max-w-2xl mx-auto w-full py-10 md:py-16">

        <div className="mb-6 md:mb-8">
          <a href={backHref} className="text-white/30 text-sm hover:text-white/50 transition-colors">
            {backLabel}
          </a>
        </div>

        <div className="flex items-center gap-3 mb-4">
          {story.sub_category && (
            <span className="text-xs text-[#E8A45A] border border-[#E8A45A]/20 rounded-full px-2 py-0.5">
              {story.sub_category}
            </span>
          )}
          {story.level && (
            <span className="text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">
              {story.level}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8 md:mb-12">
          {story.title}
        </h1>

        {embedUrl && (
          <div className="mb-8 md:mb-12">
            <iframe
              src={embedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        )}

        {story.content && (
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Transcript</p>
            <div
              className="prose-story"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        )}

      </section>

      <style>{`
        .prose-story p { color: rgba(255,255,255,0.86); line-height: 1.85; margin-bottom: 1.25em; font-size: 19px; }
        @media (min-width: 768px) { .prose-story p { font-size: 21px; } }
        .prose-story h1, .prose-story h2, .prose-story h3 { color: #ffffff; font-weight: 600; margin: 1.5em 0 0.5em; }
        .prose-story strong { color: #ffffff; }
        .prose-story em { font-style: italic; }
        .prose-story ul, .prose-story ol { color: rgba(255,255,255,0.86); padding-left: 22px; margin-bottom: 1.25em; font-size: 19px; }
        .prose-story li { margin-bottom: 4px; line-height: 1.85; }
        .prose-story blockquote { border-left: 3px solid rgba(232,164,90,0.4); padding-left: 16px; color: rgba(255,255,255,0.7); margin: 1.25em 0; font-size: 19px; }
      `}</style>

    </main>
  )
}
