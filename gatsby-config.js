module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    siteName: "MakeNowJust-Labo/blog",
    github: "MakeNowJust-Labo/blog",
    twitter: "@make_now_just",
    copyright: '(C) 2021 TSUYUSATO "MakeNowJust" Kitsune',
    description: "MakeNowJust-Labo のブログです。",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts/`,
      },
    },
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-katex",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            }
          }
        ],
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
