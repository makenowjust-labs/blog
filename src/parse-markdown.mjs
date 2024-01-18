import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import { gfm } from "micromark-extension-gfm";
import { mdxjs } from "micromark-extension-mdxjs";
import { math } from "micromark-extension-math";
import { frontmatter } from "micromark-extension-frontmatter";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { mathFromMarkdown } from "mdast-util-math";
import { parse as parseYaml } from "yaml";
import { remove } from "unist-util-remove";

export const parseMarkdown = (value) => {
  const tree = fromMarkdown(value, {
    extensions: [mdxjs(), gfm(), frontmatter(), math()],
    mdastExtensions: [
      mdxFromMarkdown(),
      gfmFromMarkdown(),
      frontmatterFromMarkdown(),
      mathFromMarkdown(),
    ],
  });

  const matter = parseYaml(
    tree.children.find((child) => child.type === "yaml").value,
  );

  remove(tree, ["yaml", "mdxjsEsm", "mdxFlowExpression", "mdxJsxFlowElement"]);
  const content = toString(tree);

  return { matter, content };
};
