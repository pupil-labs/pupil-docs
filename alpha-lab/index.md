---
# https://vitepress.dev/reference/default-theme-home-page
layout: AlphaPageLayout
sidebar: false
title: Home

hero:
  title: "Alpha Lab"
  tagline:
    [
      "Pupil Labs is made up of people who are curious by nature. We are researchers, designers, toolmakers, and professional tinkerers. We enjoy building quick prototypes and demos to explore our curiosities. We built Alpha  Lab so that we can have a centralized place to collect the results of our explorations and to share it with the world.",
      "Alpha Lab is not a place for official product documentation. Everything you find here should be considered a work in progress, and may even be a bit rough around the edges. That is the nature of exploration!",
      "We encourage you to read through the results and go further - play around, build from the ideas here, hack away!",
    ]

cards:
  - title: Define Areas of Interest and Gaze Metrics
    details: Define areas of interest and compute gaze metrics, such as dwell time and time to first fixation, with data downloaded from Pupil Cloud's Reference Image Mapper.
    link:
      {
        text: View,
        href: "/alpha-lab/gaze-metrics-in-aois/#define-aois-and-calculate-gaze-metrics",
      }
    image: "/alpha-lab/aoi-demo.webp"
  - title: Map Gaze Onto Dynamic Screen Content
    details: Map and visualise gaze onto a screen with dynamic content, e.g. a video, web browsing, or other, using Pupil Cloud's Reference Image Mapper and screen recording software.
    link:
      {
        text: View,
        href: "/alpha-lab/map-your-gaze-to-a-2d-screen/#map-and-visualise-gaze-onto-a-display-content-using-the-reference-image-mapper",
      }
    image: "/alpha-lab/map-gaze-screen.webp"
  - title: Map Gaze Onto Body Parts
    details: Map gaze behaviour on body parts that appear in the scene video of Neon or Pupil Invisible eye tracking footage.
    link:
      {
        text: View,
        href: "/alpha-lab/dense-pose/#map-gaze-onto-body-parts-using-densepose",
      }
    image: "/alpha-lab/map-gaze-body.webp"
  - title: Map Gaze Throughout an Entire Room
    details: Use Pupil Cloud's Reference Image Mapper to Map gaze onto multiple areas of an entire room as participants freely navigate around it.
    link:
      {
        text: View,
        href: "/alpha-lab/multiple-rim/#map-and-visualize-gaze-on-multiple-reference-images-taken-from-the-same-environment",
      }
    image: "/alpha-lab/multiple-ref-mapper-enrich.webp"
  - title: Generate Scanpath Visualisations
    details: Generate both static and dynamic scanpath visualisations using exported data from Pupil Cloud's Reference Image Mapper.
    link:
      {
        text: View,
        href: "/alpha-lab/scanpath-rim/#generate-static-and-dynamic-scanpaths-with-reference-image-mapper",
      }
    image: "/alpha-lab/gen-scanpath-rim.webp"
  - title: Uncover Gaze Behaviour on Phones
    details: Capture and analyze users' viewing behaviour when focusing on small icons and features of mobile applications using Neon eye tracking alongside existing Cloud and Alpha Lab tools.
    link:
      {
        text: View,
        href: "/alpha-lab/phone-neon/#uncover-gaze-behaviour-on-phone-screens-with-neon",
      }
    image: "/alpha-lab/gaze-behavior-phone-neon.webp"
  - title: Map Gaze Onto a 3D Model of an Environment
    details: Map gaze onto a 3D model of an environment and visualise gaze patterns as 3D heatmaps using Pupil Cloud's Reference Image Mapper and Nerfstudio.
    link:
      {
        text: View,
        href: "/alpha-lab/nerfs/#create-3d-models-of-your-environment-using-reference-image-mapper-and-nerfstudio",
      }
    image: "/alpha-lab/map-gaze-3d-nerf.webp"
  - title: Build Gaze-Contingent Assistive Applications
    details: Build your very own gaze-contingent assistive applications (such as a gaze-controlled input device) using Neon eye tracking and our real-time screen gaze package.
    link:
      {
        text: View,
        href: "/alpha-lab/gaze-contingency-assistive/#a-practical-guide-to-implementing-gaze-contingency-for-assistive-technology",
      }
    image: "/alpha-lab/build-gaze-assistive-neon.webp"
  - title: Detect Eye Blinks With Neon
    details: Apply Pupil Labs blink detection algorithm to Neon recordings programmatically, offline or in real-time using Pupil Labs real-time Python API.
    link:
      {
        text: View,
        href: "/alpha-lab/blink-detection/#detecting-eye-blinks-using-pupil-labs-blink-detection-pipeline",
      }
    image: "/alpha-lab/blink.webp"
  - title: Build an AI Vision Assistant
    details: Experiment with assistive scene understanding applications using GPT-4V (an extension of GPT4 that can interpret images) and Pupil Labs eye tracking.
    link:
      {
        text: View,
        href: "/alpha-lab/gpt4-eyes/",
      }
    image: "/alpha-lab/gpt4-eyes.webp"
---
