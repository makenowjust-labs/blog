import * as path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { loadDefaultJapaneseParser } from "budoux";
import dayjs from "dayjs";
import fs from "fs-extra";
import { globby as glob } from "globby";
import satori from "satori";

import { BLOG_AUTHOR, BLOG_DESCRIPTION, BLOG_TITLE } from "../src/meta";
import { parseMarkdown } from "../src/parse-markdown.mjs";

const WIDTH = 1200;
const HEIGHT = 630;

const budoux = loadDefaultJapaneseParser();

const shareTechMono = await fs.readFile(
  "./node_modules/@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff",
);
const bizUdpGothic400 = await fs.readFile(
  "./node_modules/@fontsource/biz-udpgothic/files/biz-udpgothic-japanese-400-normal.woff",
);

const fonts = [
  {
    name: "Share Tech Mono",
    data: shareTechMono,
    weight: 400,
    style: "normal",
  },
  {
    name: "Biz UDPGothic",
    data: bizUdpGothic400,
    weight: 400,
    style: "normal",
  },
];

const background = await fs.readFile("./scripts/background.jpg");

const render = async (filename, children) => {
  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(data:image/jpeg;base64,${background.toString("base64")})`,
        backgroundSize: "1200px 775px",
        fontFamily: '"Share Tech Mono", "Biz UDPGothic"',
        fontWeight: 400,
      }}
    >
      <div
        style={{
          marginTop: "5vh",
          height: "90vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: "5vh",
          width: "100%",
          position: "absolute",
          left: "0px",
          top: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#DFDFDF",
        }}
      >
        <div style={{ fontSize: "24px", marginRight: "2.5vw" }}>{BLOG_AUTHOR}</div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts,
    },
  );

  const resvg = new Resvg(svg, {
    background: "#fff",
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });
  const data = resvg.render();

  await fs.ensureDir(path.dirname(filename));
  await fs.writeFile(filename, data.asPng());
};

await render("public/cover.png", [
  <div style={{ fontSize: "48px" }} key="blogTitle">
    {BLOG_TITLE}
  </div>,
  <div style={{ fontSize: "24px" }} key="blogDescription">
    {BLOG_DESCRIPTION}
  </div>,
]);

const posts = await glob("posts/*/index.mdx");
for (const post of posts) {
  const value = await fs.readFile(post, "utf-8");
  const { matter } = parseMarkdown(value);
  const created = dayjs(matter.created).format("YYYY/MM/DD");
  const title = matter.title
    .split(/(?<= )/)
    .flatMap((part) => budoux.parse(part))
    .map((text, index) => {
      return (
        <span
          style={{
            display: "block",
            padding: "0",
            margin: "0",
            whiteSpace: "pre",
          }}
          // biome-ignore lint/suspicious/noArrayIndexKey: This element is static.
          key={index}
        >
          {text}
        </span>
      );
    });
  await render(`public/post/${post.replace(/^.*posts\/|\/index.mdx$/g, "")}.png`, [
    <div style={{ fontSize: "32px", width: "720px" }} key="created">
      {created}
    </div>,
    <div
      style={{
        fontSize: "56px",
        width: "720px",
        display: "flex",
        flexWrap: "wrap",
        textOverflow: "ellipsis",
        alignContent: "center",
        alignItems: "center",
      }}
      key="title"
    >
      {title}
    </div>,
    <div style={{ fontSize: "24px", width: "720px" }} key="blogTitle">
      {BLOG_TITLE}
    </div>,
  ]);
}
