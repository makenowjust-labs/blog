import { glob } from "zx";

const POSTS_PER_PAGE = 5;

export type Post = {
  slug: string;
  title: string;
  description: string;
  created: string;
  updated: string;
  excerpt: string;
  tags: string[];
  Content: () => JSX.Element;
  Excerpt: () => JSX.Element;
};

export type Page = {
  posts: Post[];
  prev: number | null;
  next: number | null;
};

let _allPostSlugs: string[] | null = null;
export const getAllSlugs = async (): Promise<string[]> => {
  if (_allPostSlugs) {
    return _allPostSlugs;
  }

  const files = await glob("posts/*/index.mdx");
  _allPostSlugs = files
    // @ts-expect-error
    .map((file) => file.replace(/^.*posts\/|\/index.mdx$/g, ""))
    // @ts-expect-error
    .sort((a, b) => (a >= b ? -1 : 1));
  // @ts-expect-error
  return _allPostSlugs;
};

export const getPost = async (slug: string): Promise<Post> => {
  const mod = await import(`@/posts/${slug}/index.mdx`);
  return {
    slug,
    title: mod.frontmatter.title,
    description: mod.frontmatter.description,
    created: mod.frontmatter.created,
    updated: mod.frontmatter.updated,
    tags: mod.frontmatter.tags,
    excerpt: mod.excerpt ?? "",
    Content: mod.default,
    Excerpt: mod.Excerpt ?? (() => null),
  };
};

export const getTotalPage = async (): Promise<number> => {
  const slugs = await getAllSlugs();
  return Math.ceil(slugs.length / POSTS_PER_PAGE);
};

export const getPage = async (page: number): Promise<Page> => {
  const slugs = await getAllSlugs();
  const start = page * POSTS_PER_PAGE;
  const end = Math.min(slugs.length, (page + 1) * POSTS_PER_PAGE);
  const posts = await Promise.all(slugs.slice(start, end).map(getPost));
  return {
    posts,
    next: page !== 0 ? page - 1 : null,
    prev: end !== slugs.length ? page + 1 : null,
  };
};

let _tags: Record<string, string[]> | null = null;
const getTags = async (): Promise<Record<string, string[]>> => {
  if (_tags) {
    return _tags;
  }

  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map(getPost));
  const tags: Record<string, string[]> = {};
  for (const post of posts) {
    for (const tag of post.tags) {
      tags[tag] ??= [];
      tags[tag].push(post.slug);
    }
  }

  _tags = tags;
  return _tags;
};

export const getTagNames = async (): Promise<string[]> => {
  const tags = await getTags();
  return Object.keys(tags).sort((a, b) => (a >= b ? 1 : -1));
};

export const getTagTotalPage = async (tag: string): Promise<number> => {
  const tags = await getTags();
  const slugs = tags[tag];
  return Math.ceil(slugs.length / POSTS_PER_PAGE);
};

export const getTagTotalPost = async (tag: string): Promise<number> => {
  const tags = await getTags();
  const slugs = tags[tag];
  return slugs.length;
};

export const getTagPage = async (tag: string, page: number): Promise<Page> => {
  const tags = await getTags();
  const slugs = tags[tag];
  const start = page * POSTS_PER_PAGE;
  const end = Math.min(slugs.length, (page + 1) * POSTS_PER_PAGE);
  const posts = await Promise.all(slugs.slice(start, end).map(getPost));
  return {
    posts,
    next: page !== 0 ? page - 1 : null,
    prev: end !== posts.length ? page + 1 : null,
  };
};
