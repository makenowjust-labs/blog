import Link from "next/link";

export type Props = {
  title: string;
  slug: string;
  created: string;
  category: string;
  excerpt: string;
};

export default function PostPreview({
  title,
  slug,
  created,
  category,
  excerpt,
}: Props) {
  return (
    <div className="border-b-2 py-5 pr-4">
      <h2 className="pb-2 pl-4 text-2xl font-bold text-stone-900">
        <Link
          passHref={true}
          href={`/post/${slug}`}
          className="hover:cursor-pointer hover:underline"
        >
          {title}
        </Link>
      </h2>
      <div className="pb-4 pl-4">
        <Link className="badge badge-neutral" href={`/category/${category}/1`}>
          {category}
        </Link>
      </div>
      <div
        className="prose-h4:text-md prose prose-stone max-w-full pb-5 pl-8 prose-h1:border-b-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:px-0"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className="pb-5 pl-8 text-center">
        <Link
          passHref={true}
          href={`/post/${slug}`}
          className="btn btn-ghost btn-block normal-case"
        >
          この記事を読む
        </Link>
      </div>
      <div className="pl-4 text-right text-sm text-stone-800">{created}</div>
    </div>
  );
}
