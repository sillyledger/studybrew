import Nav from "@/components/Nav";

type Difficulty = "Easy" | "Medium" | "Hard";

const CHIP_CLASSES = ["bg-teal/10 text-teal", "bg-blue/10 text-blue", "bg-coral/10 text-coral"];

const DIFFICULTY_CLASSES: Record<Difficulty, string> = {
  Easy: "bg-teal/10 text-teal",
  Medium: "bg-blue/10 text-blue",
  Hard: "bg-coral/10 text-coral",
};

const TWISTERS: {
  title: string;
  difficulty: Difficulty;
  focus: string;
  lines: string[];
  note?: string;
}[] = [
  {
    title: "She Sells Seashells",
    difficulty: "Easy",
    focus: "S / SH",
    lines: [
      "She sells seashells by the seashore.",
      "The shells she sells are seashells, I'm sure.",
      "So if she sells seashells on the seashore,",
      "Then I'm sure she sells seashore shells.",
    ],
  },
  {
    title: "Peter Piper",
    difficulty: "Easy",
    focus: "P",
    lines: [
      "Peter Piper picked a peck of pickled peppers.",
      "A peck of pickled peppers Peter Piper picked.",
      "If Peter Piper picked a peck of pickled peppers,",
      "Where's the peck of pickled peppers Peter Piper picked?",
    ],
  },
  {
    title: "How Much Wood",
    difficulty: "Medium",
    focus: "W / CH",
    lines: [
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
      "He would chuck, he would, as much as he could,",
      "And chuck as much wood as a woodchuck would",
      "If a woodchuck could chuck wood.",
    ],
  },
  {
    title: "Fuzzy Wuzzy",
    difficulty: "Medium",
    focus: "F / W",
    lines: [
      "Fuzzy Wuzzy was a bear.",
      "Fuzzy Wuzzy had no hair.",
      "Fuzzy Wuzzy wasn't fuzzy, was he?",
    ],
  },
  {
    title: "Six Slippery Snails",
    difficulty: "Hard",
    focus: "SL",
    lines: ["Six slippery snails slid slowly seaward."],
  },
  {
    title: "Red Lorry, Yellow Lorry",
    difficulty: "Hard",
    focus: "R / L",
    lines: ["Red lorry, yellow lorry, red lorry, yellow lorry."],
    note: "Repeat as many times as you can without tripping up.",
  },
];

export default function TongueTwistersPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Nav />

      {/* Hero */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 text-center md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
          Practice
        </div>
        <h1 className="mx-auto max-w-[20ch] text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          Twist your <span className="text-teal">tongue.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Classic English tongue twisters — the same ones native speakers
          grew up stumbling over. Read them out loud, slow at first, to
          sharpen pronunciation and mouth muscle memory for tricky sound
          pairs.
        </p>
      </div>

      {/* Twisters */}
      <div className="mx-auto w-full max-w-[820px] px-6 pb-20 md:px-14">
        <div className="flex flex-col gap-5">
          {TWISTERS.map((twister, i) => {
            const chipClass = CHIP_CLASSES[i % CHIP_CLASSES.length];
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={twister.title}
                className="rounded-2xl border border-line bg-panel p-6 md:p-8"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[0.8rem] font-bold ${chipClass}`}
                  >
                    {num}
                  </span>
                  <h2 className="text-[1.2rem] font-bold text-text-primary">
                    {twister.title}
                  </h2>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-dashed border-line-soft pt-4">
                  <span
                    className={`rounded-full px-[0.6rem] py-[0.25rem] font-mono text-[0.66rem] uppercase tracking-wide ${DIFFICULTY_CLASSES[twister.difficulty]}`}
                  >
                    {twister.difficulty}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-wide text-text-muted-2">
                    Focus:{" "}
                    <span className="text-text-muted">{twister.focus}</span>
                  </span>
                </div>

                <div className="mt-5 border-l-2 border-line pl-5">
                  {twister.lines.map((line, li) => (
                    <p
                      key={li}
                      className="italic leading-[1.7] text-text-muted"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {twister.note && (
                  <p className="mt-3 text-[0.78rem] text-text-muted-2">
                    {twister.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line-soft px-6 py-10 md:px-14">
        <span className="text-base font-bold">Study Brew</span>
        <span className="font-mono text-[0.7rem] text-text-muted-2">
          Made by a learner, for learners.
        </span>
      </footer>
    </main>
  );
}
