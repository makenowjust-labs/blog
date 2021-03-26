import { graphql, useStaticQuery } from "gatsby";

export type SiteMetadata = {
  siteName: string;
  github: string;
  twitter: string;
  copyright: string;
  description: string;
};

type SiteMetadataQuery = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          siteName
          github
          twitter
          copyright
          description
        }
      }
    }
  `);
  return data.site.siteMetadata;
};
