import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

import Pagefind from "./Pagefind";

export type Props = {
  title: string;
  repo: string;
  twitter: string;
};

export default function Navbar({ title, repo, twitter }: Props) {
  return (
    <header className="navbar sticky left-0 top-0 z-20 bg-white opacity-90">
      <div className="navbar-start">
        <Link
          passHref={true}
          href="/"
          className="btn btn-ghost font-impact normal-case text-stone-900"
        >
          {title}
        </Link>
      </div>
      <div className="navbar-end">
        <a
          href={`https://github.com/${repo}`}
          className="btn btn-circle btn-ghost text-2xl"
        >
          <FaGithub />
        </a>
        <a
          href={`https://twitter.com/${twitter}`}
          className="btn btn-circle btn-ghost text-2xl"
        >
          <FaTwitter />
        </a>
        <Pagefind />
      </div>
    </header>
  );
}
