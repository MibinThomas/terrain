import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terrain: {
          deepBlack: "#090909",
          nearBlack: "#111111",
          softWhite: "#F1F2F3",
          pureWhite: "#FFFFFF",
          midGrey: "#8A8A8A",
          lightGrey: "#D8DADD",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
