import type { Metadata } from 'next'
import { createClient } from '../../../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getCharacter } from '../../../../lib/characters'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const character = getCharacter(slug)

  if (!character) {
    return { title: 'Character Not Found | Study Brew' }
  }

  return {
    title: `${character.name} — ${character.role} | Study Brew`,
    description: character.description,
  }
}

interface Story {
  id: string
  title: string
  slug: string
  category: string | null
  level: string | null
  published_at: string | null
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params
  const character = getCharacter(slug)

  if (!character) notFound()

  const supabase = createClient()
  const { data: stories } = await supabase
    .from('posts')
    .select('id, title, slug, category, level, published_at')
    .eq('target_site', 'studybrew.co')
    .eq('status', 'published')
    .ilike('sub_category', `%${character.name}%`)
    .order('published_at', { ascending: false })

  return (
    <main className="flex flex-1 flex-col">

      <Nav />

      <section className="px-6 max-w-5xl mx-auto w-full py-10 md:py-16">

        <div className="mb-6 md:mb-8">
          <a href="/stories" className="text-white/30 text-sm hover:text-white/50 transition-colors">← Stories</a>
        </div>

        {/* Profile header */}
        <div className="flex gap-5 md:gap-6 items-start flex-wrap mb-10 md:mb-14">
          {character.hasAvatar ? (
            <img
              src={`/characters/${character.slug}.svg`}
              alt={character.name}
              className="w-20 h-20 md:w-24 md:h-24 shrink-0"
            />
          ) : (
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-semibold shrink-0"
              style={{ backgroundColor: character.color + "33", border: `3px solid ${character.color}`, color: character.color }}
            >
              {character.name[0]}
            </div>
          )}
          <div className="flex-1 min-w-[240px]">
            <p className="font-medium text-white/40 text-[0.82rem] mb-2">Character</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{character.name}</h1>
            <p className="text-white/50 text-sm md:text-base mb-4">{character.role}</p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mb-4">{character.bio}</p>
            <div className="flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <span key={tag} className="text-xs text-white/50 border border-white/10 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stories featuring this character */}
        <p className="font-medium text-white/40 text-[0.82rem] mb-4">
          Stories featuring {character.name}
        </p>

        {!stories || stories.length === 0 ? (
          <p className="text-white/30 text-sm">No stories with {character.name} yet. Check back soon.</p>
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
                    {story.category && (
                      <span className="text-xs text-[#E8A45A] border border-[#E8A45A]/20 rounded-full px-2 py-0.5 mb-2 inline-block">
                        {story.category}
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

            {/* Desktop: simple grid */}
            <div className="hidden md:grid grid-cols-3 gap-3">
              {stories.map((story: Story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group rounded-2xl p-6 border border-white/10 bg-white/5 hover:bg-white/8 transition-all flex flex-col justify-between no-underline min-h-[140px]"
                >
                  <div>
                    {story.category && (
                      <span className="text-xs text-[#E8A45A] border border-[#E8A45A]/20 rounded-full px-2 py-0.5 mb-3 inline-block">
                        {story.category}
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
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
