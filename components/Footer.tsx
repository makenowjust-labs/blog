import Link from "next/link";
import { FaGithubAlt, FaTwitter } from "react-icons/fa";

export type Props = {
  year: string;
  author: string;
  github: string;
  twitter: string;
  tags: string[];
};

export default async function Footer({
  year,
  author,
  github,
  twitter,
  tags,
}: Props) {
  const tagNodes = tags.map((tag) => (
    <Link className="badge badge-neutral mr-1" href={`/tag/${tag}/1`} key={tag}>
      {tag}
    </Link>
  ));

  return (
    <footer className="mx-auto max-w-3xl px-2 py-5 lg:px-0 font-impact">
      <div>
        <h2 className="text-lg font-bold">タグ一覧</h2>
        <div>{tagNodes}</div>
      </div>
      <div className="flex justify-center pb-5">
        <a
          href={`https://github.com/${github}`}
          className="btn btn-ghost text-lg"
        >
          <FaGithubAlt />
        </a>
        <a
          href={`https://twitter.com/${twitter}`}
          className="btn btn-ghost text-lg"
        >
          <FaTwitter />
        </a>
      </div>
      <p className="text-center">
        <small className="text-sm text-stone-800">
          (C) {year} {author}
        </small>
      </p>
    </footer>
  );
}
