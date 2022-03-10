import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export type Props = {
  title: string;
  repo: string;
  twitter: string;
};

export default function Navbar({ title, repo, twitter }: Props) {
  return (
    <header className="navbar sticky top-0 left-0 bg-white opacity-90 z-20">
      <div className="navbar-start">
        <Link href="/">
          <button className="btn btn-ghost normal-case text-stone-900">{title}</button>
        </Link>
      </div>
      <div className="navbar-end">
        <a href={`https://github.com/${repo}`} className="btn btn-ghost btn-circle text-2xl">
          <FaGithub />
        </a>
        <a href={`https://twitter.com/${twitter}`} className="btn btn-ghost btn-circle text-2xl">
          <FaTwitter />
        </a>
      </div>
    </header>
  );
}
