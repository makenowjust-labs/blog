import Head from "next/head";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const BLOG_BASE_URL = "https://makenowjust-labs.github.io/blog/";
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
  ogImage?: string;
}>;

export default function Layout({
  title,
  description,
  ogImage,
  children,
}: Props) {
  const page = title ? `${title} | ${BLOG_TITLE}` : BLOG_TITLE;
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content={description ?? BLOG_DESCRIPTION} />
        <meta property="og:title" content={page} />
        <meta property="og:site_name" content={BLOG_TITLE} />
        {ogImage && (
          <meta property="og:image" content={`${BLOG_BASE_URL}/${ogImage}`} />
        )}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={`@${BLOG_TWITTER}`} />
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
