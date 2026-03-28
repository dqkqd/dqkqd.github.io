/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html/html",
    "stylelint-config-recommended-vue",
    "stylelint-config-tailwindcss",
  ],
  ignoreFiles: ["**/dist/**"],
};
