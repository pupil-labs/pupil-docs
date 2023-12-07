import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config, theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
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
      text: "Real-Time Applications",
      items: [
        {
          text: "Gaze-Contingent Assistive Applications",
          link: "/gaze-contingency-assistive/",
        },
        {
          text: "AI Vision Assistant",
          link: "/gpt4-eyes/",
        }
      ],
    },
    {
      text: "Other",
      items: [
        { text: "Undistort Video and Gaze Data", link: "/undistort/" },
        { text: "Use Neon with Pupil Capture", link: "/neon-with-capture/" },
      ],
    },
  ],

  editLink: {
    pattern: 'https://github.dev/pupil-labs/pupil-docs/tree/master/alpha-lab/:path',
    text: 'Edit this page on GitHub'
  }
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
