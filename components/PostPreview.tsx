import Link from "next/link";
import MdxWrapper from "./MdxWrapper";

export type Props = React.PropsWithChildren<{
  slug: string;
  title: string;
  created: string;
  updated: string;
  tags: string[];
}>;

export default function PostPreview({
  title,
  slug,
  created,
  updated,
  tags,
  children,
}: Props) {
  const tagNodes = tags.map((tag) => (
    <Link className="badge badge-neutral mr-1" href={`/tag/${tag}/1`} key={tag}>
      {tag}
    </Link>
  ));
  const time = created === updated ? created : `${created} (更新: ${updated})`;

  return (
    <div className="border-b-2 py-5 px-2">
      <h2 className="pb-2 text-2xl font-bold text-stone-900">
        <Link
          passHref={true}
          href={`/post/${slug}`}
          className="hover:cursor-pointer hover:underline"
        >
          {title}
        </Link>
      </h2>
      <div className="text-right text-sm text-stone-800 font-impact">
        {time}
      </div>
      <div className="pb-4">{tagNodes}</div>
      <MdxWrapper>{children}</MdxWrapper>
      <div className="pb-5 text-center">
        <Link
          passHref={true}
          href={`/post/${slug}`}
          className="btn btn-ghost btn-block normal-case"
        >
          この記事を読む
        </Link>
      </div>
    </div>
  );
}
