import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import {
  config as default_config,
  theme_config as default_theme_config,
} from "./../../default_config.mts";

const theme_config_additions = {
  nav: [
    { text: "Neon", link: "/neon/", target: "_self" },
    { text: "Invisible", link: "/invisible/", target: "_self" },
    { text: "Core", link: "/core/", target: "_self" },
    { text: "Alpha Lab", link: "/alpha-lab/", target: "_self" },
  ],
  socialLinks: [
    { icon: "discord", link: "https://pupil-labs.com/chat" },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Z"/></svg>',
      },
      link: "/alpha-lab",
      target: "_self",
    },
  ],
  search: {
    provider: false,
  },
};

const theme_config = { ...default_theme_config, ...theme_config_additions };

const config_additions = {
  title: "Home",
  titleTemplate: ":title - Pupil Labs Docs",
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
            new URL("./../../components/CustomDocFooter.vue", import.meta.url)
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
