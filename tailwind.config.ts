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
        sans: ['var(--font-biz-udpgothic)', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
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
