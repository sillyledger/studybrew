import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CastAvatars from "@/components/CastAvatars";

export const metadata: Metadata = {
  title: "About Us | Study Brew",
  description:
    "Pieter Borremans is the creator of Study Brew, a language-learning app for English learners at B1-B2 level.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ryokagroup.com/founder#pieter",
  "name": "Pieter Borremans",
  "url": "https://ryokagroup.com/founder",
  "jobTitle": "Founder",
  "description":
    "Pieter Borremans builds, operates & invests in software products at Ryoka.",
  "worksFor": {
    "@id": "https://ryokagroup.com/#organization",
  },
  "birthPlace": {
    "@type": "Place",
    "name": "Indonesia",
  },
  "homeLocation": [
    { "@type": "Place", "name": "Taipei" },
    { "@type": "Place", "name": "London" },
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "KdG University College Antwerp",
  },
  "sameAs": [
    "https://pieterborremans.com",
    "https://ryokagroup.com/founder",
    "https://indiehacker.blog",
    "https://ryoka.xyz",
    "https://www.linkedin.com/in/pieter-borremans/",
    "https://medium.com/@borremanspieter",
    "https://www.youtube.com/@PieterBorremans",
    "https://github.com/sillyledger",
    "https://studybrew.co",
  ],
};

const linkClass =
  "text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary";

/** Body section in the /roadmap pattern: heading on the left, content on the right. */
function AboutSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`about-${id}`}
      className="grid gap-6 border-t border-line py-12 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14 md:py-16"
    >
      <h2
        id={`about-${id}`}
        className="text-[clamp(1.9rem,3vw,2.4rem)] font-bold leading-[1.05]"
      >
        {heading}
      </h2>
      <div className="flex min-w-0 max-w-[60ch] flex-col gap-5 text-[1.05rem] leading-[1.65] text-text-muted">
        {children}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Hero */}
        <section className="grid items-center gap-10 pb-14 pt-10 md:grid-cols-[1.4fr_1fr] md:pb-20 md:pt-16">
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
              <span className="h-px w-5 shrink-0 bg-teal-dim" />
              <span>About Study Brew</span>
            </div>
            <h1 className="text-[clamp(2.8rem,7.5vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              I got tired of
              <br />
              <span className="text-teal">switching apps.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-text-muted">
              I&apos;m Pieter. The idea came from my own frustration learning Traditional
              Chinese. A dictionary app to look words up, a flashcard app to review them, a
              notes app to write things down. None of them talked to each other. Half the time
              I&apos;d look up a word I had already saved weeks before. So I started building
              something for myself, and it slowly turned into Study Brew.
            </p>
          </div>
          <CastAvatars />
        </section>

        <AboutSection id="what" heading="What Study Brew is">
          <p>
            Study Brew is a language-learning app: save the words you&apos;re learning, turn
            them into notebooks, review them as flashcards. No more losing them across five
            different apps.
          </p>
        </AboutSection>

        <AboutSection id="stories" heading="It started with stories">
          <p>
            Study Brew started as a podcast of short English audio stories. That&apos;s still
            part of it.
          </p>
        </AboutSection>

        <AboutSection id="who" heading="Who it's for">
          <p>
            I know what it feels like to understand almost everything, but still need that
            extra structure to make it stick. Study Brew is my attempt to close that gap, one
            word, one story at a time.
          </p>
        </AboutSection>

        <AboutSection id="me" heading="A bit about me">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src="/pieter study brew.png"
              alt="Pieter"
              width={112}
              height={112}
              className="shrink-0 rounded-full"
            />
            <p>
              Born in Indonesia, raised in Belgium. I&apos;ve lived in Shenzhen and London, and
              landed in Taichung. Switching between languages is pretty much my normal.
            </p>
          </div>
        </AboutSection>

        {/* Two promises */}
        <section
          aria-labelledby="about-promises"
          className="grid gap-6 border-t border-line py-12 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14 md:py-16"
        >
          <h2
            id="about-promises"
            className="text-[clamp(1.9rem,3vw,2.4rem)] font-bold leading-[1.05]"
          >
            Two promises
          </h2>
          <ul className="grid min-w-0 gap-3.5 sm:grid-cols-2">
            {["The stories stay free.", "Every voice is a real one, never AI."].map((promise) => (
              <li
                key={promise}
                className="flex gap-4 rounded-2xl border border-line bg-panel p-5 md:p-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.5rem] inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-teal"
                />
                <h3 className="text-[1.15rem] font-bold leading-snug">{promise}</h3>
              </li>
            ))}
          </ul>
        </section>

        {/* Say hi */}
        <section className="pb-10 pt-4">
          <div className="flex flex-col gap-6 rounded-[22px] border border-teal/40 bg-gradient-to-r from-teal/[0.08] to-blue/[0.08] p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div>
              <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold leading-[1.05]">
                Say hi
              </h2>
              <p className="mt-2.5 max-w-[48ch] text-[0.98rem] leading-[1.6] text-text-muted">
                Questions, feedback, or just want to say hi — this inbox is read by a real person.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] bg-text-primary px-5 py-3 text-[0.9rem] font-semibold text-background transition-opacity hover:opacity-90 md:self-auto"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <p className="pb-20 text-[0.85rem] text-text-muted-2 md:pb-24">
          Study Brew is part of{" "}
          <a className={linkClass} href="https://www.onpointvc.com" target="_blank" rel="noopener noreferrer">
            OnPoint VC
          </a>{" "}
          and{" "}
          <a className={linkClass} href="https://www.ryokagroup.com" target="_blank" rel="noopener noreferrer">
            Ryoka Group
          </a>
          .
        </p>
      </div>
    </main>
  );
}
