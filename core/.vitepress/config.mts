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
    { text: "Getting Started", link: "/getting-started/" },
    { text: "User Guide", link: "/software/pupil-capture/" },
    { text: "DIY", link: "/diy/" },
    { text: "Developer", link: "/developer/" },
    { text: "VR/AR", link: "/vr-ar/" },
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
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/core/",
  title: "Pupil Core",
  description:
    "Documentation of the Pupil Core eye tracker and it's ecosystem.",
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
