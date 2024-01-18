import { glob, fs } from "zx";
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
}

await index.writeFiles({
  outputPath: "public/pagefind",
});
