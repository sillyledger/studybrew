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
    title: "Which Witch",
    difficulty: "Easy",
    focus: "W / CH",
    lines: [
      "Which witch is which?",
    ],
    note: "Say it five times fast.",
  },
  {
    title: "She Sees Cheese",
    difficulty: "Easy",
    focus: "SH / S / CH",
    lines: [
      "She sees cheese.",
    ],
    note: "Say it five times fast.",
  },
  {
    title: "Sheena and Sheila",
    difficulty: "Easy",
    focus: "SH / EE",
    lines: [
      "Sheena leads, Sheila needs.",
    ],
  },
  {
    title: "Ice Cream",
    difficulty: "Easy",
    focus: "S / CR",
    lines: [
      "I scream, you scream,",
      "we all scream for ice cream.",
    ],
  },
  {
    title: "Fred and Ted",
    difficulty: "Easy",
    focus: "F / T / D",
    lines: [
      "Fred fed Ted bread,",
      "and Ted fed Fred bread.",
    ],
  },
  {
    title: "Four Fine Fish",
    difficulty: "Easy",
    focus: "F",
    lines: [
      "Four fine fresh fish for you.",
    ],
  },
  {
    title: "Kitty in the Kitchen",
    difficulty: "Easy",
    focus: "K",
    lines: [
      "Kitty caught the kitten in the kitchen.",
    ],
  },
  {
    title: "Two Tiny Tigers",
    difficulty: "Easy",
    focus: "T",
    lines: [
      "Two tiny tigers take two taxis to town.",
    ],
  },
  {
    title: "Big Black Bug",
    difficulty: "Easy",
    focus: "B",
    lines: [
      "A big black bug bit a big black bear,",
      "but where is the big black bear",
      "that the big black bug bit?",
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
    title: "Red Leather",
    difficulty: "Medium",
    focus: "R / L",
    lines: [
      "Red leather, yellow leather,",
      "red leather, yellow leather.",
    ],
    note: "Keep going as long as you can.",
  },
  {
    title: "Unique New York",
    difficulty: "Medium",
    focus: "N / Y",
    lines: [
      "Unique New York, unique New York,",
      "you know you need unique New York.",
    ],
  },
  {
    title: "Betty Botter",
    difficulty: "Medium",
    focus: "B / T",
    lines: [
      "Betty Botter bought some butter,",
      "but she said, \"The butter's bitter.",
      "If I put it in my batter,",
      "it will make my batter bitter.",
      "But a bit of better butter",
      "will make my batter better.\"",
    ],
  },
  {
    title: "A Proper Copper Coffee Pot",
    difficulty: "Medium",
    focus: "P / K",
    lines: [
      "A proper copper coffee pot.",
    ],
  },
  {
    title: "Rubber Baby Buggy Bumpers",
    difficulty: "Medium",
    focus: "B",
    lines: [
      "Rubber baby buggy bumpers.",
    ],
  },
  {
    title: "Fresh Fried Fish",
    difficulty: "Medium",
    focus: "F / SH",
    lines: [
      "Fresh fried fish, fish fresh fried,",
      "fried fish fresh, fish fried fresh.",
    ],
  },
  {
    title: "Susie's Shoeshine Shop",
    difficulty: "Medium",
    focus: "S / SH",
    lines: [
      "I saw Susie sitting in a shoeshine shop.",
      "Where she sits, she shines,",
      "and where she shines, she sits.",
    ],
  },
  {
    title: "Larry's Letter",
    difficulty: "Medium",
    focus: "L",
    lines: [
      "Larry sent the latter a letter later.",
    ],
  },
  {
    title: "Clean Cream Can",
    difficulty: "Medium",
    focus: "CL / CR",
    lines: [
      "How can a clam cram",
      "in a clean cream can?",
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
  {
    title: "Toy Boat",
    difficulty: "Hard",
    focus: "T / B",
    lines: [
      "Toy boat. Toy boat. Toy boat.",
    ],
    note: "Say it five times fast.",
  },
  {
    title: "Irish Wristwatch",
    difficulty: "Hard",
    focus: "R / W / ST",
    lines: [
      "Irish wristwatch, Swiss wristwatch.",
    ],
  },
  {
    title: "Truly Rural",
    difficulty: "Hard",
    focus: "R / L",
    lines: [
      "Truly rural, truly rural.",
    ],
    note: "Say it five times fast.",
  },
  {
    title: "Lesser Leather",
    difficulty: "Hard",
    focus: "L / W / TH",
    lines: [
      "Lesser leather never weathered",
      "wetter weather better.",
    ],
  },
  {
    title: "Thirty-Three Thieves",
    difficulty: "Hard",
    focus: "TH",
    lines: [
      "Thirty-three thieves thought",
      "that they thrilled the throne",
      "throughout Thursday.",
    ],
  },
  {
    title: "A Loyal Warrior",
    difficulty: "Hard",
    focus: "R / L / W",
    lines: [
      "A loyal warrior will rarely worry",
      "why we rule.",
    ],
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
