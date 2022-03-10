import Head from "next/head";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const BLOG_TITLE = "makenowjust-labs/blog";
const BLOG_DESCRIPTION = "MakeNowJust Laboratory Tech Blog";
const BLOG_AUTHOR = 'TSUYUSATO "MakeNowJust" Kitsune';
const BLOG_YEAR = "2021-2022";
const BLOG_REPO = "makenowjust-labs/blog";
const BLOG_GITHUB = "makenowjust";
const BLOG_TWITTER = "make_now_just";

export type Props = React.PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export default function Layout({ title, description, children }: Props) {
  const page = title ? `${title} | ${BLOG_TITLE}` : BLOG_TITLE;
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content={description ?? BLOG_DESCRIPTION} />
      </Head>
      <Navbar title={BLOG_TITLE} repo={BLOG_REPO} twitter={BLOG_TWITTER} />
      <Hero title={BLOG_TITLE} description={BLOG_DESCRIPTION} />
      <main className="p-2 mx-auto max-w-3xl min-h-screen lg:px-0">
        {children}
      </main>
      <Footer
        author={BLOG_AUTHOR}
        year={BLOG_YEAR}
        github={BLOG_GITHUB}
        twitter={BLOG_TWITTER}
      />
    </>
  );
}
