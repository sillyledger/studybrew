import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "stories-audio";
const ARTICLE = "listening-to-stories";

export const metadata: Metadata = {
  title: "Listening to stories | Study Brew",
  description: "Play stories here, on Spotify or Apple Podcasts.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";

const PLACES: React.ReactNode[] = [
  <>
    <b className={B}>Play here:</b> the Study Brew player
  </>,
  <>
    <b className={B}>Spotify</b> or <b className={B}>Apple Podcasts</b>, when the story is there
  </>,
];

export default function ListeningToStoriesPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-yellow">Stories &amp; audio</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Listening to stories</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Every story is free. Read it, listen to it, or both at once.</p>

      <h2 className={H2}>Find a story</h2>
      <p className={P}>
        Go to <b className={B}>Stories</b>. Filter by level, show or character.
      </p>

      <h2 className={H2}>Listen</h2>
      <p className={P}>
        In the <b className={B}>Listen</b> box, choose where to play:
      </p>
      <ul className="my-4 flex flex-col gap-2">
        {PLACES.map((item, i) => (
          <li key={i} className="flex gap-3 text-[0.92rem] leading-[1.75] text-white/80">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className={P}>
        The Play here player has three speeds: <b className={B}>0.75×</b>, <b className={B}>1×</b> and{" "}
        <b className={B}>1.25×</b>. You can also jump back or forward 10 seconds.
      </p>
      <p className={P}>When you scroll down, the player stays at the bottom of the screen, so you can read along.</p>

      <HelpTip variant="tip">Try 0.75× the first time, then listen again at 1×.</HelpTip>
      <HelpTip variant="note">Every story is read by a real person, not AI.</HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
