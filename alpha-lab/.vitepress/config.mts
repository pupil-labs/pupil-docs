import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config, theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  // https://vitepress.dev/reference/default-theme-config
  // nav: [{ text: "Feedback", link: "https://feedback.pupil-labs.com/" }],

  sidebar: [
    { text: "Welcome", link: "/" },
    {
      text: "Gaze Mapping",
      items: [
        { text: "Onto screen content", link: "/map-your-gaze-to-a-2d-screen/" },
        { text: "Onto body parts", link: "/dense-pose/" },
        { text: "Onto 3D models with NerfStudio", link: "/nerfs/" },
      ],
    },
    {
      text: "Reference Image Mapper",
      items: [
        { text: "AOIs and Gaze Metrics", link: "/gaze-metrics-in-aois/" },
        { text: "Mapping a whole Room", link: "/multiple-rim/" },
        { text: "Scanpaths on Reference Images", link: "/scanpath-rim/" },
        { text: "Gaze Behaviour on Phone Screens", link: "/phone-neon/" },
      ],
    },
    {
      text: "Other",
      items: [
        {
          text: "Gaze-Contingent Assistive Applications",
          link: "/gaze-contingency-assistive/",
        },
        { text: "Undistort Video and Gaze Data", link: "/undistort/" },
        { text: "Use Neon with Pupil Capture", link: "/neon-with-capture/" },
        { text: "Run Neon's blink detection pipeline offline or in real-time", link: "/blink-detection/" },
      ],
    },
  ],

  // socialLinks: [
  //   { icon: "discord", link: "https://pupil-labs.com/chat" },
  //   {
  //     icon: {
  //       svg: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><title>Home</title><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>',
  //     },
  //     link: "https://docs-staging.pupil-labs.com/",
  //   },
  // ],
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/alpha-lab/",
  title: "Alpha Lab",
  titleTemplate: "Alpha Lab - :title - Pupil Labs Docs",
  description:
    "Documentation for Pupil Labs prototypes and demos to explore our curiosities.",
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
