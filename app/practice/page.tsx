import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Practice | Study Brew",
  description:
    "Drills and exercises to sharpen your ear and pronunciation. Free to browse — no account needed.",
};

const DRILLS = [
  {
    slug: "tongue-twisters",
    name: "Tongue Twisters",
    description: "Classic English tongue twisters to sharpen pronunciation.",
    count: "6 classic drills",
    tab: "bg-teal",
    available: true,
  },
  {
    slug: "minimal-pairs",
    name: "Minimal Pairs",
    description: "Word pairs that sound almost identical — except for one sound.",
    count: "25 pairs across 5 sound contrasts",
    tab: "bg-blue",
    available: true,
  },
];

export default function PracticePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1120px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <h1 className="text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          Practice
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Drills and exercises to sharpen your ear and pronunciation. Free to
          browse — no account needed.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-6 pb-20 md:px-14">
        <div className="grid grid-cols-1 gap-[1.2rem] md:grid-cols-2">
          {DRILLS.map((drill) => (
            <Link
              key={drill.slug}
              href={`/practice/${drill.slug}`}
              className="relative rounded-2xl bg-panel py-[1.8rem] pl-[2.4rem] pr-[1.7rem] transition-[transform,border-color] duration-200 hover:-translate-y-1"
            >
              <span
                className={`absolute -left-px top-[1.8rem] h-[34px] w-2 rounded-r-[6px] ${drill.tab}`}
              />
              <h3 className="text-[1.15rem] font-bold">{drill.name}</h3>
              <p className="mt-1 text-[0.9rem] leading-[1.5] text-text-muted">
                {drill.description}
              </p>
              <div className="mt-[1.6rem] flex items-center justify-between border-t border-dashed border-line-soft pt-4 font-mono text-[0.76rem] text-text-muted-2">
                <span>{drill.count}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
