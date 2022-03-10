import type { NextPage } from 'next'
import Link from 'next/link';

import { list } from "../lib/post";
import { render } from "../lib/markdown";
import Layout from '../components/Layout';

export async function getStaticProps() {
  const posts = (await list())
    .map(post => ({
      title: post.title,
      slug: post.slug,
      created: post.created,
      excerpt: render(post.excerpt),
    }));
  return {
    props: {
      posts,
    }
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
    <>
      <h2 className="text-2xl text-stone-900 font-bold pb-5">概要</h2>
      <div className="text-md pb-5 pl-8 prose prose-stone">
        <p>
          <a href="https://github.com/makenowjust">@makenowjust</a> の技術ブログです。
        </p>
        <p>
          オートマトン理論や形式言語などの情報科学的なことや、JavaScript (フロントエンド) や Scala などの技術について書きます。
        </p>
        <p>
          リポジトリ: <a href="https://github.com/makenowjust-labs/blog">https://github.com/makenowjust-labs/blog</a>
        </p>
      </div>
    </>
  );
}

function HomePostList({ posts }: Props) {
  const nodes = posts.map((post, key) => <HomePost {...post} key={key} />);
  return (
    <>
      <h2 className="text-2xl text-stone-900 font-bold">記事</h2>
      {nodes}
    </>
  );
}

function HomePost({ title, slug, created, excerpt }: Post) {
  return (
    <div className="py-5 border-b-2">
      <h2 className="text-2xl pl-4 text-stone-900 font-bold pb-5">
        <Link href={`post/${slug}`}><span className="hover:underline hover:cursor-pointer">{title}</span></Link>
      </h2>
      <div className="prose prose-stone pl-8 pb-5" dangerouslySetInnerHTML={{ __html: excerpt }} />
      <div className="pl-8 pb-5 text-center">
        <Link href={`post/${slug}`}>
          <button className="btn btn-ghost btn-block normal-case">この記事を読む</button>
        </Link>
      </div>
      <div className="text-sm text-stone-800 text-right pl-4">{created}</div>
    </div>
  );
}

export default Home
