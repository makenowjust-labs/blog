import type { NextPage } from "next";

import { loadPage } from "../lib/post";
import { render } from "../lib/markdown";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import PostPreview, { Props as Post } from "../components/PostPreview";

export async function getStaticProps() {
  const { posts: originalPosts, prev } = await loadPage(0);
  const posts = originalPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    created: post.created,
    excerpt: render(post.excerpt),
  }));
  return {
    props: {
      posts,
      prev,
    },
  };
}

type Props = {
  posts: Post[];
} & PaginationProps;

type PaginationProps = {
  prev: number | null;
};

const Home: NextPage<Props> = ({ posts, prev }) => {
  return (
    <Layout>
      <HomeAbstract />
      <HomePostList posts={posts} />
      <HomePagination prev={prev} />
    </Layout>
  );
};

function HomeAbstract() {
  return (
    <div className="py-5 pr-4">
      <h2 className="pb-5 text-2xl font-bold text-stone-900">概要</h2>
      <div className="text-md prose prose-stone max-w-full pb-5 pl-8">
        <p>
          <a href="https://github.com/makenowjust">@makenowjust</a>{" "}
          の技術ブログです。
        </p>
        <p>
          オートマトン理論や形式言語などの情報科学的なことや、JavaScript
          (フロントエンド) や Scala などの技術について書きます。
        </p>
        <p>
          リポジトリ:{" "}
          <a href="https://github.com/makenowjust-labs/blog">
            https://github.com/makenowjust-labs/blog
          </a>
        </p>
      </div>
    </div>
  );
}

function HomePostList({ posts }: { posts: Post[] }) {
  const nodes = posts.map((post, key) => <PostPreview {...post} key={key} />);
  return (
    <>
      <h2 className="text-2xl font-bold text-stone-900">記事</h2>
      {nodes}
    </>
  );
}

function HomePagination({ prev }: PaginationProps) {
  const prevPage = prev !== null ? `/page/${prev + 1}` : null;
  return (
    <div className="px-4 py-5">
      <Pagination next={null} prev={prevPage} />
    </div>
  );
}

export default Home;
