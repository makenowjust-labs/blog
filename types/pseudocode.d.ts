declare module "pseudocode" {
  export type Options = {
    indentSize?: number;
    commentDelimiter?: string;
    lineNumber?: boolean;
    lineNumberPunc?: string;
    noEnd?: boolean;
    captionCount?: number | undefined;
  };

  export function renderToString(input: string, options?: Options): string;
}
