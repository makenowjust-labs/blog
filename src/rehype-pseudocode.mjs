import { fromHtml } from "hast-util-from-html";
import pseudocode from "pseudocode";
import { visit, SKIP } from "unist-util-visit";

export default function rehypePseudocode() {
  return (tree) => {
    let captionCount = 0;

    visit(tree, "element", (node, index, parent) => {
      if (
        !(
          node.tagName === "pre" &&
          Array.isArray(node.children) &&
          node.children.length === 1
        )
      ) {
        return;
      }

      const codeNode = node.children[0];
      if (
        !(
          codeNode.type === "element" &&
          codeNode.tagName === "code" &&
          Array.isArray(codeNode.children) &&
          codeNode.children.length === 1
        )
      ) {
        return;
      }

      const textNode = codeNode.children[0];
      if (textNode.type !== "text") {
        return;
      }

      if (
        !(
          codeNode.properties &&
          Array.isArray(codeNode.properties.className) &&
          codeNode.properties.className[0] === "language-pseudocode"
        )
      ) {
        return;
      }

      const source = textNode.value;
      const rendered = pseudocode.renderToString(source, {
        captionCount,
      });
      captionCount += 1;

      const newTree = fromHtml(`<div class="not-prose">${rendered}</div>`, {
        fragment: true,
      });
      parent.children[index] = newTree.children[0];

      return SKIP;
    });
  };
}
