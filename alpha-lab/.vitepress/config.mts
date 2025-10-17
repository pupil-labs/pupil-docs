import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';

import { config as default_config, theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  sidebar: [
    { text: "Welcome", link: "/" },
    {
      text: "Building with AI",
      items: [
        { text: "Audio Event Detection", link: "/audio-event-annotations/" },
        { text: "Annotations with GPT", link: "/event-automation-gpt/" },
        { text: "AOI Masking", link: "/gaze-metrics-in-aois/" },
        {text: "AI Vision Assistant", link: "/gpt4-eyes/"},
        {text: "Dynamic AOI Tracking with SAM2", link: "/dynamic-aoi-sam2/",
        }
      ],
    },
    {
      text: "3D Spaces",
      items: [
        { text: "GPS with Neon", link: "/gps/" },
        { text: "IMU Transformations", link: "/imu-transformations/" },
        { text: "Map to a User 3D Model", link: "/tag-aligner/" },
        { text: "Map Gaze to Alternate Video", link: "/egocentric-video-mapper/"},
        { text: "Gaze with NeRFs", link: "/nerfs/" },
        { text: "Map Gaze in a Room", link: "/multiple-rim/" },
      ],
    },
    {
      text: "Screens & Interfaces",
      items: [
        { text: "Website AOIs", link: "/web-aois/" },
        { text: "Gaze on Phones", link: "/phone-neon/" },
        { text: "Map to Dynamic Screen Content", link: "/map-your-gaze-to-a-2d-screen/" },
      ],
    },
    {
      text: "Real Time & Interactive",
      items: [
        { text: "Gaze-Contingent Apps", link: "/gaze-contingency-assistive/"},
        { text: "Detect Eye Blinks", link: "/blink-detection/" },
        { text: "PERCLOS Calculation", link: "/perclos/" },
        { text: "Map Gaze Onto Anything", link: "/map-onto-anything/" },
      ],
    },
    {
      text: "Around People",
      items: [
        { text: "Map to Facial Landmarks", link: "/gaze-on-face/" },
        { text: "Map to Body Parts", link: "/dense-pose/" },
      ],
    },
    {
      text: "Other/Core ",
      items: [
        { text: "Scanpath Visualisations", link: "/scanpath-rim/"},
        { text: "Undistort Video and Gaze", link: "/undistort/" },
        { text: "Neon With Pupil Capture", link: "/neon-with-capture/" },
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
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
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
    plugins: [
      groupIconVitePlugin({
        customIcon:{
          'uv':'https://raw.githubusercontent.com/astral-sh/uv/refs/heads/main/docs/assets/logo-letter.svg',
          'vanilla': 'vscode-icons:file-type-python'
        },
      })
    ],
  },
};

export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
});
