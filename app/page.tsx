export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-4xl mx-auto w-full">
        <span className="text-white font-semibold tracking-wide">Study Brew</span>
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
        <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-12">
          Short audio stories with real characters, everyday situations, and natural English. Made for learners who are done with textbooks.
        </p>
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 w-fit">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-white/60 text-sm">Language learning app in development</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 max-w-4xl mx-auto w-full">
        <p className="text-white/20 text-sm">© 2026 Study Brew · Part of <a href="https://ryoka.xyz" className="hover:text-white/40 transition-colors">Ryoka</a></p>
      </footer>

    </main>
  );
}
