import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config, theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  sidebar: [
    { text: "Welcome", link: "/" },
    {
      text: "Gaze Mapping",
      items: [
        { text: "Map Gaze Onto Dynamic Screen Content", link: "/map-your-gaze-to-a-2d-screen/" },
        { text: "Map Gaze Onto Body Parts", link: "/dense-pose/" },
        { text: "Map Gaze Onto a 3D Model of an Environment", link: "/nerfs/" },
        { text: "Map Gaze Into a User-Supplied 3D Model", link: "/tag-aligner/" },
        { text: "Map Gaze Onto Facial Landmarks", link: "/gaze-on-face/" },
        { text: "Map Gaze Onto Website AOIs", link: "/web-aois/" },
      ],
    },
    {
      text: "Reference Image Mapper",
      items: [
        { text: "Automate AOI Masking in Pupil Cloud", link: "/gaze-metrics-in-aois/" },
        { text: "Map Gaze Throughout an Entire Room", link: "/multiple-rim/" },
        { text: "Generate Scanpath Visualisations", link: "/scanpath-rim/" },
        { text: "Uncover Gaze Behaviour on Phones", link: "/phone-neon/" },
      ],
    },
    {
      text: "Real-Time Applications",
      items: [
        { text: "Detect Eye Blinks With Neon", link: "/blink-detection/" },
        {
          text: "Build Gaze-Contingent Assistive Applications",
          link: "/gaze-contingency-assistive/",
        },
        {
          text: "Build an AI Vision Assistant",
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
