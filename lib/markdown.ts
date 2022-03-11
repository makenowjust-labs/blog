import MarkdownIt from "markdown-it";
import shiki from "markdown-it-shiki";
import texmath from "markdown-it-texmath";
import katex from "katex";

const md = new MarkdownIt({ html: true })
  .use(shiki, { theme: "rose-pine" })
  .use(texmath, { engine: katex });

export const render = (content: string): string => {
  return md.render(content);
};
