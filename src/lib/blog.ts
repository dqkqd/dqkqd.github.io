import { getCollection, type CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog"> & { href: string };

export async function getSortedBlogs(): Promise<BlogEntry[]> {
  return (await getCollection("blog"))
    .sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf())
    .map((blog) => ({
      ...blog,
      href: `/blog/${blog.id}`,
    }));
}

export async function getStaticBlogs() {
  const blogs = await getSortedBlogs();
  return blogs.map((blog, index) => ({
    params: { id: blog.id },
    props: {
      blog,
      prevBlog: blogs[index + 1] ?? undefined,
      nextBlog: blogs[index - 1] ?? undefined,
    },
  }));
}
