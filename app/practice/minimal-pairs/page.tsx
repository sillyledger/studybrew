import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MinimalPairs, { type Group } from "@/components/MinimalPairs";

export const metadata: Metadata = {
  title: "Minimal Pairs Practice | Study Brew",
  description:
    "Word pairs that sound almost identical except for one sound — sharpen your ear for tricky English contrasts.",
};

const GROUPS: Group[] = [
  {
    title: "Short/Long Vowels",
    pairs: [
      { word1: "ship", respelling1: "SHIP", highlight1: "I", word2: "sheep", respelling2: "SHEEP", highlight2: "EE", sound: "I vs EE" },
      { word1: "bit", respelling1: "BIT", highlight1: "I", word2: "beat", respelling2: "BEET", highlight2: "EE", sound: "I vs EE" },
      { word1: "fill", respelling1: "FIL", highlight1: "I", word2: "feel", respelling2: "FEEL", highlight2: "EE", sound: "I vs EE" },
      { word1: "live", respelling1: "LIV", highlight1: "I", word2: "leave", respelling2: "LEEV", highlight2: "EE", sound: "I vs EE" },
      { word1: "sit", respelling1: "SIT", highlight1: "I", word2: "seat", respelling2: "SEET", highlight2: "EE", sound: "I vs EE" },
    ],
  },
  {
    title: "L vs R",
    pairs: [
      { word1: "light", respelling1: "LYT", highlight1: "L", word2: "right", respelling2: "RYT", highlight2: "R", sound: "L vs R" },
      { word1: "lead", respelling1: "LEED", highlight1: "L", word2: "read", respelling2: "REED", highlight2: "R", sound: "L vs R" },
      { word1: "long", respelling1: "LAWNG", highlight1: "L", word2: "wrong", respelling2: "RAWNG", highlight2: "R", sound: "L vs R" },
      { word1: "glass", respelling1: "GLASS", highlight1: "L", word2: "grass", respelling2: "GRASS", highlight2: "R", sound: "L vs R" },
      { word1: "collect", respelling1: "kuh-LEKT", highlight1: "L", word2: "correct", respelling2: "kuh-REKT", highlight2: "R", sound: "L vs R" },
    ],
  },
  {
    title: "TH Sounds",
    pairs: [
      { word1: "think", respelling1: "THINK", highlight1: "TH", word2: "sink", respelling2: "SINK", highlight2: "S", sound: "TH vs S" },
      { word1: "three", respelling1: "THREE", highlight1: "TH", word2: "free", respelling2: "FREE", highlight2: "F", sound: "TH vs F" },
      { word1: "thank", respelling1: "THANK", highlight1: "TH", word2: "sank", respelling2: "SANK", highlight2: "S", sound: "TH vs S" },
      { word1: "mouth", respelling1: "MOWTH", highlight1: "TH", word2: "mouse", respelling2: "MOWSS", highlight2: "SS", sound: "TH vs S" },
      { word1: "bath", respelling1: "BATH", highlight1: "TH", word2: "bass", respelling2: "BASS", highlight2: "SS", sound: "TH vs S" },
    ],
  },
  {
    title: "V vs W",
    pairs: [
      { word1: "vest", respelling1: "VEST", highlight1: "V", word2: "west", respelling2: "WEST", highlight2: "W", sound: "V vs W" },
      { word1: "vine", respelling1: "VYN", highlight1: "V", word2: "wine", respelling2: "WYN", highlight2: "W", sound: "V vs W" },
      { word1: "vet", respelling1: "VET", highlight1: "V", word2: "wet", respelling2: "WET", highlight2: "W", sound: "V vs W" },
      { word1: "verse", respelling1: "VURSS", highlight1: "V", word2: "worse", respelling2: "WURSS", highlight2: "W", sound: "V vs W" },
      { word1: "vary", respelling1: "VAIR-ee", highlight1: "V", word2: "wary", respelling2: "WAIR-ee", highlight2: "W", sound: "V vs W" },
    ],
  },
  {
    title: "Final Consonant Voicing",
    pairs: [
      { word1: "cap", respelling1: "KAP", highlight1: "P", word2: "cab", respelling2: "KAB", highlight2: "B", sound: "P vs B" },
      { word1: "seat", respelling1: "SEET", highlight1: "T", word2: "seed", respelling2: "SEED", highlight2: "D", sound: "T vs D" },
      { word1: "bus", respelling1: "BUSS", highlight1: "SS", word2: "buzz", respelling2: "BUZZ", highlight2: "ZZ", sound: "S vs Z" },
      { word1: "back", respelling1: "BAK", highlight1: "K", word2: "bag", respelling2: "BAG", highlight2: "G", sound: "K vs G" },
      { word1: "price", respelling1: "PRYSS", highlight1: "SS", word2: "prize", respelling2: "PRYZ", highlight2: "Z", sound: "S vs Z" },
    ],
  },
];

export default function MinimalPairsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        <MinimalPairs groups={GROUPS} />
      </div>
    </main>
  );
}
