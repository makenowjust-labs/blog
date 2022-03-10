import { FaGithubAlt, FaTwitter } from "react-icons/fa";

export type Props = {
  year: string;
  author: string;
  github: string;
  twitter: string;
};

export default function Footer({ year, author, github, twitter }: Props) {
  return (
    <footer className="max-w-3xl mx-auto py-5 px-2 lg:px-0">
      <div className="flex justify-center pb-5">
        <a href={`https://github.com/${github}`} className="btn btn-ghost text-lg"><FaGithubAlt /></a>
        <a href={`https://twitter.com/${twitter}`} className="btn btn-ghost text-lg"><FaTwitter /></a>
      </div>
      <p className="text-center">
        <small className="text-sm text-stone-800">(C) {year} {author}</small>
      </p>
    </footer>
  );
}
