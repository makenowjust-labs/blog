import type { NextPage } from "next";
import Link from "next/link";

import { list } from "../lib/post";
import { render } from "../lib/markdown";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const posts = (await list()).map((post) => ({
    title: post.title,
    slug: post.slug,
    created: post.created,
    excerpt: render(post.excerpt),
  }));
  return {
    props: {
      posts,
    },
  };
}

type Props = {
  posts: Post[];
};

type Post = {
  title: string;
  slug: string;
  created: string;
  excerpt: string;
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <HomeAbstract />
      <HomePostList posts={posts} />
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

function HomePostList({ posts }: Props) {
  const nodes = posts.map((post, key) => <HomePost {...post} key={key} />);
  return (
    <>
      <h2 className="text-2xl font-bold text-stone-900">記事</h2>
      {nodes}
    </>
  );
}

function HomePost({ title, slug, created, excerpt }: Post) {
  return (
    <div className="border-b-2 py-5 pr-4">
      <h2 className="pb-5 pl-4 text-2xl font-bold text-stone-900">
        <Link
          passHref={true}
          href={`/post/${slug}`}
          className="hover:cursor-pointer hover:underline"
        >
          {title}
        </Link>
      </h2>
      <div
        className="prose prose-stone max-w-full pb-5 pl-8"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className="pb-5 pl-8 text-center">
        <Link
          passHref={true}
          href={`/post/${slug}`}
          className="btn btn-ghost btn-block normal-case"
        >
          この記事を読む
        </Link>
      </div>
      <div className="pl-4 text-right text-sm text-stone-800">{created}</div>
    </div>
  );
}

export default Home;
