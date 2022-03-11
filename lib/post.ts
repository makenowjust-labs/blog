import { promises as fs } from "fs";
import { join, basename } from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

export type Post = {
  title: string;
  slug: string;
  created: string;
  updated: string;
  description: string;
  content: string;
  excerpt: string;
};

const postsDir = join(process.cwd(), "posts");

export const list = async (): Promise<Post[]> => {
  const files = await fs.readdir(postsDir);
  const list = await Promise.all(
    files.map(async (file) => {
      const slug = basename(file, ".md");
      return await load(slug);
    })
  );
  return list.sort((a, b) => (a.created >= b.created ? -1 : 1));
};

export const load = async (slug: string): Promise<Post> => {
  const text = await fs.readFile(join(postsDir, `${slug}.md`), "utf-8");
  const { data, excerpt, content } = matter(text, {
    excerpt_separator: "\n<!-- read more -->\n",
  });
  return {
    title: data.title,
    slug,
    created: dayjs(data.created).format("YYYY-MM-DD"),
    updated: dayjs(data.updated).format("YYYY-MM-DD"),
    description: data.description,
    excerpt: excerpt ?? "",
    content,
  };
};
