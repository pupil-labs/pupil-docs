import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config } from "./../../default_config.mts";
import { theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: "Getting Started", link: "/getting-started/first-recording/" },
    { text: "General", link: "/general/module-technical-overview/" },
    { text: "Data Collection", link: "/data-collection/" },
    {
      text: "Analysis",
      items: [
        { text: "Pupil Cloud", link: "/pupil-cloud/" },
        { text: "Neon Player", link: "/neon-player/" },
      ],
    },
    { text: "Real-Time API", link: "/real-time-api/tutorials/" },
    { text: "Neon XR", link: "/neon-xr/" },
  ],

  sidebar: {
    "/getting-started/": [
      {
        text: "Getting Started",
        items: [
          {
            text: "Your first Recording",
            link: "/getting-started/first-recording/",
          },
          {
            text: "Understand the Ecosystem",
            link: "/getting-started/understand-the-ecosystem/",
          },
        ],
      },
    ],
    "/general/": [
      {
        text: "Neon Module",
        items: [
          {
            text: "Technical Overview",
            link: "/general/module-technical-overview/",
          },
          {
            text: "Cleaning & Disinfecting",
            link: "/general/clean-and-disinfect/",
          },
        ],
      },
      {
        text: "Frames",
        items: [
          { text: "Swapping Frames", link: "/general/swapping-frames/" },
          { text: "Make Your Own", link: "/general/make-your-own-frame/" },
        ],
      },
      {
        text: "Companion Device",
        items: [
          { text: "Compatible Devices", link: "/general/compatible-devices/" },
          { text: "Using a USB Hub", link: "/general/using-a-usb-hub/" },
        ],
      },
      {
        text: "Recordings",
        items: [
          { text: "Overview", link: "/general/recordings/" },
          { text: "Data Streams", link: "/general/data-streams/" },
          { text: "Data Format", link: "/general/data-format/" },
        ],
      },
      {
        text: "Additional Data",
        items: [
          { text: "Events", link: "/general/events/" },
          { text: "Wearers", link: "/general/wearers/" },
          { text: "Templates", link: "/general/templates/" },
        ],
      },
      { text: "Troubleshooting", link: "/general/troubleshooting/" },
    ],
    "/data-collection/": [
      {
        text: "Neon Compannion App",
        items: [
          {
            text: "Offset Correction",
            link: "/data-collection/offset-correction/",
          },
          {
            text: "Backlight Compensation",
            link: "/data-collection/measuring-the-IED/",
          },
        ],
      },
      {
        text: "Software & Integrations",
        items: [
          { text: "Monitor App", link: "/data-collection/monitor-app/" },
          {
            text: "Lab Streaming Layer",
            link: "/data-collection/lab-streaming-layer/",
          },
          { text: "PsychoPy", link: "/data-collection/psychopy/" },
        ],
      },
      {
        text: "How-To Guides",
        items: [
          {
            text: "Transfer Recordings via USB",
            link: "/data-collection/transfer-recordings-via-usb/",
          },
          {
            text: "Time Synchronization",
            link: "/data-collection/time-synchronization/",
          },
          {
            text: "Measuring the IED",
            link: "/data-collection/measuring-the-IED/",
          },
          {
            text: "Calibrating the IMU",
            link: "/data-collection/calibrating-the-imu/",
          },
        ],
      },
      { text: "Troubleshooting", link: "/data-collection/troubleshooting/" },
    ],
    "/pupil-cloud/": [
      {
        text: "Tutorials",
        items: [
          { text: "Analysis in Pupil Coud", link: "/pupil-cloud/tutorials/" },
        ],
      },
      {
        text: "General",
        items: [
          { text: "Projects", link: "/pupil-cloud/projects/" },
          { text: "Workspaces", link: "/pupil-cloud/workspaces/" },
        ],
      },
      {
        text: "Enrichments",
        items: [
          { text: "Overview", link: "/pupil-cloud/enrichments/" },
          {
            text: "Reference Image Mapper",
            link: "/pupil-cloud/enrichments/reference-image-mapper/",
          },
          {
            text: "Marker Mapper",
            link: "/pupil-cloud/enrichments/marker-mapper/",
          },
          {
            text: "Face Mapper",
            link: "/pupil-cloud/enrichments/face-mapper/",
          },
        ],
      },
      {
        text: "Visualizations",
        items: [
          { text: "Heatmap", link: "/pupil-cloud/visualizations/heatmap/" },
          {
            text: "Areas of Interest (AOIs)",
            link: "/pupil-cloud/visualizations/areas-of-interest/",
          },
          {
            text: "Video Renderer",
            link: "/pupil-cloud/visualizations/video-renderer/",
          },
        ],
      },
    ],
    "/real-time-api/": [
      {
        text: "Tutorials",
        items: [{ text: "Tutorial", link: "/real-time-api/tutorials/" }],
      },
      {
        text: "How-To Guides",
        items: [
          {
            text: "Track Your Experiment Progress Using Events",
            link: "/real-time-api/track-your-experiment-progress-using-events/",
          },
          {
            text: "Track Your Experiment in MATLAB",
            link: "/real-time-api/track-your-experiment-in-matlab/",
          },
        ],
      },
    ],
  },
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/neon/",
  title: "Neon",
  description: "Documentation of the Neon Eye Tracker and It’s Ecosystem.",
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
