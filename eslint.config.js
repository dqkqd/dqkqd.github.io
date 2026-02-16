import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";

export default defineConfig([
  { ignores: ["**/*.d.ts", "**/coverage/**", "**/dist/**"] },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  eslintPluginVue.configs["flat/recommended"],
  eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
]);
