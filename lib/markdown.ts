import MarkdownIt from "markdown-it";
import shiki from "markdown-it-shiki";
import texmath from "markdown-it-texmath";
import katex from "katex";

import pseudocode from "./markdown-it-pseudocode";

export const render = (content: string): string => {
  const md = new MarkdownIt({ html: true })
    .use(shiki, { theme: "rose-pine" })
    .use(texmath, { engine: katex, katexOptions: { trust: true } })
    .use(pseudocode);

  return md.render(content);
};
