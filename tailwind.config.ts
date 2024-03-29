import type { Config } from "tailwindcss";

import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,mdx,ts,tsx}",
    "./components/**/*.{js,jsx,mdx,ts,tsx}",
    "./posts/**/*.{js,jsx,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"BIZ UDPGothic"', "sans-serif"],
        mono: ['"Sometype Mono"', "monospace"],
        impact: ['"Share Tech Mono"', '"Biz UDPGothic"', "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [typography, daisyui],
};

export default config;
