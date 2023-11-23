import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config } from "./../../default_config.mts";
import { theme_config as default_theme_config } from "./../../default_config.mts";

const softwareOtherSideBar = [
  {
    text: "Software",
    items: [
      { text: "Pupil Capture", link: "/software/pupil-capture/" },
      { text: "Pupil Player", link: "/software/pupil-player/" },
      { text: "Pupil Service", link: "/software/pupil-service/" },
      { text: "Recording Format", link: "/software/recording-format/" },
    ],
  },
  {
    text: "Other",
    items: [
      { text: "Hardware", link: "/hardware/" },
      { text: "Terminology", link: "/terminology/" },
      { text: "Best Practices", link: "/best-practices/" },
      { text: "Academic Citation", link: "/academic-citation/" },
    ],
  },
];

let theme_config_additions = {
  nav: [
    {
      text: "Getting Started",
      link: "/getting-started/",
      activeMatch: "/getting-started/",
    },
    {
      text: "User Guide",
      link: "/software/pupil-capture/",
      activeMatch: "/software/",
    },
    { text: "DIY", link: "/diy/", activeMatch: "/diy/" },
    { text: "Developer", link: "/developer/", activeMatch: "/developer/" },
    { text: "VR/AR", link: "/vr-ar/", activeMatch: "/vr-ar/" },
  ],

  sidebar: {
    "/getting-started": [...softwareOtherSideBar],
    "/software": [...softwareOtherSideBar],
    "/hardware": [...softwareOtherSideBar],
    "/developer/": [
      { text: "Overview", link: "/developer/" },
      { text: "Network API", link: "/developer/network-api/" },
      { text: "Recording Format", link: "/developer/recording-format/" },
      { text: "Plugin API", link: "/developer/plugin-api/" },
      { text: "py3d Pupil Detection", link: "/developer/pye3d/" },
    ],
    "/vr-ar/": [
      { text: "Overview", link: "/vr-ar/" },
      { text: "HTC-Vice Add-On", link: "/vr-ar/vive/" },
      { text: "HoloLens Add-On", link: "/vr-ar/hololens/" },
      { text: "Oculus Rift DK2 Add-On", link: "/vr-ar/rift/" },
      { text: "Developer", link: "/vr-ar/developer/" },
    ],
  },

  socialLinks: [
    { icon: "discord", link: "https://pupil-labs.com/chat" },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H600q-17 0-28.5-11.5T560-160v-200q0-17-11.5-28.5T520-400h-80q-17 0-28.5 11.5T400-360v200q0 17-11.5 28.5T360-120H240q-33 0-56.5-23.5T160-200Z"/></svg>',
      },
      link: "https://docs.pupil-labs.com/",
      target: "_self",
    },
  ],
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/core/",
  title: "Core",
  titleTemplate: "Core - :title - Pupil Labs Docs",
  description: "Documentation of Pupil Core eye tracker and ecosystem.",
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
});
