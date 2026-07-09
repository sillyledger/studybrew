"use client";
import React from "react";
import Image from "next/image";

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
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <nav className="flex justify-between items-center px-8 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1E3A5F"/>
            <path d="M8 22 Q10 10 16 10 Q22 10 24 22" stroke="#E8A45A" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M12 22 Q13 16 16 16 Q19 16 20 22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            <circle cx="16" cy="25" r="1.5" fill="#E8A45A"/>
          </svg>
          <a href="/" className="text-white font-semibold tracking-wide">Study Brew</a>
        </div>
        <div className="flex gap-8 text-sm text-white/50">
          <a href="/stories" className="hover:text-white transition-colors">stories</a>
          <a href="/about" className="text-white transition-colors">about</a>
        </div>
      </nav>

      <section className="flex-1 px-8 max-w-4xl mx-auto w-full py-24">
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6">About</p>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-16">
          English stories.<br />Made by a learner.
        </h1>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-shrink-0">
            <Image
              src="/pieter study brew.png"
              alt="Pieter"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-6 text-white/80 text-lg leading-relaxed">
            <p>
              Study Brew is a podcast of short, calm English audio stories. Written and recorded for people at the B1–B2 level. The idea is simple: listen, and let the language sink in naturally. No grammar drills. No pressure. Just a good story told slowly and clearly.
            </p>
            <p>
              I&apos;m Pieter. The voice behind Study Brew. I&apos;m not a native English speaker either — which is exactly why I made this. Born in Indonesia, raised in Belgium, and educated at KdG University College Antwerp, I&apos;ve spent most of my adult life learning languages the hard way, moving between Taipei and London along the way.
            </p>
            <p>
              I know what it feels like to understand almost everything, but still need that extra bit of exposure to feel truly comfortable in a language. Study Brew is my small contribution to that gap. One story at a time.
            </p>
            <p>
              Study Brew is part of{" "}
              <a
                href="https://ryokagroup.com/founder"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Ryoka
              </a>
              , where I build, operate, and invest in software products.
            </p>
            <div className="flex gap-6 pt-4">
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
                Listen on Spotify →
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-8 py-6 max-w-4xl mx-auto w-full">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

    </main>
  );
}
