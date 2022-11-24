import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export type Props = {
  title: string;
  repo: string;
  twitter: string;
};

export default function Navbar({ title, repo, twitter }: Props) {
  return (
    <header className="navbar sticky top-0 left-0 z-20 bg-white opacity-90">
      <div className="navbar-start">
        <Link passHref={true} href="/">
          <a className="btn-ghost btn normal-case text-stone-900">{title}</a>
        </Link>
      </div>
      <div className="navbar-end">
        <a
          href={`https://github.com/${repo}`}
          className="btn-ghost btn-circle btn text-2xl"
        >
          <FaGithub />
        </a>
        <a
          href={`https://twitter.com/${twitter}`}
          className="btn-ghost btn-circle btn text-2xl"
        >
          <FaTwitter />
        </a>
      </div>
    </header>
  );
}
