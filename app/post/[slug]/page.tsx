import { Metadata } from "next";

import MdxWrapper from "@/components/post/MdxWrapper";
import TagBadge from "@/components/post/TagBadge";

import { BLOG_BASE_URL, BLOG_TITLE } from "@/src/meta";
import { getAllSlugs, getPost } from "@/src/post";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPost(slug);

  return {
    title: `${title} | ${BLOG_TITLE}`,
    description,
    openGraph: {
      images: [`${BLOG_BASE_URL}/post/${slug}.png`],
    },
  };
}

export default async function Post({ params: { slug } }: Props) {
  const { Content, title, created, updated, readingTime, tags } = await getPost(slug);

  const tagNodes = tags.map((tag) => <TagBadge tag={tag} key={tag} />);
  const time = created === updated ? created : `${created} (更新: ${updated})`;

  return (
    <div className="border-b-2 px-2 pb-5">
      <h1 className="pb-2 text-2xl font-bold text-stone-900">{title}</h1>
      <div className="text-right font-impact text-sm text-stone-800">
        {time} / 読むのにかかる時間: 約{readingTime.toFixed(1)}分
      </div>
      <div className="flex flex-wrap gap-2 pb-4">{tagNodes}</div>
      <MdxWrapper>
        <Content />
      </MdxWrapper>
    </div>
  );
}
