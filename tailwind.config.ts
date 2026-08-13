import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#10151b",
        panel: "#161d25",
        "panel-2": "#131920",
        line: "#263140",
        teal: "#5DCAA5",
        blue: "#7CACDD",
        coral: "#F0997B",
        text: {
          primary: "#F2F0E9",
          muted: "#8b96a3",
          "muted-2": "#5c6673",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
