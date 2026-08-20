import Link from "next/link";
import Nav from "@/components/Nav";

const LANGUAGES = [
  {
    slug: "english",
    name: "English",
    description: "B1–B2 vocabulary, idioms, and grammar. No signup needed.",
    tab: "bg-teal",
    available: true,
  },
  {
    slug: "traditional-chinese",
    name: "繁體中文",
    description: "Traditional Chinese vocabulary decks.",
    tab: "bg-blue",
    available: true,
  },
  {
    slug: "more",
    name: "More languages",
    description: "Spanish, Japanese, and others — planned for later.",
    tab: "bg-coral",
    available: false,
  },
];

export default function FlashcardsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1120px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <h1 className="text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          Flashcards
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Pick a language to start browsing decks. Free to browse — no account needed.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-6 pb-20 md:px-14">
        <div className="grid grid-cols-1 gap-[1.2rem] md:grid-cols-3">
          {LANGUAGES.map((lang) => {
            const cardClassName = `relative rounded-2xl bg-panel py-[1.8rem] pl-[2.4rem] pr-[1.7rem] ${
              lang.available ? "" : "opacity-50"
            } ${
              lang.available
                ? "transition-[transform,border-color] duration-200 hover:-translate-y-1"
                : ""
            }`;
            const cardContent = (
              <>
                <span
                  className={`absolute -left-px top-[1.8rem] h-[34px] w-2 rounded-r-[6px] ${
                    lang.available
                      ? lang.tab
                      : "border-[1.5px] border-l-0 border-dashed border-line"
                  }`}
                />
                <h3 className="text-[1.15rem] font-bold">{lang.name}</h3>
                <p className="mt-1 text-[0.9rem] leading-[1.5] text-text-muted">
                  {lang.description}
                </p>
                <div className="mt-[1.6rem] flex items-center justify-between border-t border-dashed border-line-soft pt-4 font-mono text-[0.76rem] text-text-muted-2">
                  {lang.available ? (
                    <span className="ml-auto">→</span>
                  ) : (
                    <span className="rounded-full border border-line px-[0.55rem] py-[0.22rem] text-[0.62rem] uppercase tracking-wide">
                      Soon
                    </span>
                  )}
                </div>
              </>
            );

            return lang.available ? (
              <Link
                key={lang.slug}
                href={`/flashcards/${lang.slug}`}
                className={cardClassName}
              >
                {cardContent}
              </Link>
            ) : (
              <div key={lang.slug} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
