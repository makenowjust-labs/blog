import type { NextPage, GetStaticPropsContext } from "next";
import Layout from "../../components/Layout";
import { render } from "../../lib/markdown";
import { load, list } from "../../lib/post";

type Query = {
  slug: string;
};

export async function getStaticPaths() {
  const posts = (await list()).map((post) => ({
    slug: post.slug,
  }));
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<Query>) {
  const slug = params!.slug;
  const post = await load(slug);
  return {
    props: {
      title: post.title,
      created: post.created,
      description: post.description,
      content: render(post.content),
    },
  };
}

export type Props = {
  title: string;
  created: string;
  description: string;
  content: string;
};

const Post: NextPage<Props> = ({ title, created, description, content }) => {
  return (
    <Layout title={title} description={description}>
      <div className="pb-5 border-b-2">
        <h1 className="pb-5 pl-4 text-2xl font-bold text-stone-900">{title}</h1>
        <div
          className="pb-5 pl-8 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose prose-stone prose-h4:text-md"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="pl-4 text-sm text-right text-stone-800">{created}</div>
      </div>
    </Layout>
  );
};

export default Post;
