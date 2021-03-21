import { graphql, useStaticQuery } from "gatsby";

export type SiteMetadata = {
  siteName: string;
  github: string;
  copyright: string;
};

type SiteMetadataQuery = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

export const useSiteMedatada = (): SiteMetadata => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          siteName
          github
          copyright
        }
      }
    }
  `);
  return data.site.siteMetadata;
};
