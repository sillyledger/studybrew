import { createClient } from '../../../lib/supabase'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

function spotifyEmbedUrl(url: string): string | null {
  // Convert open.spotify.com/episode/ID to embed URL
  const match = url.match(/spotify\.com\/(episode|track)\/([a-zA-Z0-9]+)/)
  if (!match) return null
  return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`
}

export default async function StoryPage({ params }: Props) {
  const supabase = createClient()
  const { data: story } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('target_site', 'studybrew.co')
    .eq('status', 'published')
    .single()

  if (!story) notFound()

  const embedUrl = story.spotify_url ? spotifyEmbedUrl(story.spotify_url) : null

  return (
    <main className="min-h-screen flex flex-col">

      <nav className="flex justify-between items-center px-8 py-6 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1E3A5F"/>
            <path d="M8 22 Q10 10 16 10 Q22 10 24 22" stroke="#E8A45A" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M12 22 Q13 16 16 16 Q19 16 20 22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            <circle cx="16" cy="25" r="1.5" fill="#E8A45A"/>
          </svg>
          <a href="/" className="text-white font-semibold tracking-wide">Study Brew</a>
        </div>
        <div className="flex gap-8 text-sm text-white/50">
          <a href="/stories" className="text-white transition-colors">stories</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
        </div>
      </nav>

      <section className="px-8 max-w-3xl mx-auto w-full py-16">

        <div className="mb-8">
          <a href="/stories/bedtime" className="text-white/30 text-sm hover:text-white/50 transition-colors">← Bedtime Stories</a>
        </div>

        {/* Meta */}
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

        <h1 className="text-4xl font-bold text-white leading-tight mb-12">
          {story.title}
        </h1>

        {/* Spotify embed */}
        {embedUrl && (
          <div className="mb-12">
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

        {/* Transcript */}
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

      <footer className="px-8 py-6 max-w-5xl mx-auto w-full mt-auto">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

      <style>{`
        .prose-story p { color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 1.25em; font-size: 17px; }
        .prose-story h1, .prose-story h2, .prose-story h3 { color: #eeede7; font-weight: 600; margin: 1.5em 0 0.5em; }
        .prose-story strong { color: #eeede7; }
        .prose-story em { font-style: italic; }
        .prose-story ul, .prose-story ol { color: rgba(255,255,255,0.7); padding-left: 22px; margin-bottom: 1.25em; }
        .prose-story li { margin-bottom: 4px; line-height: 1.8; }
        .prose-story blockquote { border-left: 3px solid rgba(232,164,90,0.4); padding-left: 16px; color: rgba(255,255,255,0.5); margin: 1.25em 0; }
      `}</style>

    </main>
  )
}
