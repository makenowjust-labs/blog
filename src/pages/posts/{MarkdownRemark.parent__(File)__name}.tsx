import { graphql } from 'gatsby';
import { Layout } from '../../components/Layout';
import * as React from 'react';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { Box, Heading, VStack, Text, HStack, Wrap, WrapItem } from '@chakra-ui/layout';
import dayjs from 'dayjs';

export const PostPage = (props: any) => {
  const {html, frontmatter: {title, created, updated}} = props.data.markdownRemark;
  return (
    <Layout>
      <VStack>
        <Box>
          <Heading>{title}</Heading>
          <Wrap spacing="1.5rem" justify="center">
            <WrapItem>作成日: {dayjs(created).format('YYYY-MM-DD')}</WrapItem>
            <WrapItem>更新日: {dayjs(updated).format('YYYY-MM-DD')}</WrapItem>
          </Wrap>
        </Box>
        <MarkdownRenderer html={html} />
      </VStack>
    </Layout>
  );
};

export const query = graphql`
  query($id: String) {
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        title
        created
        updated
      }
    }
  }
`;


export default PostPage;
