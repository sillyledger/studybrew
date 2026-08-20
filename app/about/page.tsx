import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Study Brew | Created by Pieter Borremans",
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
              stories, and that's still part of it. But today it's a
              language-learning app: a place to save the words you're
              actually learning, turn them into notebooks, and review them
              as flashcards, instead of losing them across five different
              apps.
            </p>
            <p>
              I'm Pieter. The idea came out of my own frustration learning
              Traditional Chinese. I had a dictionary app to look words up,
              a flashcard app to review them, and a notes app to write
              things down, but none of them talked to each other. I kept
              re-learning words I'd already saved once. Study Brew is the
              tool I wished existed: one place where the words you save
              actually stick.
            </p>
            <p>
              I'm not a native English speaker either. Born in Indonesia,
              raised in Belgium, and educated at KdG University College
              Antwerp, I've spent most of my adult life learning languages
              the hard way, moving between Taipei and London along the
              way.
            </p>
            <p>
              I know what it feels like to understand almost everything,
              but still need that extra structure to make a language
              actually stick. Study Brew is my attempt to close that gap,
              one word, one story at a time.
            </p>
            <p>Study Brew is part of OnPoint VC.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
