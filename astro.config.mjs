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
import vue from "@astrojs/vue";
// https://astro.build/config
export default defineConfig({
  site: "https://dqkqd.github.io",

  integrations: [mdx(), vue()],

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
  },
});
