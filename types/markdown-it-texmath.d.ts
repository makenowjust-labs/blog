declare module "markdown-it-texmath" {
  import MarkdownIt from "markdown-it";
  import katex from "katex";

  export type Options = {
    engine: typeof katex;
  };
  const texmath: MarkdownIt.PluginWithOptions<Options>;
  export default texmath;
}
