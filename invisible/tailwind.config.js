/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.md",
    "./.vitepress/theme/**/*.{vue,js,ts}",
    "../components/**/*.vue",
  ],
  theme: {
    extend: {
      screens: {
        lg: "960px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5)/,
    },
    "^sm:grid-cols-",
    "m-auto",
  ],
};
