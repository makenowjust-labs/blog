import type { NextPage, GetStaticPropsContext } from "next";

import { computePaginationInfo, loadPage } from "../../lib/post";
import { render } from "../../lib/markdown";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import PostPreview, { Props as Post } from "../../components/PostPreview";

type Query = {
  page: string;
};

export async function getStaticPaths() {
  const { total } = await computePaginationInfo();
  const pages = Array.from({ length: total }, (_, page) => page + 1).filter(
    (page) => page !== 1,
  );
  return {
    paths: pages.map((page) => ({
      params: { page: String(page) },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<Query>) {
  const page = Number.parseInt(params!.page, 10);
  const { posts: originalPosts, next, prev } = await loadPage(page - 1);
  const posts = originalPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    created: post.created,
    excerpt: render(post.excerpt),
  }));
  return {
    props: {
      posts,
      next,
      prev,
    },
  };
}

type Props = {
  posts: Post[];
} & PaginationProps;

type PaginationProps = {
  next: number | null;
  prev: number | null;
};

const Page: NextPage<Props> = ({ posts, next, prev }) => {
  return (
    <Layout>
      <PagePostList posts={posts} />
      <PagePagination next={next} prev={prev} />
    </Layout>
  );
};

function PagePostList({ posts }: { posts: Post[] }) {
  const nodes = posts.map((post, key) => <PostPreview {...post} key={key} />);
  return (
    <>
      <h2 className="text-2xl font-bold text-stone-900">記事</h2>
      {nodes}
    </>
  );
}

function PagePagination({ next, prev }: PaginationProps) {
  const nextPage =
    next !== null ? (next === 0 ? "/" : `/page/${next + 1}`) : null;
  const prevPage = prev !== null ? `/page/${prev + 1}` : null;
  return (
    <div className="px-4 py-5">
      <Pagination next={nextPage} prev={prevPage} />
    </div>
  );
}

export default Page;
