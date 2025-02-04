import Pagination from "@/components/page/Pagination";
import PostPreview from "@/components/page/PostPreview";
import MdxWrapper from "@/components/post/MdxWrapper";

import { type Page, getPage } from "@/src/post";

import HomeAbstractContent from "@/app/abstract.mdx";

function HomeAbstract() {
  return (
    <div className="px-2 py-5">
      <MdxWrapper>
        <HomeAbstractContent />
      </MdxWrapper>
    </div>
  );
}

function HomePostList({ page }: { page: Page }) {
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

function HomePagination({ page }: { page: Page }) {
  const { prev } = page;
  const prevPage = prev !== null ? `/page/${prev + 1}` : null;

  return (
    <div className="px-2 py-5">
      <Pagination next={null} prev={prevPage} />
    </div>
  );
}

export default async function Home() {
  const page = await getPage(0);

  return (
    <div>
      <HomeAbstract />
      <HomePostList page={page} />
      <HomePagination page={page} />
    </div>
  );
}
