import type { NextPage, GetStaticPropsContext } from "next";
import Layout from "../../components/Layout";
import { render } from "../../lib/markdown";
import { computeCategories, load, loadAll } from "../../lib/post";
import Link from "next/link";

type Query = {
  slug: string;
};

export async function getStaticPaths() {
  const originalPosts = await loadAll();
  const posts = originalPosts.map((post) => ({
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
  const categories = await computeCategories();
  const slug = params!.slug;
  const post = await load(slug);
  return {
    props: {
      categories: categories.map((data) => data.category),
      slug,
      title: post.title,
      created: post.created,
      description: post.description,
      category: post.category,
      content: render(post.content),
    },
  };
}

export type Props = {
  categories: string[];
  slug: string;
  title: string;
  created: string;
  description: string;
  category: string;
  content: string;
};

const Post: NextPage<Props> = ({
  categories,
  slug,
  title,
  created,
  description,
  category,
  content,
}) => {
  return (
    <Layout
      title={title}
      description={description}
      ogUrl={`post/${slug}`}
      ogImage={`post/${slug}.png`}
      ogType="article"
      categories={categories}
    >
      <div className="border-b-2 pb-5">
        <h1 className="pb-2 pl-4 text-2xl font-bold text-stone-900">{title}</h1>
        <div className="pb-4 pl-4">
          <Link
            href={`/category/${category}/1`}
            className="badge badge-neutral"
          >
            {category}
          </Link>
        </div>
        <div
          className="prose-h4:text-md prose prose-stone max-w-full pb-5 pl-8 prose-h1:border-b-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:px-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="pl-4 text-right text-sm text-stone-800">{created}</div>
      </div>
    </Layout>
  );
};

export default Post;
