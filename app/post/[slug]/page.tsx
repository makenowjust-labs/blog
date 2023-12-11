import MdxWrapper from "@/components/MdxWrapper";
import { BLOG_BASE_URL, BLOG_TITLE } from "@/src/meta";
import { getAllSlugs, getPost } from "@/src/post";
import { Metadata } from "next";
import Link from "next/link";

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
  const { Content, title, created, updated, tags } = await getPost(slug);

  const tagNodes = tags.map((tag) => (
    <Link className="badge badge-neutral mr-1" href={`/tag/${tag}/1`} key={tag}>
      {tag}
    </Link>
  ));
  const time = created === updated ? created : `${created} (更新: ${updated})`;

  return (
    <div className="border-b-2 pb-5">
      <h1 className="pb-2 pl-4 text-2xl font-bold text-stone-900">{title}</h1>
      <div className="pl-4 text-right text-sm text-stone-800">{time}</div>
      <div className="pb-4 pl-4">{tagNodes}</div>
      <MdxWrapper>
        <Content />
      </MdxWrapper>
    </div>
  );
}
