import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export type Props = {
  title: string;
  repo: string;
  twitter: string;
};

export default function Navbar({ title, repo, twitter }: Props) {
  return (
    <header className="sticky top-0 left-0 z-20 bg-white opacity-90 navbar">
      <div className="navbar-start">
        <Link passHref={true} href="/">
          <a className="text-stone-900 normal-case btn btn-ghost">{title}</a>
        </Link>
      </div>
      <div className="navbar-end">
        <a
          href={`https://github.com/${repo}`}
          className="text-2xl btn btn-ghost btn-circle"
        >
          <FaGithub />
        </a>
        <a
          href={`https://twitter.com/${twitter}`}
          className="text-2xl btn btn-ghost btn-circle"
        >
          <FaTwitter />
        </a>
      </div>
    </header>
  );
}
