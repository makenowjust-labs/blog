import Link from "next/link";

import MdxWrapper from "../post/MdxWrapper";
import TagBadge from "../post/TagBadge";

export type Props = React.PropsWithChildren<{
  slug: string;
  title: string;
  created: string;
  updated: string;
  readingTime: number;
  tags: string[];
}>;

export default function PostPreview({ title, slug, created, updated, readingTime, tags, children }: Props) {
  const tagNodes = tags.map((tag) => <TagBadge tag={tag} key={tag} />);
  const time = created === updated ? created : `${created} (更新: ${updated})`;

  return (
    <div className="border-b-2 px-2 py-5">
      <h2 className="pb-2 font-bold text-2xl text-stone-900">
        <Link passHref={true} href={`/post/${slug}`} className="hover:cursor-pointer hover:underline">
          {title}
        </Link>
      </h2>
      <div className="text-right font-impact text-sm text-stone-800">
        {time} / 読むのにかかる時間: 約{readingTime.toFixed(1)}分
      </div>
      <div className="flex flex-wrap gap-2 pb-4">{tagNodes}</div>
      <MdxWrapper>{children}</MdxWrapper>
      <div className="pb-5 text-center">
        <Link passHref={true} href={`/post/${slug}`} className="btn btn-ghost btn-block normal-case">
          この記事を読む
        </Link>
      </div>
    </div>
  );
}
