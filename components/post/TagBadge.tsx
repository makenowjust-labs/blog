import Link from "next/link";

import { getTagTotalPost } from "@/src/post";

export type Props = {
  tag: string;
};

export default async function TagBadge({ tag }: Props) {
  const total = String(await getTagTotalPost(tag));

  return (
    <Link className="btn btn-xs btn-neutral" href={`/tag/${tag}/1`} key={tag}>
      {tag}
      <div className="badge">{total}</div>
    </Link>
  );
}
