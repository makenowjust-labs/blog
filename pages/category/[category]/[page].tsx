import type { NextPage, GetStaticPropsContext } from "next";

import { computeCategories, loadCategory } from "../../../lib/post";
import { render } from "../../../lib/markdown";
import Layout from "../../../components/Layout";
import Pagination from "../../../components/Pagination";
import PostPreview, { Props as Post } from "../../../components/PostPreview";

type Query = {
  category: string;
  page: string;
};

export async function getStaticPaths() {
  const categories = await computeCategories();
  return {
    paths: categories.flatMap(({ category, pagination: { total } }) => {
      return Array.from({ length: total }, (_, page) => ({
        params: {
          category,
          page: String(page + 1),
        },
      }));
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<Query>) {
  const categories = await computeCategories();
  const category = params!.category;
  const page = Number.parseInt(params!.page, 10);
  const {
    posts: originalPosts,
    next,
    prev,
  } = await loadCategory(category, page - 1);
  const posts = originalPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    created: post.created,
    category: post.category,
    excerpt: render(post.excerpt),
  }));
  return {
    props: {
      categories: categories.map((data) => data.category),
      category,
      posts,
      next,
      prev,
    },
  };
}

type Props = {
  categories: string[];
  category: string;
  posts: Post[];
} & CategoryProps &
  PaginationProps;

type CategoryProps = {
  category: string;
};

type PaginationProps = {
  next: number | null;
  prev: number | null;
};

const CategoryPage: NextPage<Props> = ({
  categories,
  category,
  posts,
  next,
  prev,
}) => {
  return (
    <Layout categories={categories}>
      <CategoryPagePostList category={category} posts={posts} />
      <CategoryPagePagination category={category} next={next} prev={prev} />
    </Layout>
  );
};

function CategoryPagePostList({
  category,
  posts,
}: { posts: Post[] } & CategoryProps) {
  const nodes = posts.map((post, key) => <PostPreview {...post} key={key} />);
  return (
    <>
      <h2 className="text-2xl font-bold text-stone-900">
        記事
        <span className="badge badge-neutral ml-2">{category}</span>
      </h2>
      {nodes}
    </>
  );
}

function CategoryPagePagination({
  category,
  next,
  prev,
}: CategoryProps & PaginationProps) {
  const nextPage =
    next !== null
      ? next === 0
        ? "/"
        : `/category/${category}/${next + 1}`
      : null;
  const prevPage = prev !== null ? `/category/${category}/${prev + 1}` : null;
  return (
    <div className="px-4 py-5">
      <Pagination next={nextPage} prev={prevPage} />
    </div>
  );
}

export default CategoryPage;
