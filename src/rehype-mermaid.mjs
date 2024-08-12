import crypto from "crypto";
import { mkdirSync, existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { visit, SKIP } from "unist-util-visit";
import { run } from "@mermaid-js/mermaid-cli";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, "..");
const NEXT_DIR = path.join(ROOT_DIR, ".next");
const CACHE_DIR = path.join(NEXT_DIR, "cache/mermaid");

mkdirSync(CACHE_DIR, { recursive: true });

export default function rehypeMermaid() {
  return async (tree) => {
    const processData = [];

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

      const source = textNode.value;

      const hash = crypto.createHash("md5").update(source).digest("hex");
      const input = path.join(CACHE_DIR, `${hash}.mmd`);
      const output = path.join(CACHE_DIR, `${hash}.svg`);

      processData.push({ source, hash, input, output, parent, index });

      return SKIP;
    });

    if (processData.length > 0) {
      tree.children.push({
        type: "mdxjsEsm",
        value: 'import __NextImage from "next/image";',
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
                      name: "__NextImage",
                    },
                  },
                ],
                source: {
                  type: "Literal",
                  value: "next/image",
                  raw: '"next/image"',
                },
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      });
    }

    for (const { source, hash, input, output, parent, index } of processData) {
      if (!existsSync(output)) {
        await fs.writeFile(input, source);
        await run(input, output, { puppeteerConfig: { headless: "new" } });
      }

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "div",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "className",
            value: "flex justify-center",
          },
        ],
        data: {
          _mdxExplicitJsx: true,
        },
        children: [
          {
            type: "mdxJsxFlowElement",
            name: "__NextImage",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "src",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: `__Mermaid${hash}`,
                  data: {
                    estree: {
                      type: "Program",
                      body: [
                        {
                          type: "ExpressionStatement",
                          expression: {
                            type: "Identifier",
                            name: `__Mermaid${hash}`,
                          },
                        },
                      ],
                      sourceType: "module",
                      comments: [],
                    },
                  },
                },
              },
            ],
            data: {
              _mdxExplicitJsx: true,
            },
            children: [],
          },
        ],
      };

      const relativePath = path.relative(ROOT_DIR, output);
      tree.children.push({
        type: "mdxjsEsm",
        value: `import __Mermaid${hash} from \"@/${relativePath}\";`,
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
                      name: `__Mermaid${hash}`,
                    },
                  },
                ],
                source: {
                  type: "Literal",
                  value: `@/${relativePath}`,
                  raw: `\"@/${relativePath}\"`,
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
