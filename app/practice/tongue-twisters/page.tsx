import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TongueTwisters, { type Twister } from "@/components/TongueTwisters";

export const metadata: Metadata = {
  title: "Tongue Twisters Practice | Study Brew",
  description:
    "Classic English tongue twisters to sharpen your pronunciation, sound by sound.",
};

const TWISTERS: Twister[] = [
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
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        <TongueTwisters twisters={TWISTERS} />
      </div>
    </main>
  );
}
