import createMdx from "@next/mdx";

import fs from "fs-extra";
import { $ } from "zurk";

import rehypeKatex from "rehype-katex";
import { rehypePrettyCode } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import rehypeMdxExcerpt from "./src/rehype-mdx-excerpt.mjs";
import rehypeMermaid from "./src/rehype-mermaid.mjs";
import rehypePseudocode from "./src/rehype-pseudocode.mjs";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/blog" : "";

const withMdx = createMdx({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMath,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [
      [rehypeKatex, { trust: true, strict: false }],
      rehypePseudocode,
      rehypeMermaid,
      rehypePrettyCode,
      rehypeMdxExcerpt,
    ],
    remarkRehypeOptions: {
      footnoteLabel: "脚注",
    },
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  trailingSlash: true,
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: { unoptimized: true },
  env: {
    BLOG_BASE_PATH: basePath,
  },
};

if (process.env.RUN_OG_IMAGE === "1") {
  await $`bun scripts/og-image.jsx`;
}
if (process.env.RUN_PAGEFIND === "1" || !fs.pathExistsSync("public/pagefind")) {
  await $`bun scripts/pagefind.js`;
}

export default withMdx(nextConfig);
