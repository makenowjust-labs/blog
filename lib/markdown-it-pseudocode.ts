import MarkdownIt from "markdown-it";
import { renderToString } from "pseudocode";

/** The fake type for highlighted string. */
type Highlighted = string & { highlighted: true };

/** Returns a highlighted string for `markdown-it`.
 *
 * `markdown-it` wraps results of `options.highlight` in `<pre>` and `<code>`
 * tags only if it does not start with `<pre...`. This utility provides a way
 * to escape wrapping a highlighted result in `<pre>`.
 */
const highlighted = (s: string): Highlighted => {
  return {
    toString() {
      return s;
    },
    // This is a trick to cheat `markdown-it`.
    // See https://github.com/markdown-it/markdown-it/blob/2b6cac25823af011ff3bc7628bc9b06e483c5a08/lib/renderer.js#L58.
    // This dummy `indexOf` is to pass the above `if` condition.
    indexOf() {
      return 0;
    },
  } as unknown as Highlighted;
};

/** The `markdown-it` plugin for providing `pseudocode` fence block. */
export default (md: MarkdownIt) => {
  let captionCount = 0;
  const oldHighlight = md.options.highlight;
  md.options.highlight = (code, lang, attrs) => {
    if (lang === "pseudocode") {
      const s = renderToString(code, {
        captionCount,
      });
      captionCount += 1;
      return highlighted(`<div class="not-prose">${s}</div>`);
    } else {
      return oldHighlight ? oldHighlight(code, lang, attrs) : "";
    }
  };
};
