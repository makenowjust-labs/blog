import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const configs = [
  {
    ignores: [".next", "out"],
  },
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...importPlugin.configs["recommended"].rules,
      "import/order": [
        "error",
        {
          distinctGroup: true,

          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "index",
            "sibling",
            "object",
            "type",
          ],

          "newlines-between": "always-and-inside-groups",

          pathGroups: [
            {
              pattern: "@/components/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/src/**",
              group: "internal",
              position: "before",
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
  ...tailwindPlugin.configs["flat/recommended"],
];

export default configs;
