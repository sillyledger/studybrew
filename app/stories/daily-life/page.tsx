import { createClient } from '../../../lib/supabase'
import Link from 'next/link'

export const revalidate = 60

interface Story {
  id: string
  title: string
  slug: string
  sub_category: string | null
  level: string | null
  published_at: string | null
}

function getGridStyle(i: number): { gridColumn: string; gridRow: string } {
  const patterns: { gridColumn: string; gridRow: string }[] = [
    { gridColumn: 'span 2', gridRow: 'span 2' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 2', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 2', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
  ]
  return patterns[i % patterns.length]
}

export default async function DailyLifeStories() {
  const supabase = createClient()
  const { data: stories } = await supabase
    .from('posts')
    .select('id, title, slug, sub_category, level, published_at')
    .eq('target_site', 'studybrew.co')
    .eq('category', 'Daily Life')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <main className="min-h-screen flex flex-col">

      <nav className="flex justify-between items-center px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1E3A5F"/>
            <path d="M8 22 Q10 10 16 10 Q22 10 24 22" stroke="#E8A45A" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M12 22 Q13 16 16 16 Q19 16 20 22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            <circle cx="16" cy="25" r="1.5" fill="#E8A45A"/>
          </svg>
          <a href="/" className="text-white font-semibold tracking-wide">Study Brew</a>
        </div>
        <div className="flex gap-6 text-sm text-white/50">
          <a href="/stories" className="text-white transition-colors">stories</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
        </div>
      </nav>

      <section className="px-6 max-w-5xl mx-auto w-full py-12 md:py-16">
        <div className="mb-2">
          <a href="/stories" className="text-white/30 text-sm hover:text-white/50 transition-colors">← Stories</a>
        </div>
        <p className="text-white/40 text-sm tracking-widest uppercase mb-4 mt-6">Daily Life</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          Everyday situations, natural English.
        </h1>
        <p className="text-white/60 text-base md:text-lg mb-12 md:mb-16 max-w-xl">
          Real conversations, routines, and moments from daily life — told at a calm pace for B1–B2 learners.
        </p>

        {!stories || stories.length === 0 ? (
          <p className="text-white/30 text-sm">No stories published yet. Check back soon.</p>
        ) : (
          <>
            {/* Mobile: single column list */}
            <div className="flex flex-col gap-3 md:hidden">
              {stories.map((story: Story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group rounded-2xl p-5 border border-white/10 bg-white/5 hover:bg-white/8 transition-all flex items-center justify-between no-underline"
                >
                  <div>
                    {story.sub_category && (
                      <span className="text-xs text-[#E8A45A] border border-[#E8A45A]/20 rounded-full px-2 py-0.5 mb-2 inline-block">
                        {story.sub_category}
                      </span>
                    )}
                    <h2 className="text-white font-semibold text-sm leading-snug group-hover:text-[#E8A45A] transition-colors">
                      {story.title}
                    </h2>
                    {story.level && (
                      <span className="text-xs text-white/30 mt-1 inline-block">{story.level}</span>
                    )}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/20 shrink-0 ml-4">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>

            {/* Desktop: bento grid */}
            <div className="hidden md:grid" style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '140px',
              gap: '12px',
            }}>
              {stories.map((story: Story, i: number) => {
                const { gridColumn, gridRow } = getGridStyle(i)
                return (
                  <Link
                    key={story.id}
                    href={`/stories/${story.slug}`}
                    style={{ gridColumn, gridRow }}
                    className="group rounded-2xl p-6 border border-white/10 bg-white/5 hover:bg-white/8 transition-all flex flex-col justify-between no-underline overflow-hidden"
                  >
                    <div>
                      {story.sub_category && (
                        <span className="text-xs text-[#E8A45A] border border-[#E8A45A]/20 rounded-full px-2 py-0.5 mb-3 inline-block">
                          {story.sub_category}
                        </span>
                      )}
                      <h2 className="text-white font-semibold text-lg leading-snug group-hover:text-[#E8A45A] transition-colors mt-2">
                        {story.title}
                      </h2>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      {story.level ? (
                        <span className="text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">
                          {story.level}
                        </span>
                      ) : <span />}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/20 group-hover:text-white/50 transition-colors">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </section>

      <footer className="px-6 py-6 max-w-5xl mx-auto w-full mt-auto">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

    </main>
  )
}
