import Head from "next/head";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const BLOG_BASE_URL = "https://makenowjust-labs.github.io/blog";
const BLOG_TITLE = "makenowjust-labs/blog";
const BLOG_DESCRIPTION = "MakeNowJust Laboratory Tech Blog";
const BLOG_AUTHOR = 'Hiroya Fujinami (a.k.a. TSUYUSATO "MakeNowJust" Kitsune)';
const BLOG_YEAR = "2021-2023";
const BLOG_REPO = "makenowjust-labs/blog";
const BLOG_GITHUB = "makenowjust";
const BLOG_TWITTER = "make_now_just";

export type Props = React.PropsWithChildren<{
  title?: string;
  description?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: string;
}>;

export default function Layout({
  title,
  description,
  ogUrl,
  ogImage,
  ogType,
  children,
}: Props) {
  const page = title ? `${title} | ${BLOG_TITLE}` : BLOG_TITLE;
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content={description ?? BLOG_DESCRIPTION} />
        <meta property="og:title" content={page} />
        <meta property="og:url" content={`${BLOG_BASE_URL}/${ogUrl ?? ""}`} />
        <meta
          property="og:description"
          content={description ?? BLOG_DESCRIPTION}
        />
        <meta property="og:site_name" content={BLOG_TITLE} />
        <meta property="og:type" content={ogType ?? "blog"} />
        <meta
          property="og:image"
          content={`${BLOG_BASE_URL}/${ogImage ?? "cover.png"}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${BLOG_TWITTER}`} />
        <meta name="twitter:creator" content={`@${BLOG_TWITTER}`} />
      </Head>
      <Navbar title={BLOG_TITLE} repo={BLOG_REPO} twitter={BLOG_TWITTER} />
      <Hero title={BLOG_TITLE} description={BLOG_DESCRIPTION} />
      <main className="mx-auto min-h-screen max-w-3xl p-2 lg:px-0">
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
