import { defineConfig } from "vitepress";

const url = `https://docs-staging.pupil-labs.com/`;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "./favicon.png" }]],
  title: "Pupil Labs Documentation",
  description: "Documentation for all Pupil Labs products.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Neon", link: url + "neon/", target: "_self" },
      { text: "Invisible", link: url + "invisible/", target: "_self" },
      { text: "Core", link: url + "core/", target: "_self" },
      { text: "Alpha Lab", link: url + "alpha-lab/", target: "_self" },
    ],

    sidebar: {},

    socialLinks: [
      { icon: "discord", link: "https://pupil-labs.com/chat" },
      { icon: "youtube", link: "https://www.youtube.com/c/PupilLabs" },
      { icon: "twitter", link: "https://twitter.com/pupil_labs" },
    ],
    outline: [2, 3],
  },
  appearance: true,
  cleanUrls: true,
});
