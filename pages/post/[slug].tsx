import type { NextPage, GetStaticPropsContext } from 'next'
import Layout from '../../components/Layout';
import { render } from '../../lib/markdown';
import { load, list } from '../../lib/post';

type Query = {
  slug: string;
};

export async function getStaticPaths() {
  const posts = (await list())
    .map(post => ({
      slug: post.slug,
    }));
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false
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
    }
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
      <div className="border-b-2 pb-5">
        <h1 className="text-2xl pl-4 text-stone-900 font-bold pb-5">{title}</h1>
        <div className="prose prose-stone pl-8 pb-5" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="text-sm text-stone-800 text-right pl-4">{created}</div>
      </div>
    </Layout>
  )
};

export default Post;
