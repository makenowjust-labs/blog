import fs from "fs-extra";
import { globby as glob } from "globby";

import { createIndex } from "pagefind";

import { parseMarkdown } from "../src/parse-markdown.mjs";

const { index } = await createIndex();

const posts = await glob("posts/*/index.mdx");
for (const post of posts) {
  const value = await fs.readFile(post, "utf-8");
  const { matter, content } = parseMarkdown(value);
  const url = `/post/${post.replace(/^.*posts\/|\/index.mdx$/g, "")}/`;
  const { errors } = await index.addCustomRecord({
    language: "ja",
    url,
    content,
    meta: {
      title: matter.title,
    },
    filter: {
      tags: matter.tags,
    },
    sort: {
      created: matter.created,
    },
  });

  if (errors.length) {
    const andErrors =
      errors.length === 1
        ? ""
        : errors.length === 2
          ? " (and another error)"
          : ` (and ${errors.length - 1} other errors)`;
    throw new Error(`Error is occured: ${errors[0]}${andErrors}`);
  }
}

await index.writeFiles({
  outputPath: "public/pagefind",
});
