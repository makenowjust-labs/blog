import { FaGithubAlt, FaTwitter } from "react-icons/fa";

import TagBadge from "@/components/post/TagBadge";

export type Props = {
  year: string;
  author: string;
  github: string;
  twitter: string;
  tags: string[];
};

export default async function Footer({ year, author, github, twitter, tags }: Props) {
  const tagNodes = tags.map((tag) => <TagBadge tag={tag} key={tag} />);

  return (
    <footer className="mx-auto max-w-3xl px-2 py-5 font-impact lg:px-0">
      <div>
        <h2 className="font-bold text-lg">タグ一覧</h2>
        <div className="flex flex-wrap gap-2">{tagNodes}</div>
      </div>
      <div className="flex justify-center pb-5">
        <a href={`https://github.com/${github}`} className="btn btn-ghost text-lg">
          <FaGithubAlt />
        </a>
        <a href={`https://twitter.com/${twitter}`} className="btn btn-ghost text-lg">
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
