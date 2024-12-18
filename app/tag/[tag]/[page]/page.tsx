import { Metadata } from "next";

import Pagination from "@/components/page/Pagination";
import PostPreview from "@/components/page/PostPreview";

import { BLOG_TITLE } from "@/src/meta";
import {
  type Page,
  getTagNames,
  getTagPage,
  getTagTotalPage,
} from "@/src/post";

type Props = {
  params: Promise<{
    tag: string;
    page: string;
  }>;
};

export async function generateStaticParams() {
  const tagNames = await getTagNames();
  const totals = await Promise.all(tagNames.map(getTagTotalPage));

  return tagNames.flatMap((tag, index) => {
    const total = totals[index];
    return Array.from({ length: total }, (_, index) => ({
      // NOTE: Next.js encodes/decodes values in params incoinsistency.
      //       In `next dev`, encoding is needed, but in `next build`, it does not.
      //       It seems very ugly...
      tag:
        process.env.NODE_ENV === "production" ? tag : encodeURIComponent(tag),
      page: String(index + 1),
    }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: encodedTag, page } = await params;
  const tag = decodeURIComponent(encodedTag);
  return {
    title: `${tag} (ページ${page}) | ${BLOG_TITLE}`,
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
      <h2 className="text-2xl font-bold text-stone-900">記事</h2>
      {nodes}
    </div>
  );
}

function PagePagination({ page }: { page: Page }) {
  const { prev, next } = page;
  const nextPage =
    next !== null ? (next === 0 ? "/" : `/page/${next + 1}`) : null;
  const prevPage = prev !== null ? `/page/${prev + 1}` : null;
  return (
    <div className="px-4 py-5">
      <Pagination next={nextPage} prev={prevPage} />
    </div>
  );
}

export default async function Page({ params }: Props) {
  const { tag, page: pageNum } = await params;
  const page = await getTagPage(
    decodeURIComponent(tag),
    Number.parseInt(pageNum) - 1,
  );
  return (
    <div>
      <PagePostList page={page} />
      <PagePagination page={page} />
    </div>
  );
}
