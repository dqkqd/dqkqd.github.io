// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://dqkqd.github.io",

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      wrap: false,
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
      ],
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            style: "text-decoration: none; color: inherit;",
          },
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["anchor-icon"], ariaHidden: "true" },
            children: [{ type: "text", value: " #" }],
          },
        },
      ],
    ],
  },
});
