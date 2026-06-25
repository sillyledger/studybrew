"use client";
import React from "react";

const categories = [
  { name: "Bedtime Stories", slug: "bedtime", description: "Wind down with calm, slow English.", available: true, emoji: "🌙" },
  { name: "Daily Life", slug: "daily-life", description: "Everyday situations, natural English.", available: false, emoji: "☀️" },
  { name: "Travel", slug: "travel", description: "Stories from cities and quiet corners.", available: false, emoji: "✈️" },
  { name: "Career", slug: "career", description: "Work, ambition, and small victories.", available: false, emoji: "💼" },
  { name: "Culture", slug: "culture", description: "Habits, traditions, and human moments.", available: false, emoji: "🌍" },
];

const characters = [
  { name: "Anna", role: "The Curious Traveller", description: "28, freelance photographer. Always exploring.", color: "#E8A45A" },
  { name: "Daniel", role: "The Quiet Problem-Solver", description: "31, developer. Works from home with his cat Biscuit.", color: "#7EB8C9" },
  { name: "Luna", role: "The Wandering Cat", description: "Travels with a worn notebook and favourite scarf.", color: "#B8A9E8" },
  { name: "Marco", role: "The Friendly Neighbour", description: "28, community worker. Always cooking for others.", color: "#A8D5A2" },
];

export default function Stories() {
  return (
    <main className="min-h-screen flex flex-col">

      <nav className="flex justify-between items-center px-8 py-6 max-w-5xl mx-auto w-full">
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
          <a href="/stories" className="text-white transition-colors">stories</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
        </div>
      </nav>

      <section className="px-8 max-w-5xl mx-auto w-full py-16">
        <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Stories</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Find your story.
        </h1>
        <p className="text-white/60 text-lg mb-16 max-w-xl">
          Browse by mood, topic, or character. All stories are B1–B2 level, written and recorded by a non-native speaker.
        </p>

        {/* Categories */}
        <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Browse by category</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.available ? `/stories/${cat.slug}` : undefined}
              className={`relative rounded-2xl p-6 border transition-all no-underline block ${
                cat.available
                  ? "border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
                  : "border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed"
              }`}
            >
              <span className="text-2xl mb-3 block">{cat.emoji}</span>
              <h3 className="text-white font-semibold mb-1">{cat.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{cat.description}</p>
              {!cat.available && (
                <span className="absolute top-4 right-4 text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">
                  Soon
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Characters */}
        <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Browse by character</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {characters.map((char) => (
            <div
              key={char.name}
              className="rounded-2xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
            >
              <div
                className="w-8 h-8 rounded-full mb-3"
                style={{ backgroundColor: char.color + "33", border: `2px solid ${char.color}` }}
              />
              <h3 className="text-white font-semibold mb-0.5">{char.name}</h3>
              <p className="text-white/40 text-xs mb-2">{char.role}</p>
              <p className="text-white/50 text-sm leading-relaxed">{char.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-8 py-6 max-w-5xl mx-auto w-full mt-auto">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

    </main>
  );
}
