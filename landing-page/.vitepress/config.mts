import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

const url = `https://docs-staging.pupil-labs.com/`;

import { config as default_config } from "./../../default_config.mts";
import { theme_config as default_theme_config } from "./../../default_config.mts";

const theme_config_additions = {
  nav: [
    { text: "Neon", link: url + "neon/", target: "_self" },
    { text: "Invisible", link: url + "invisible/", target: "_self" },
    { text: "Core", link: url + "core/", target: "_self" },
    { text: "Alpha Lab", link: url + "alpha-lab/", target: "_self" },
  ],
  socialLinks: [
    { icon: "discord", link: "https://pupil-labs.com/chat" },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><title>AlphaLab</title><path d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"/></svg>'
      },
      link: 'https://docs-staging.pupil-labs.com/',
    },
  ],
  search: {
    provider: false,
  },
};

const theme_config = { ...default_theme_config, ...theme_config_additions };

const config_additions = {
  title: "Pupil Labs Documentation",
  description: "Documentation for all Pupil Labs products.",
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "./../../components/header/CustomNavBar.vue",
              import.meta.url
            )
          ),
        },
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "./../../components/CustomDocFooter.vue",
              import.meta.url
            )
          ),
        },
        {
          find: "@components",
          replacement: fileURLToPath(
            new URL("./../../components", import.meta.url)
          ),
        },
      ],
    },
  },
};

export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
});
