import { fromMarkdown } from "mdast-util-from-markdown";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { toString as mdastToString } from "mdast-util-to-string";
import { frontmatter } from "micromark-extension-frontmatter";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import { mdxjs } from "micromark-extension-mdxjs";
import { remove } from "unist-util-remove";
import { parse as parseYaml } from "yaml";

export const parseMarkdown = (value) => {
  const tree = fromMarkdown(value, {
    extensions: [mdxjs(), gfm(), frontmatter(), math()],
    mdastExtensions: [mdxFromMarkdown(), gfmFromMarkdown(), frontmatterFromMarkdown(), mathFromMarkdown()],
  });

  const matter = parseYaml(tree.children.find((child) => child.type === "yaml").value);

  remove(tree, ["yaml", "mdxjsEsm", "mdxFlowExpression", "mdxJsxFlowElement"]);
  const content = mdastToString(tree);

  return { matter, content };
};
