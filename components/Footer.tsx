import Link from "next/link";
import { FaGithubAlt, FaTwitter } from "react-icons/fa";

export type Props = {
  categories: string[];
  year: string;
  author: string;
  github: string;
  twitter: string;
};

export default function Footer({
  categories,
  year,
  author,
  github,
  twitter,
}: Props) {
  return (
    <footer className="mx-auto max-w-3xl px-2 py-5 lg:px-0">
      <div className="pl-4">
        <h2 className="text-lg font-bold">カテゴリ一覧</h2>
        <div>
          {categories.map((category) => (
            <Link
              href={`/category/${category}/1`}
              className="badge badge-neutral mr-2"
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
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
