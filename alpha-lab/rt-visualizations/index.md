---
title: "Real-time Visualizations"
description: "See what Neon is measuring by visualizing it’s data streams in real-time. Gain deeper insights & an intuitive feel for wearable eyetracking."
permalink: /alpha-lab/rt-visualizations/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/jag9EQB7840"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
tags: [Neon]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Real-time Visualizations

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="Yjos2JzpD-I"/>

::: tip
Raw data streams can feel abstract. What if you could bring them to life? This guide provides a Python framework to visualize everything from 3D eye models to dynamic data plots, turning numbers into intuitive visuals.
:::

## From Data Streams to Intuitive Insights

Neon provides a rich collection of real-time data, including eye poses, pupil diameter, blinks, and IMU readings. While this raw data is powerful, seeing it as a stream of numbers in a console can make it difficult to grasp what's truly happening. The "aha!" moment often comes when you can see the data, transforming abstract numbers into a clear, intuitive understanding of behaviour.

The benefits of live visualisation go beyond simple data inspection. For example, visualising 3D eye poses can be crucial for monitoring patients in clinical applications. In high-intensity scenarios, like professional sports or race car driving, plotting pupil size and eyelid aperture in real time can provide vital insights into a wearer's state.

## Understanding in the moment

While Pupil Cloud offers a powerful suite of tools for robust post-hoc analysis, many research and development scenarios require immediate, real-time feedback. Neon’s Real-time API is designed to make it easy to stream data to a computer. If one wants to visualize this data, though, it requires planning how to best represent it. This Alpha Lab guide addresses that need directly. It shows how to build these visualisations using Python and Matplotlib, an approach performant enough for live data yet simple enough for those new to coding. It provides the foundation not just for seeing your data more intuitively, but for building with it. It’s designed for when you want to monitor data live during an experiment, create interactive bio-feedback applications, or prototype a new gaze-contingent system!

## Steps to recreate

Simply load up your Python environment, connect Neon, and follow the steps in [the Github repository’s instructions](https://github.com/rennis250/realtime_viz_alpha_lab). You will then see how Neon’s data streams capture many of the relevant factors for robust eyetracking in the real world. Feel free to use the code as a base for your own investigations and share what you come up with in our [#show-and-tell](https://discord.com/channels/285728493612957698/1238043619999617125) channel on Discord.

### What You'll Learn to Build

This guide provides the foundation and hands-on examples for creating three distinct types of visualisations:

- **3D Eye Pose Visualisation:** Render a 3D model of each eyeball directly beneath the corresponding eye video. This visualisation includes the pose of the eye model, its optical axis vector, and a dynamic representation of the eyelid opening.
- **Dynamic 2D Data Plots:** Generate real-time, scrolling plots for any of Neon's numerical data streams, such as pupil size and blink events.
- **3D Module Orientation:** See a live 3D visualisation of the Neon module's orientation in space, rendered using the real-time IMU data stream.

These examples are more than just demos; they are well-commented, modular starting points for your own projects in driver monitoring, clinical testing, sports science, and beyond.

::: tip
Need assistance with the example visualizations? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::
