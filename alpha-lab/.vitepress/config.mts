import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config } from "./../../default_config.mts";
import { theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: "Documentation", link: "https://docs.pupil-labs.com/" },
    { text: "Feedback", link: "https://feedback.pupil-labs.com/" },
  ],

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
      ],
    },
  ],
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/alpha-lab/",
  title: "Alpha Lab",
  description: "Documentation of the Neon eye tracker and it's ecosystem.",
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
      ],
    },
  },
};

export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
});
