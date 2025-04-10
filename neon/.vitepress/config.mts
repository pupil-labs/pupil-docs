import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { config as default_config, theme_config as default_theme_config } from "./../../default_config.mts";

let theme_config_additions = {
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    {
      text: "Hardware",
      link: "/hardware/module-technical-overview/",
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
      text: "Neon Player",
      link: "/neon-player/",
      activeMatch: "/neon-player/",
    },
    {
      text: "Real-Time API",
      link: "/real-time-api/tutorials/",
      activeMatch: "/real-time-api/",
    },
    { text: "Neon XR", link: "/neon-xr/", activeMatch: "/neon-xr/" },
  ],

  sidebar: {
    "/hardware/": [
      {
        text: "Neon Module",
        items: [
          {
            text: "Technical Overview",
            link: "/hardware/module-technical-overview/",
          },
          {
            text: "Cleaning & Disinfecting",
            link: "/hardware/clean-and-disinfect/",
          },
        ],
      },
      {
        text: "Frames",
        items: [
          { text: "Swapping Frames", link: "/hardware/swapping-frames/" },
          { text: "Make Your Own", link: "/hardware/make-your-own-frame/" },
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
        text: "Neon Companion App",
        items: [
          {
            text: "Offset Correction",
            link: "/data-collection/offset-correction/",
          },
          {
            text: "Measuring the IED",
            link: "/data-collection/measuring-ied/",
          },
          {
            text: "Gaze Mode",
            link: "/data-collection/gaze-mode/",
          },
          {
            text: "Scene Camera Exposure",
            link: "/data-collection/scene-camera-exposure/",
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
            text: "Calibrating the IMU",
            link: "/data-collection/calibrating-the-imu/",
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
          { text: "Offset Correction", link: "/pupil-cloud/offset-correction/" },
          { text: "Add-ons", link: "/pupil-cloud/add-ons/" },
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
          {
            text: "Manual Mapper",
            link: "/pupil-cloud/enrichments/manual-mapper/",
          },
          {
            text: "Mapping Correction",
            link: "/pupil-cloud/enrichments/mapping-correction/",
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
      { text: "Troubleshooting", link: "/pupil-cloud/troubleshooting/" },
    ],
    "/neon-player/": [
      {
        text: "Overview",
        link: "/neon-player/",
      },
      {
        text: "Plugins",
        items: [
          {
            text: "Visualization Plugins",
            link: "/neon-player/visualization-plugins/",
          },
          {
            text: "Fixation Detector",
            link: "/neon-player/fixation-detector/",
          },
          {
            text: "Blink Detector",
            link: "/neon-player/blink-detector/",
          },
          {
            text: "Surface Tracker",
            link: "/neon-player/surface-tracker/",
          },
          {
            text: "Head Pose Tracker",
            link: "/neon-player/head-pose-tracker/",
          },
          {
            text: "IMU Timeline",
            link: "/neon-player/imu-timeline/",
          },
          {
            text: "Eye State Timeline",
            link: "/neon-player/eye-state-timeline/",
          },
          {
            text: "Gaze Offset Correction",
            link: "/neon-player/gaze-offset-correction/"
          },
          {
            text: "Annotation Player",
            link: "/neon-player/annotation-player/"
          },
          {
            text: "Raw Data Exporter",
            link: "/neon-player/raw-data-exporter/",
          },
          {
            text: "World Video Exporter",
            link: "/neon-player/world-video-exporter/",
          },
        ],
      },
      {
        text: "Plugin API",
        link: "/neon-player/plugin-api/",
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
    "/neon-xr/": [
      { text: "Overview", link: "/neon-xr/" },
      { text: "MRTK3 Template Project", link: "/neon-xr/MRTK3-template-project/" },
      { text: "Neon XR Core Package", link: "/neon-xr/neon-xr-core-package/" },
      { text: "Build Your Own Mount", link: "/neon-xr/build-your-own-mount/" },
    ],
  },

  editLink: {
    pattern: 'https://github.dev/pupil-labs/pupil-docs/tree/master/neon/:path',
    text: 'Edit this page on GitHub'
  }
};

let theme_config = { ...default_theme_config, ...theme_config_additions };

let config_additions = {
  base: "/neon/",
  title: "Neon",
  titleTemplate: "Neon - :title - Pupil Labs Docs",
  description: "Documentation of Neon eye tracker and ecosystem.",
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
