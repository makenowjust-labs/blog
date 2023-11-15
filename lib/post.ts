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
  category: string;
  excerpt: string;
};

export type Page = {
  posts: Post[];
  next: number | null;
  prev: number | null;
};

export type Pagination = {
  total: number;
};

export type Category = {
  category: string;
  pagination: Pagination;
};

const postsDir = join(process.cwd(), "posts");

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
    category: data.category,
    excerpt: excerpt ?? "",
    content,
  };
};

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

export const computePagination = async (): Promise<Pagination> => {
  const posts = await loadAll();
  return {
    total: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
};

export const loadPage = async (page: number): Promise<Page> => {
  const posts = await loadAll();
  const start = page * POSTS_PER_PAGE;
  const end = Math.min(posts.length, (page + 1) * POSTS_PER_PAGE);
  return {
    posts: posts.slice(start, end),
    next: page !== 0 ? page - 1 : null,
    prev: end !== posts.length ? page + 1 : null,
  };
};

export const computeCategories = async (): Promise<Category[]> => {
  const posts = await loadAll();
  const categoryObject: Record<string, Post[]> = {};
  for (const post of posts) {
    categoryObject[post.category] ??= [];
    categoryObject[post.category].push(post);
  }
  return Object.values(categoryObject)
    .map((posts) => {
      const category = posts[0].category;
      return {
        category,
        pagination: {
          total: Math.ceil(posts.length / POSTS_PER_PAGE),
        },
      };
    })
    .sort((a, b) => (a.category < b.category ? -1 : 1));
};

export const loadCategory = async (
  category: string,
  page: number,
): Promise<Page> => {
  const allPosts = await loadAll();
  const posts = allPosts.filter((post) => post.category === category);
  const start = page * POSTS_PER_PAGE;
  const end = Math.min(posts.length, (page + 1) * POSTS_PER_PAGE);
  return {
    posts: posts.slice(start, end),
    next: page !== 0 ? page - 1 : null,
    prev: end !== posts.length ? page + 1 : null,
  };
};
