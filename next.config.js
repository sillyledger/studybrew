/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Flashcards are English-only now: the old language pages go to the deck shelf.
      { source: "/flashcards/english", destination: "/flashcards", permanent: true },
      { source: "/flashcards/traditional-chinese", destination: "/flashcards", permanent: true },
    ];
  },
};

module.exports = nextConfig;
