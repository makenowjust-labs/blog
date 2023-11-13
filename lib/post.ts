import { promises as fs } from "fs";
import { join, basename } from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

const POSTS_PER_PAGE = 5;

export type Post = {
  title: string;
  slug: string;
  created: string;
  updated: string;
  description: string;
  content: string;
  excerpt: string;
};

export type Pagination = {
  posts: Post[];
  next: number | null;
  prev: number | null;
};

export type PaginationInfo = {
  total: number;
};

const postsDir = join(process.cwd(), "posts");

export const loadAll = async (): Promise<Post[]> => {
  const files = await fs.readdir(postsDir);
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = basename(file, ".md");
      return await load(slug);
    }),
  );
  return posts.sort((a, b) => (a.created >= b.created ? -1 : 1));
};

export const computePaginationInfo = async (): Promise<PaginationInfo> => {
  const posts = await loadAll();
  return {
    total: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
};

export const loadPage = async (page: number): Promise<Pagination> => {
  const posts = await loadAll();
  const start = page * POSTS_PER_PAGE;
  const end = Math.min(posts.length, (page + 1) * POSTS_PER_PAGE);
  return {
    posts: posts.slice(start, end),
    next: page !== 0 ? page - 1 : null,
    prev: end !== posts.length ? page + 1 : null,
  };
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
