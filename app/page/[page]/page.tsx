import type { Metadata } from "next";

import Pagination from "@/components/page/Pagination";
import PostPreview from "@/components/page/PostPreview";

import { BLOG_TITLE } from "@/src/meta";
import { type Page, getPage, getTotalPage } from "@/src/post";

type Props = {
  params: Promise<{
    page: string;
  }>;
};

export async function generateStaticParams() {
  const total = await getTotalPage();
  return Array.from({ length: total }, (_, index) => ({
    page: String(index + 1),
  })).slice(1);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `ページ${page} | ${BLOG_TITLE}`,
  };
}

function PagePostList({ page }: { page: Page }) {
  const { posts } = page;
  const nodes = posts.map((post) => {
    const { Excerpt } = post;
    return (
      <PostPreview
        slug={post.slug}
        title={post.title}
        created={post.created}
        updated={post.updated}
        readingTime={post.readingTime}
        tags={post.tags}
        key={post.slug}
      >
        <Excerpt />
      </PostPreview>
    );
  });
  return (
    <div>
      <h2 className="font-bold text-2xl text-stone-900">記事</h2>
      {nodes}
    </div>
  );
}

function PagePagination({ page }: { page: Page }) {
  const { prev, next } = page;
  const nextPage = next !== null ? (next === 0 ? "/" : `/page/${next + 1}`) : null;
  const prevPage = prev !== null ? `/page/${prev + 1}` : null;
  return (
    <div className="px-4 py-5">
      <Pagination next={nextPage} prev={prevPage} />
    </div>
  );
}

export default async function List({ params }: Props) {
  const { page: pageNum } = await params;
  const page = await getPage(Number.parseInt(pageNum) - 1);
  return (
    <div>
      <PagePostList page={page} />
      <PagePagination page={page} />
    </div>
  );
}
