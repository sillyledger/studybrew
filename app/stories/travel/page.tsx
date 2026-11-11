import type { Metadata } from 'next'
import { createClient } from '../../../lib/supabase'
import Nav from '@/components/Nav'
import StoryCardGrid from '@/components/StoryCardGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Travel Stories | Study Brew',
  description:
    'Short travel stories from cities and quiet corners, told at a calm pace for B1-B2 learners.',
}

export default async function TravelStories() {
  const supabase = createClient()
  const { data: stories } = await supabase
    .from('posts')
    .select('id, title, slug, sub_category, level, published_at')
    .eq('target_site', 'studybrew.co')
    .eq('category', 'Travel')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <main className="flex flex-1 flex-col">

      <Nav />

      <section className="px-6 max-w-5xl mx-auto w-full py-12 md:py-16">
        <div className="mb-2">
          <a href="/stories" className="text-white/30 text-sm hover:text-white/50 transition-colors">← Stories</a>
        </div>
        <p className="font-medium text-white/40 text-sm mb-4 mt-6">Travel</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          Stories from cities and quiet corners.
        </h1>
        <p className="text-white/60 text-base md:text-lg mb-12 md:mb-16 max-w-xl">
          Short travel stories from cities and quiet corners, told at a calm pace for B1-B2 learners.
        </p>

        {!stories || stories.length === 0 ? (
          <p className="text-white/30 text-sm">No stories published yet. Check back soon.</p>
        ) : (
          <StoryCardGrid stories={stories} />
        )}
      </section>
    </main>
  )
}
