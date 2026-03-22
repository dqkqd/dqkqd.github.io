// Copy from: https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts

import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";
import { SITE_DEFAULT_TITLE, SITE_DEFAULT_DESCRIPTION } from "../lib";
import { getSortedBlogs } from "../lib/blog";

export async function GET(context: APIContext) {
  // Get the URL to prepend to relative site links. Based on `site` in `astro.config.mjs`.
  let baseUrl = context.site!.href;
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  // Load MDX renderer. Other renderers for UI frameworks (e.g. React, Vue, etc.) would need adding here if you were using those.
  const renderers = await loadRenderers([getMDXRenderer()]);

  // Create a new Astro container that we can render components with.
  // See https://docs.astro.build/en/reference/container-reference/
  const container = await AstroContainer.create({ renderers });

  // Load the content collection entries to add to our RSS feed.
  const blogs = await getSortedBlogs();

  // Loop over blog posts to create feed items for each, including full content.
  const feedItems: RSSFeedItem[] = [];
  for (const blog of blogs) {
    // Get the `<Content/>` component for the current post.
    const { Content } = await render(blog);
    // Use the Astro container to render the content to a string.
    const rawContent = await container.renderToString(Content);
    // Process and sanitize the raw content:
    // - Removes `<!DOCTYPE html>` preamble
    // - Makes link `href` and image `src` attributes absolute instead of relative
    // - Strips any `<script>` and `<style>` tags
    // Thanks @Princesseuh — https://github.com/Princesseuh/erika.florist/blob/1827288c14681490fa301400bfd815acb53463e9/src/middleware.ts
    const content = await transform(
      rawContent.replace(/^<!DOCTYPE html>/, ""),
      [
        async (node) => {
          await walk(node, (node) => {
            if (node.name === "a" && node.attributes.href?.startsWith("/")) {
              node.attributes.href = baseUrl + node.attributes.href;
            }
            if (node.name === "img" && node.attributes.src?.startsWith("/")) {
              node.attributes.src = baseUrl + node.attributes.src;
            }
          });
          return node;
        },
        sanitize({ dropElements: ["script", "style"] }),
      ],
    );
    feedItems.push({ ...blog.data, link: blog.href, content });
  }

  // Return our RSS feed XML response.
  return rss({
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    site: baseUrl,
    items: feedItems,
  });
}
