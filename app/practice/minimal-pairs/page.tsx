import Nav from "@/components/Nav";
import PlayButton from "@/components/PlayButton";

const CHIP_CLASSES = [
  { chip: "bg-teal/10 text-teal", accent: "text-teal" },
  { chip: "bg-blue/10 text-blue", accent: "text-blue" },
  { chip: "bg-coral/10 text-coral", accent: "text-coral" },
];

type Pair = {
  word1: string;
  respelling1: string;
  highlight1: string;
  word2: string;
  respelling2: string;
  highlight2: string;
  sound: string;
};

type Group = {
  title: string;
  pairs: Pair[];
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

function Respelling({
  text,
  highlight,
  accentClass,
}: {
  text: string;
  highlight: string;
  accentClass: string;
}) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className={`font-bold ${accentClass}`}>{highlight}</span>
      {after}
    </>
  );
}

export default function MinimalPairsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Hero */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 text-center md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.12em] text-blue">
          Practice
        </div>
        <h1 className="mx-auto max-w-[20ch] text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          Hear the <span className="text-blue">difference.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Word pairs that sound almost identical — except for one sound.
          Listen to each word, then read the respelling out loud to train
          your ear on the contrasts that trip learners up most.
        </p>
      </div>

      {/* Groups */}
      <div className="mx-auto w-full max-w-[820px] px-6 pb-20 md:px-14">
        <div className="flex flex-col gap-12">
          {GROUPS.map((group, gi) => {
            const { chip, accent } = CHIP_CLASSES[gi % CHIP_CLASSES.length];

            return (
              <section key={group.title}>
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[0.8rem] font-bold ${chip}`}
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[1.2rem] font-bold text-text-primary">
                    {group.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {group.pairs.map((pair) => (
                    <div
                      key={`${pair.word1}-${pair.word2}`}
                      className="rounded-2xl border border-line bg-panel p-5 md:p-6"
                    >
                      <div className="flex items-center justify-between border-b border-dashed border-line-soft pb-4">
                        <span
                          className={`rounded-full px-[0.6rem] py-[0.25rem] font-mono text-[0.66rem] uppercase tracking-wide ${chip}`}
                        >
                          {pair.sound}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <PlayButton text={pair.word1} label={`Play ${pair.word1}`} />
                          <div>
                            <div className="text-[1.05rem] font-bold text-text-primary">
                              {pair.word1}
                            </div>
                            <div className="font-mono text-[0.8rem] tracking-wide text-text-muted">
                              <Respelling
                                text={pair.respelling1}
                                highlight={pair.highlight1}
                                accentClass={accent}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <PlayButton text={pair.word2} label={`Play ${pair.word2}`} />
                          <div>
                            <div className="text-[1.05rem] font-bold text-text-primary">
                              {pair.word2}
                            </div>
                            <div className="font-mono text-[0.8rem] tracking-wide text-text-muted">
                              <Respelling
                                text={pair.respelling2}
                                highlight={pair.highlight2}
                                accentClass={accent}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
