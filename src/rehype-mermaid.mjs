import { valueToEstree } from "estree-util-value-to-estree";
import { visit, SKIP } from "unist-util-visit";

export default function rehypeMermaid() {
  return (tree) => {
    let hasMermaid = false;

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
          codeNode.properties.className[0] === "language-mermaid"
        )
      ) {
        return;
      }

      hasMermaid = true;
      const source = textNode.value;

      const newTree = {
        type: "mdxJsxFlowElement",
        name: "MermaidRenderer",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "source",
            value: {
              type: "mdxJsxAttributeValueExpression",
              value: "`source`",
              data: {
                estree: {
                  type: "Program",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: valueToEstree(source),
                    },
                  ],
                  sourceType: "module",
                  comments: [],
                },
              },
            },
          },
        ],
        children: [],
      };

      parent.children[index] = newTree;

      return SKIP;
    });

    if (hasMermaid) {
      tree.children.push({
        type: "mdxjsEsm",
        value:
          'import MermaidRenderer from "@/components/mermaid/MermaidRenderer"',
        data: {
          estree: {
            type: "Program",
            body: [
              {
                type: "ImportDeclaration",
                specifiers: [
                  {
                    type: "ImportDefaultSpecifier",
                    local: {
                      type: "Identifier",
                      name: "MermaidRenderer",
                    },
                  },
                ],
                source: {
                  type: "Literal",
                  value: "@/components/mermaid/MermaidRenderer",
                  raw: '"@/components/mermaid/MermaidRenderer"',
                },
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      });
    }
  };
}
