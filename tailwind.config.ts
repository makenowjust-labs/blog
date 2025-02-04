import typography from "@tailwindcss/typography";

import type { Config } from "tailwindcss";

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
            blockquote: { fontStyle: "normal" },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
