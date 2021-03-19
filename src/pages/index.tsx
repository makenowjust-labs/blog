import * as React from "react"
import { Box, Heading, VStack, Wrap, WrapItem, Link, Button } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

import { Layout } from "../components/Layout";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { graphql } from "gatsby";
import dayjs from "dayjs";

type PostSummaryProps = {
  name: string;
  title: string;
  created: Date;
  updated: Date;
  html: string;
};

const PostSummary = ({ name, title, created, updated, html }: PostSummaryProps) => (
  <VStack key={name} borderBottomWidth={'1px'} borderBottomStyle={'solid'} borderBottomColor={'gray.400'}>
    <Box>
      <Heading><GatsbyLink to={`/posts/${name}`}><Link as="span">{title}</Link></GatsbyLink></Heading>
      <Wrap spacing="1.5rem" justify="center">
        <WrapItem>作成日: {dayjs(created).format('YYYY-MM-DD')}</WrapItem>
        <WrapItem>更新日: {dayjs(updated).format('YYYY-MM-DD')}</WrapItem>
      </Wrap>
    </Box>
    <Box px="8">
      <MarkdownRenderer html={html} />
    </Box>
    <Box py="4">
      <Button as={GatsbyLink} to={`/posts/${name}`}>続きを読む</Button>
    </Box>
  </VStack>
);

const IndexPage = (props: any) => {
  const posts = props.data.allMarkdownRemark.nodes.map((data: any) => (
    <PostSummary name={data.parent.name} title={data.frontmatter.title} created={data.frontmatter.created} updated={data.frontmatter.updated} html={data.excerpt} />
  ));
  return (
    <Layout>
      <Heading>記事一覧</Heading>
      <VStack>
        {posts}
      </VStack>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___created, order: DESC}) {
      nodes {
        parent {
          ... on File {
            name
          }
        }
        frontmatter {
          title
          created
          updated
        }
        excerpt(format: HTML, truncate: true, pruneLength: 400)
      }
    }
  }
`;

export default IndexPage
