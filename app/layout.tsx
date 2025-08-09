import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";
import { GA_ID } from "@/src/gtag";
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
import "katex/dist/katex.min.css";
import "pseudocode/build/pseudocode.min.css";
import "@fontsource/biz-udpgothic/index.css";
import "@fontsource/biz-udpgothic/700.css";
import "@fontsource/share-tech-mono/index.css";
import "@fontsource/sometype-mono/index.css";

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

export type Props = React.PropsWithChildren<Record<string, unknown>>;

export default async function RootLayout({ children }: Props) {
  const tags = await getTagNames();

  return (
    <html lang="ja">
      <body>
        <Navbar title={BLOG_TITLE} repo={BLOG_REPO} twitter={BLOG_TWITTER} />
        <Hero title={BLOG_TITLE} description={BLOG_DESCRIPTION} />
        <main className="mx-auto min-h-screen max-w-3xl p-2 lg:px-0">{children}</main>
        <Footer author={BLOG_AUTHOR} year={BLOG_YEAR} github={BLOG_GITHUB} twitter={BLOG_TWITTER} tags={tags} />
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
