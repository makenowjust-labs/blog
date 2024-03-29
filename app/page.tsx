import MdxWrapper from "@/components/MdxWrapper";
import Pagination from "@/components/Pagination";
import PostPreview from "@/components/PostPreview";

import { Page, getPage } from "@/src/post";

function HomeAbstract() {
  return (
    <div className="py-5 px-2">
      <MdxWrapper>
        <p>
          <a href="https://github.com/makenowjust">@makenowjust</a>{" "}
          の技術ブログです。
        </p>
        <p>
          オートマトン理論や形式言語などの情報科学的なことや、JavaScript
          (フロントエンド) や Scala などの技術について書きます。
        </p>
        <p>記事の正確さについては保証しません。間違っていたらごめんなさい。</p>
        <p>
          リポジトリ:{" "}
          <a href="https://github.com/makenowjust-labs/blog">
            https://github.com/makenowjust-labs/blog
          </a>
        </p>
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
