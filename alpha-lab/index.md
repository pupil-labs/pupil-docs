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
  - title: Define AOIs and Calculate Gaze Metrics
    details: Here we demonstrate how to make areas of interest using data downloaded from Pupil Cloud’s Reference Image Mapper.
    link:
      {
        text: View,
        href: "/alpha-lab/gaze-metrics-in-aois/#define-aois-and-calculate-gaze-metrics",
      }
    image: "/alpha-lab/aoi-demo.webp"
  - title: Map and visualise gaze onto a display content using the Reference Image Mapper
    details: Here we show you how you can use Pupil Cloud’s Reference Image Mapper to map gaze onto dynamic on-screen content - like a video.
    link:
      {
        text: View,
        href: "/alpha-lab/map-your-gaze-to-a-2d-screen/#map-and-visualise-gaze-onto-a-display-content-using-the-reference-image-mapper",
      }
    image: "/alpha-lab/map-gaze-screen.webp"
  - title: Map gaze onto body parts using DensePose
    details: Use detectron's densepose AI to segment and know at which part of a body a person is looking.
    link:
      {
        text: View,
        href: "/alpha-lab/dense-pose/#map-gaze-onto-body-parts-using-densepose",
      }
    image: "/alpha-lab/map-gaze-body.webp"
  - title: Map and visualize gaze on multiple reference images taken from the same environment
    details: We pushed the limits of markerless mapping with Pupil Cloud’s Reference Image Mapper - scanning an entire apartment.
    link:
      {
        text: View,
        href: "/alpha-lab/multiple-rim/#map-and-visualize-gaze-on-multiple-reference-images-taken-from-the-same-environment",
      }
    image: "/alpha-lab/multiple-ref-mapper-enrich.webp"
  - title: Generate static and dynamic scanpaths with Reference Image Mapper
    details: Discover how to generate static and dynamic scanpaths with Pupil Cloud's Reference Image Mapper.
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
  - title: Create 3D Models of your environment using Reference Image Mapper and nerfstudio
    details: Create 3D Models of your environment using the reference image mapper and NerfStudio
    link:
      {
        text: View,
        href: "/alpha-lab/nerfs/#create-3d-models-of-your-environment-using-reference-image-mapper-and-nerfstudio",
      }
    image: "/alpha-lab/map-gaze-3d-nerf.webp"
  - title: A practical guide to implementing gaze contingency for assistive technology
    details: Build gaze-contingent assistive applications with Neon!
    link:
      {
        text: View,
        href: "/alpha-lab/gaze-contingency-assistive/#a-practical-guide-to-implementing-gaze-contingency-for-assistive-technology",
      }
    image: "/alpha-lab/build-gaze-assistive-neon.webp"
---
