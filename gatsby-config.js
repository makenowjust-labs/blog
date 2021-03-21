module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    siteName: "MakeNowJust-Labo/blog",
    github: "MakeNowJust-Labo/blog",
    copyright: '(C) 2021 TSUYUSATO "MakeNowJust" Kitsune',
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
          {
            resolve: "gatsby-remark-katex",
          },
        ],
      },
    },
  ],
};
