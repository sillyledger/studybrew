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
        "teal-dim": "#2f6b53",
        "teal-tint": "rgba(93,202,165,0.14)",
        "teal-ink": "#06291d",
        blue: "#7CACDD",
        coral: "#F0997B",
        "coral-tint": "rgba(240,153,123,0.16)",
        "line-soft": "rgba(38,49,64,0.6)",
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
