import { Box, Heading, VStack, Wrap, WrapItem } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import * as React from "react";
import dayjs from "dayjs";

import { Layout } from "../../components/Layout";
import { OGP } from "../../components/OGP";
import { MarkdownRenderer } from "../../components/MarkdownRenderer";
import { useSiteMetadata } from "../../hooks/useSiteMetadata";
import { buildOGImageURL } from "../../utils/buildOGImageURL";

export const PostPage = (props: any) => {
  const {
    html,
    frontmatter: { title, created, updated, description },
  } = props.data.markdownRemark;
  const { siteName } = useSiteMetadata();
  return (
    <Layout>
      <OGP
        title={`${title} | ${siteName}`}
        description={description}
        image={buildOGImageURL({
          title,
          info: `${dayjs(created).format("YYYY-MM-DD")} | ${siteName}`,
        })}
      />
      <VStack width={"100%"}>
        <Box>
          <Heading>{title}</Heading>
          <Wrap spacing="1.5rem" justify="center">
            <WrapItem>作成日: {dayjs(created).format("YYYY-MM-DD")}</WrapItem>
            <WrapItem>更新日: {dayjs(updated).format("YYYY-MM-DD")}</WrapItem>
          </Wrap>
        </Box>
        <MarkdownRenderer html={html} />
      </VStack>
    </Layout>
  );
};

export const query = graphql`
  query($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        created
        updated
        description
      }
    }
  }
`;

export default PostPage;
