import createMdx from "@next/mdx";

import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { $ } from "zx";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

import rehypeMdxExcerpt from "./src/rehype-mdx-excerpt.mjs";
import rehypePseudocode from "./src/rehype-pseudocode.mjs";

const isProduction = process.env.NODE_ENV === "production";

const withMdx = createMdx({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMath,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypePseudocode,
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
  basePath: isProduction ? "/blog/" : "",
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: { unoptimized: true },
};

if (process.env.RUN_OG_IMAGE === "1") {
  await $`bun scripts/og-image.jsx`;
}

export default withMdx(nextConfig);
