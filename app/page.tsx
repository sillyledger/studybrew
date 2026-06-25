"use client";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1E3A5F"/>
            <path d="M8 22 Q10 10 16 10 Q22 10 24 22" stroke="#E8A45A" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M12 22 Q13 16 16 16 Q19 16 20 22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            <circle cx="16" cy="25" r="1.5" fill="#E8A45A"/>
          </svg>
          <span className="text-white font-semibold tracking-wide">Study Brew</span>
        </div>
        <div className="flex gap-8 text-sm text-white/50">
          <a href="#" className="hover:text-white transition-colors">stories</a>
          <a href="#" className="hover:text-white transition-colors">about</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center px-8 max-w-4xl mx-auto w-full py-24">
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6">English for B1–B2 learners</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          Stories that teach.<br />Not the other way around.
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-12">
          Your cozy corner where stories and the English language come together. Short, calm audio stories with real characters and everyday situations — told in warm, natural English. No grammar drills. No pressure. Made for learners who are done with textbooks and just want to feel comfortable in the language.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-white/60 text-sm">Language learning app in development</span>
          </div>
          
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0F1923] font-semibold text-sm rounded-full px-6 py-3 w-fit transition-colors"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 max-w-4xl mx-auto w-full">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

    </main>
  );
}
