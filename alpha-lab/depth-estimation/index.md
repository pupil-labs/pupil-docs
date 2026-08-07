---
title: "Depth Estimation with Neon Data"
description: ""
permalink: /alpha-lab/depth-estimation/
layout: AlphaArticleLayout
sidebar: false
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/UjvK3wFQJHM"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
tags: [Neon, Offline Processing, AI / Deep Learning]
---

<Youtube src="UjvK3wFQJHM"/>

:::tip
Where does a batter look to judge the speed of a pitch? How close does a car need to be before a driver focuses on its brake lights? Does a surgeon's focal distance shift just before an incision? Eye tracking usually lives in a flat, 2D world, but human behavior doesn't. By pulling depth data straight out of standard video, you can finally map visual attention in true 3D space.
:::

## The Challenge of Measuring Distance

Understanding where a subject is looking is only part of the story; knowing the distance to that object is necessary for many types of behavioral research. For example, measuring gaze depth is highly relevant when evaluating driver reaction times to road hazards, studying visual accommodation in ergonomics, or analyzing how people navigate complex spaces. 

This tool adds depth estimation directly to Neon Player, allowing researchers to extract the real-world distance of gazed objects without needing any additional or specialized hardware.

## Extracting Distance from 2D Video

Neon provides highly accurate gaze data overlaid on a standard 2D scene video. However, calculating the distance to an object from a flat 2D image is technically difficult. Traditionally, calculating the distance to a gazed object required complex environmental setups, physical markers, or cumbersome depth cameras.

This plugin handles this through software using monocular depth estimation. It uses neural networks to generate a depth map for each frame of the scene video, and then reads the depth value at the exact X,Y coordinate of the user's gaze. The plugin includes several different model sizes to choose from. This allows researchers to prioritize either faster processing times or metric depth output, depending on their specific project needs.

## Introducing the Depth Estimation Neon Player Plugin

Why now? 

Until recently, most open-source depth estimation AI could only provide *relative* depth (e.g., determining that a chair is closer than a wall, but not the actual distance).

The recent release of models like Depth Anything V3 (specifically the DA3Metric-Large model) changes this. It allows for zero-shot *metric* depth estimation from a single RGB camera, outputting accurate real-world measurements natively.

For this tutorial, we are using the Depth Anything V3 models, and specifically the optimized implementation provided by the [Awesome Depth Anything 3](https://github.com/Aedelon/awesome-depth-anything-3) repository.

## How to Use It

- Download the Depth Estimation Plugin from [this Github repository](https://github.com/pupil-labs/depth-estimation-plugin) and place it in your Neon Player `plugins` directory.    
- Open Neon Player and load your chosen recording.
- In the plugin panel, enable the Depth Estimation plugin.
- Select your desired AI model (e.g., DA3Metric-Large for absolute distance, or DA3-Small/Base for lightweight relative depth).
- Click *Run Depth Estimation* and let the background job process the video frames.
- Click *Export* to select your export folder and retrieve your data.

## Exported Data

After the background job finishes, the plugin generates a depth map overlaid on the scene camera footage in the Neon Player window, along with a set of files ready for export and analysis:

In your *depth_estimation* folder inside the chosen the export path:

- **`gaze_depth.mp4`**: A rendered scene video featuring a color-coded depth heatmap and a dynamic text overlay showing the exact distance to the gazed object.
- **`gaze_depth_output.csv`**: A frame-by-frame data export containing:
    - Timestamps and 2D gaze coordinates (x, y).
    - Depth in meters (absolute distance; exclusive to the `DA3Metric-Large` model).
    - Depth in Diopters (1/distance in meters; exclusive to the `DA3Metric-Large` model).
    - Relative inverse depth (for the non-metric, lightweight models).

Inside the recording path, navigate to *.neon_player/cache/DepthEstimationPlugin*:

- **`depth_norms_[Model].npy`**: `uint8` normalized depth maps intended for rapid visualization and live rendering.
- **`depth_values_[Model].npy`**: `float32` arrays containing the raw depth values at quarter-resolution, ideal for custom downstream programmatic analysis.

:::tip
Need assistance implementing your own depth-estimation workflow? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::