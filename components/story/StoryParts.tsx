// Server-rendered parts shared by /stories/[slug] and
// /stories/story-valley/[slug]. Colours use the `accent` token: teal by
// default, the show colour when a parent sets --accent (Story Valley).

import { TappableText } from '@/components/story/StoryWords'
import { keyPhrases, tokenize, type PublicStory } from '@/lib/public-story'

const ACCENT_60 = 'border-[color-mix(in_srgb,var(--accent,#5DCAA5)_60%,transparent)]'

export function Avatar({ name, src, size, ring }: { name: string; src: string | null; size: string; ring?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-panel font-bold text-accent ${size} ${
        ring ? 'ring-2 ring-accent ring-offset-4 ring-offset-background' : ''
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

export function MaybeLink({
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

/** Back link, avatar, title and the meta row. */
export function StoryHeader({
  back,
  title,
  character,
  level,
  showName,
  category,
  minutes,
}: {
  back: { href: string; label: string }
  title: string
  character: { name: string; avatar: string | null; href: string | null } | null
  level: string | null
  showName: string
  category: string | null
  minutes: number
}) {
  return (
    <>
      <a href={back.href} className="text-[0.85rem] text-text-muted transition-colors hover:text-text-primary">
        ← {back.label}
      </a>
      <header className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        {character && (
          <MaybeLink href={character.href} label={`More about ${character.name}`}>
            <Avatar name={character.name} src={character.avatar} size="h-[84px] w-[84px] text-[2rem]" ring />
          </MaybeLink>
        )}
        <div className="min-w-0">
          <h1 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-text-primary sm:text-[2.5rem]">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.86rem] text-text-muted">
            {character && (
              <MaybeLink href={character.href} className="font-semibold text-text-primary hover:underline">
                {character.name}
              </MaybeLink>
            )}
            {level && (
              <span className={`rounded-full border px-2.5 py-[3px] text-[0.72rem] font-semibold leading-none text-accent ${ACCENT_60}`}>
                {level}
              </span>
            )}
            <span>
              <span className="font-semibold text-accent">{showName}</span>
              {category && <> · {category}</>}
            </span>
            {minutes > 0 && <span>· {minutes} min</span>}
          </div>
        </div>
      </header>
    </>
  )
}

/** Cream "Before you listen" card. */
export function KeyWordsCard({ keyWords }: { keyWords: PublicStory['key_words'] }) {
  if (!keyWords.length) return null
  return (
    <section aria-labelledby="before-you-listen" className="mt-5 rounded-[20px] bg-cream p-5 text-cream-ink sm:p-6">
      <h2 id="before-you-listen" className="text-[1rem] font-bold tracking-[-0.02em]">
        Before you listen: {keyWords.length} {keyWords.length === 1 ? 'word' : 'words'} to know
      </h2>
      <dl className="mt-3.5 flex flex-col gap-2.5">
        {keyWords.map((k) => (
          <div key={k.word} className="text-[0.93rem] leading-[1.5]">
            <dt className="inline font-bold">{k.word}</dt>
            <dd className="inline text-[#4a4134]"> · {k.meaning}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/** Eyebrow + the story as tappable words (key words underlined in yellow). */
export function StoryText({ story, canSave = true }: { story: PublicStory; canSave?: boolean }) {
  const phrases = keyPhrases(story.key_words)
  return (
    <>
      <p className="mt-12 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent">
        Tap any word to see what it means
      </p>
      <TappableText canSave={canSave}>
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
      <style>{`
        .story-text p { color: rgba(232,232,232,0.92); font-size: 19px; line-height: 1.9; margin-bottom: 1.35em; }
        .story-text h2 { color: var(--color-text-primary); font-size: 22px; margin: 1.6em 0 0.6em; }
        @media (min-width: 768px) { .story-text p { font-size: 21px; line-height: 1.95; } }
        .story-text .speaker { font-weight: 600; color: var(--color-text-primary); }
        .story-text [data-w] { cursor: pointer; border-radius: 5px; transition: background-color .15s; -webkit-tap-highlight-color: transparent; }
        .story-text [data-w]:hover { background: color-mix(in srgb, var(--accent, #5DCAA5) 12%, transparent); }
        .story-text .kw { text-decoration: underline; text-decoration-color: #F2C46B; text-decoration-thickness: 3px; text-underline-offset: 6px; text-decoration-skip-ink: none; }
        .story-text .is-saved { text-decoration: underline; text-decoration-color: var(--accent, #5DCAA5); text-decoration-thickness: 3px; text-underline-offset: 6px; }
        .story-text .is-open { background: color-mix(in srgb, var(--accent, #5DCAA5) 22%, transparent); }
      `}</style>
    </>
  )
}

/** Story text as tappable word spans. */
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

export type MoreItem = {
  key: string
  href: string
  title: string
  showName: string
  showColor: string
  level: string
  minutes: number
  avatarName: string
  avatarSrc: string | null
}

/** Sidebar card: "More with {character}" and its stories. */
export function MoreStories({ heading, items }: { heading: string; items: MoreItem[] }) {
  if (!items.length) return null
  return (
    <div className="rounded-[20px] bg-panel p-5">
      <h2 className="text-[0.95rem] font-bold tracking-[-0.02em]">{heading}</h2>
      <ul className="mt-2 flex flex-col">
        {items.map((s) => (
          <li key={s.key}>
            <a href={s.href} className="-mx-2 flex items-start gap-3 rounded-[12px] px-2 py-2.5 hover:bg-panel-hover">
              <Avatar name={s.avatarName} src={s.avatarSrc} size="h-9 w-9 text-[0.85rem]" />
              <span className="min-w-0">
                <span className="block text-[0.72rem] font-semibold" style={{ color: s.showColor }}>
                  {s.showName}
                </span>
                <span className="mt-0.5 block text-[0.88rem] font-semibold leading-[1.35]">{s.title}</span>
                <span className="mt-0.5 block text-[0.74rem] text-text-muted">
                  {s.level} · {s.minutes} min
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
