import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config, theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  nav: [
    {
      text: "Hardware",
      link: "/hardware/technical-overview/",
      activeMatch: "/hardware/",
    },
    {
      text: "Data Collection",
      link: "/data-collection/",
      activeMatch: "/data-collection/",
    },
    {
      text: "Pupil Cloud",
      link: "/pupil-cloud/",
      activeMatch: "/pupil-cloud/",
    },
    {
      text: "Real-Time API",
      link: "/real-time-api/",
      activeMatch: "/real-time-api/",
    },
  ],

  sidebar: {
    "/hardware/": [
      {
        text: "Pupil Invisible",
        items: [
          { text: "Technical Overview", link: "/hardware/technical-overview/" },
          { text: "Exchange Lenses", link: "/hardware/exchange-lenses/" },
          {
            text: "Cleaning & Disinfecting",
            link: "/hardware/clean-and-disinfect/",
          },
          { text: "Head-Strap", link: "/hardware/attach-the-head-strap/" },
        ],
      },
      {
        text: "Companion Device",
        items: [
          { text: "Compatible Devices", link: "/hardware/compatible-devices/" },
          { text: "Using a USB Hub", link: "/hardware/using-a-usb-hub/" },
        ],
      },
    ],
    "/data-collection/": [
      { text: "Overview", link: "/data-collection/" },
      {
        text: "Tutorials",
        items: [
          {
            text: "Your first Recording",
            link: "/data-collection/first-recording/",
          },
          {
            text: "Ecosystem Overview",
            link: "/data-collection/ecosystem-overview/",
          },
        ],
      },
      {
        text: "Recordings",
        items: [
          { text: "Overview", link: "/data-collection/recordings/" },
          { text: "Data Streams", link: "/data-collection/data-streams/" },
          { text: "Data Format", link: "/data-collection/data-format/" },
        ],
      },
      {
        text: "Additional Data",
        items: [
          { text: "Events", link: "/data-collection/events/" },
          { text: "Wearers", link: "/data-collection/wearers/" },
          { text: "Templates", link: "/data-collection/templates/" },
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
          // { text: 'PsychoPy', link: '/data-collection/psychopy/' },
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
            text: "Offset Correction",
            link: "/data-collection/offset-correction/",
          },
        ],
      },
      {
        text: "Publications & Citation",
        link: "/data-collection/publications-and-citation/",
      },
      { text: "Troubleshooting", link: "/data-collection/troubleshooting/" },
    ],
    "/pupil-cloud/": [
      { text: "Overview", link: "/pupil-cloud/" },
      {
        text: "General",
        items: [
          { text: "Projects", link: "/pupil-cloud/projects/" },
          { text: "Workspaces", link: "/pupil-cloud/workspaces/" },
          { text: "Playback & Timeline", link: "/pupil-cloud/playback-timeline/" },
          { text: "Offset Correction", link: "/pupil-cloud/offset-correction/" },
          { text: "Events", link: "/pupil-cloud/events" },
          { text: "Cloud Plans", link: "/pupil-cloud/plans/" },
        ],
      },
      {
        text: "Enrichments",
        items: [
          { text: "Overview", link: "/pupil-cloud/enrichments/" },
          {
            text: "Auto Image Mapper",
            link: "/pupil-cloud/enrichments/auto-image-mapper/",
          },
          {
            text: "Reference Image Mapper",
            link: "/pupil-cloud/enrichments/reference-image-mapper/",
          },
          {
            text: "Marker Mapper",
            link: "/pupil-cloud/enrichments/marker-mapper/",
          },
          {
            text: "Mapping Correction",
            link: "/pupil-cloud/enrichments/mapping-correction/",
          },
          {
            text: "Face Mapper",
            link: "/pupil-cloud/enrichments/face-mapper/",
          },
          {
            text: "Manual Mapper",
            link: "/pupil-cloud/enrichments/manual-mapper/",
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
          { text: "Scanpath", link: "/pupil-cloud/visualizations/scanpath/" },
          {
            text: "Video Renderer",
            link: "/pupil-cloud/visualizations/video-renderer/",
          },
        ],
      },
    ],
    "/real-time-api/": [
      {
        items: [{ text: "Overview", link: "/real-time-api/" }],
      },
      { text: "Legacy API", link: "/real-time-api/legacy-api/" },
    ],
  },

  editLink: {
    pattern: 'https://github.dev/pupil-labs/pupil-docs/tree/master/invisible/:path',
    text: 'Edit this page on GitHub'
  }
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/invisible/",
  title: "Invisible",
  titleTemplate: "Invisible - :title - Pupil Labs Docs",
  description:
    "Documentation of the Pupil Invisible eye tracker and ecosystem.",
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
