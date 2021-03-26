import * as React from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "../hooks/useSiteMetadata";

export type OGPProps = {
  title: string;
  description: string;
  image: string;
};

export const OGP = ({ title, description, image }: OGPProps) => {
  const { twitter } = useSiteMetadata();
  return (
    <Helmet
      title={title}
      meta={[
        { name: "description", content: description },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:creator", content: twitter },
        { name: "og:title", content: title },
        { name: "og:description", content: description },
        { name: "og:image", content: image },
      ]}
    />
  );
};
