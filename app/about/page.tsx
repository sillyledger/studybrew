import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

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

export default function About() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[900px] px-6 pb-4 pt-10 md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
          About
        </div>
        <h1 className="max-w-[16ch] text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          I got tired of
          <br />
          switching apps.
        </h1>
      </div>

      <section className="mx-auto w-full max-w-[900px] px-6 pb-20 pt-10 md:px-14">
        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="flex-shrink-0">
            <Image
              src="/pieter study brew.png"
              alt="Pieter"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-6 text-[1.05rem] leading-relaxed text-text-muted">
            <p>
              Study Brew started as a podcast of short English audio
              stories. That's still part of it. Today it's a
              language-learning app: save the words you're learning, turn
              them into notebooks, review them as flashcards. No more
              losing them across five different apps.
            </p>
            <p>
              I'm Pieter. The idea came from my own frustration learning
              Traditional Chinese. A dictionary app to look words up, a
              flashcard app to review them, a notes app to write things
              down. None of them talked to each other. I kept re-learning
              words I'd already saved. Study Brew is the tool I wished
              existed: one place where the words you save stick.
            </p>
            <p>
              I'm not a native English speaker either. Born in Indonesia,
              raised in Belgium, educated at KdG University College
              Antwerp. I've spent most of my adult life learning languages
              the hard way, moving between Taipei and London along the
              way.
            </p>
            <p>
              I know what it feels like to understand almost everything,
              but still need that extra structure to make it stick. Study
              Brew is my attempt to close that gap, one word, one story at
              a time.
            </p>
            <p>
              Study Brew is part of{" "}
              <a
                className="text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary"
                href="https://www.onpointvc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                OnPoint VC
              </a>{" "}
              and{" "}
              <a
                className="text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary"
                href="https://www.ryokagroup.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ryoka Group
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
