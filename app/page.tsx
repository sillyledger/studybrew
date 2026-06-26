import { createClient } from '../lib/supabase'
import Link from 'next/link'

export const revalidate = 60

interface Story {
  id: string
  title: string
  slug: string
  category: string | null
  sub_category: string | null
  level: string | null
}

function getGridStyle(i: number): { gridColumn: string; gridRow: string } {
  const patterns: { gridColumn: string; gridRow: string }[] = [
    { gridColumn: 'span 2', gridRow: 'span 2' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 2', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
  ]
  return patterns[i % patterns.length]
}

export default async function Home() {
  const supabase = createClient()
  const { data: stories } = await supabase
    .from('posts')
    .select('id, title, slug, category, sub_category, level')
    .eq('target_site', 'studybrew.co')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(9)

  return (
    <main className="min-h-screen flex flex-col">

      <nav className="flex justify-between items-center px-8 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1E3A5F"/>
            <path d="M8 22 Q10 10 16 10 Q22 10 24 22" stroke="#E8A45A" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M12 22 Q13 16 16 16 Q19 16 20 22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            <circle cx="16" cy="25" r="1.5" fill="#E8A45A"/>
          </svg>
          <span className="text-white font-semibold tracking-wide">Study Brew</span>
        </div>
        <div className="flex gap-8 text-sm text-white/50">
          <a href="/stories" className="hover:text-white transition-colors">stories</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-8 max-w-4xl mx-auto w-full py-24">
        <p className="text-white/50 text-sm tracking-widest uppercase mb-6">English for B1–B2 learners</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          Stories for learners.<br />Made by a learner.
        </h1>
        <p className="text-white/80 text-lg max-w-2xl leading-relaxed mb-12">
          Short, calm audio stories with real characters and everyday situations — written and recorded by a non-native speaker, for non-native speakers. No grammar drills. No pressure. Just warm, natural English for when you want the language to sink in without trying too hard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-white/70 text-sm">Language learning app in development</span>
          </div>
          <a href="/stories" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0F1923] font-semibold text-sm rounded-full px-6 py-3 transition-colors">
            Browse stories
          </a>
        </div>
      </section>

      {/* Recent stories bento */}
      {stories && stories.length > 0 && (
        <section className="px-8 max-w-4xl mx-auto w-full pb-24">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-xs tracking-widest uppercase">Recent Stories</p>
            <a href="/stories" className="text-white/30 text-xs hover:text-white/50 transition-colors">View all →</a>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(4, 160px)',
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
                    <h2 className="text-white font-semibold text-base leading-snug group-hover:text-[#E8A45A] transition-colors mt-2">
                      {story.title}
                    </h2>
                    {story.category && (
                      <p className="text-white/30 text-xs mt-1">{story.category}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    {story.level ? (
                      <span className="text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">
                        {story.level}
                      </span>
                    ) : <span />}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/20 group-hover:text-white/50 transition-colors">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <footer className="px-8 py-6 max-w-4xl mx-auto w-full text-center">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

    </main>
  )
}
