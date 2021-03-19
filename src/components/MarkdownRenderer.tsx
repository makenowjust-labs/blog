/** @jsx jsx */

import 'katex/dist/katex.min.css';

import { useColorMode, useTheme } from '@chakra-ui/system';
import { jsx, css } from '@emotion/react';

export type MarkdownRendererProps = {
  html: string;
};

export const MarkdownRenderer = ({ html }: MarkdownRendererProps) => {
  const {colorMode} = useColorMode();
  const theme = useTheme();
  const style = css`
    h1, h2, h3, h4, h5, h6, ul, ol, p, hr, table, blockquote {
      margin: ${theme.sizes[2]} ${theme.sizes[0]};
    }

    h1, h2, h3, h4 {
      font-weight: bold;
    }

    h1 {
      font-size: ${theme.sizes[8]};
      border-bottom: 1px solid ${theme.colors.gray[400]};
    }

    h2 {
      font-size: ${theme.sizes[6]};
    }

    h3 {
      font-size: ${theme.sizes[5]};
    }

    h4 {
      font-size: ${theme.sizes[4.5]};
    }

    ul, ol {
      padding-left: ${theme.sizes[4]}
    }

    p {
      line-height: 1.5em;
    }

    table {
      width: 100%;
    }

    thead tr {
      border-bottom: 1px solid ${theme.colors.gray[400]};
    }

    blockquote {
      border-left: ${theme.sizes[1]} solid ${theme.colors.red[colorMode === 'light' ? 600 : 200]};
      padding-left: ${theme.sizes[4]};
    }

    a {
      color: ${theme.colors.purple[colorMode === 'light' ? 600 : 200]}
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  return (
    <div css={style} dangerouslySetInnerHTML={{__html: html}} />
  )
};
