import { Metadata } from "next";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

import {
  BLOG_AUTHOR,
  BLOG_BASE_URL,
  BLOG_DESCRIPTION,
  BLOG_GITHUB,
  BLOG_REPO,
  BLOG_TITLE,
  BLOG_TWITTER,
  BLOG_YEAR,
} from "@/src/meta";
import { getTagNames } from "@/src/post";

import "./globals.css";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  metadataBase: new URL(BLOG_BASE_URL),
  openGraph: {
    siteName: BLOG_TITLE,
    images: [`${BLOG_BASE_URL}/cover.png`],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${BLOG_TWITTER}`,
    creator: `@${BLOG_TWITTER}`,
  },
};

export type Props = React.PropsWithChildren<{}>;

export default async function RootLayout({ children }: Props) {
  const tags = await getTagNames();

  return (
    <html lang="ja">
      <body>
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
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
          tags={tags}
        />
      </body>
    </html>
  );
}
