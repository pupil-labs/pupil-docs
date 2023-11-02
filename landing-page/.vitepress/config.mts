import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "./favicon.png" }]],
  title: "Pupil Labs Documentation",
  description: "Documentation for all Pupil Labs products.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Neon", link: "/neon/" },
      { text: "Invisible", link: "/invisible/" },
      { text: "Core", link: "/core/" },
      { text: "Alpha Lab", link: "/alpha-lab/" },
    ],

    sidebar: {},

    socialLinks: [
      { icon: "discord", link: "TODO" },
      { icon: "youtube", link: "TODO" },
      { icon: "twitter", link: "TODO" },
    ],
    outline: [2, 3],
  },
  appearance: true,
  cleanUrls: true,
});
