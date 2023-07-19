#!/usr/bin/env zx

import dayjs from "dayjs";
import matter from "gray-matter";
import { Canvas, FontLibrary, loadImage } from "skia-canvas";

const BLOG_TITLE = "makenowjust-labs/blog";
const BLOG_DESCRIPTION = "MakeNowJust Laboratory Tech Blog";
const BLOG_AUTHOR = "@makenowjust";

// Load fonts from `@fontsource/noto-sans-jp` and `@fontsource/share-tech-mono`.
FontLibrary.use("Noto Sans JP", [
  "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-100-normal.woff",
  "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-300-normal.woff",
  "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-400-normal.woff",
  "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-500-normal.woff",
  "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff",
  "./node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-900-normal.woff",
]);

FontLibrary.use("Share Tech Mono", [
  "./node_modules/@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff",
]);

// Load background image.
const background = await loadImage("./scripts/background.jpg");

await fs.ensureDir("./out");
const canvas = new Canvas(1200, 630);
const ctx = canvas.getContext("2d");

// Draw background.
ctx.drawImage(background, 0, 0, 1200, 1280 * (1200 / 1920));
ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
ctx.fillRect(0, 40, 1200, 550);

// Draw blog name.
ctx.fillStyle = "#0A0A0A";
ctx.font = '46px "Share Tech Mono"';
ctx.fillText(BLOG_TITLE, (1200 - 630) / 2 + 50, 280);

// Draw description.
ctx.fillStyle = "#0A0A0A";
ctx.font = '24px "Share Tech Mono", "Noto Sans JP"';
let x = 0;
let y = 330;
for (const t of BLOG_DESCRIPTION.split(/(?<= )/)) {
  const m = ctx.measureText(t);
  if (x + m.width > 630 - 100) {
    x = 0;
    y += 60;
  }
  ctx.fillText(t, (1200 - 630) / 2 + 50 + x, y);
  x += m.width;
}

// Draw GitHub account.
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 540, 1200, 30);
ctx.fillStyle = "#DFDFDF";
ctx.font = '24px "Share Tech Mono"';
const m = ctx.measureText(BLOG_AUTHOR);
ctx.fillText(BLOG_AUTHOR, (1200 - 630) / 2 + 580 - m.width, 564);

canvas.saveAsSync(`./out/cover.png`);
