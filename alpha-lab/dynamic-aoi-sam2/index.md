---
title: 
description: ""
permalink: /alpha-lab/dynamic-aoi-sam2
meta:
  - name: twitter:card
    content: player
  - name: twitter:image
    content: "https://i.ytimg.com/vi/cuvWqVOAc5M/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/PG0mGpusNK4"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/cuvWqVOAc5M/maxresdefault.jpg"
tags: [Neon, Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Dynamic AOI Tracking With Neon and SAM2 Segmentation

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="PG0mGpusNK4"/>

::: tip
Click. Segment. Track. Dynamic object tracking made easy with SAM2 segmentation and Neon.
:::

Eye tracking becomes far more powerful when gaze can be mapped onto everything we interact with in a scene, from people to objects, as they move. For those new to eye tracking, you might be wondering why this is important. Traditionally, analyzing dynamic gaze data required a frame-by-frame process of manually coding where a user's eyes landed on moving objects. This was time-consuming and tedious, but also prone to human error, making it a barrier to studying real-world actions.

With this Alpha Lab tutorial, we integrate the [Segment Anything Model 2 (SAM2)](https://ai.meta.com/sam2/) with Pupil Labs' [Neon](https://pupil-labs.com/products/neon) eye tracker to make that possible. The tool lets you define dynamic Areas of Interest (AOIs) with a simple click, without being restricted to predefined categories. Once defined, each AOI is automatically tracked across the video and adapts to the object's movement.

The outcome is a flexible and efficient workflow for studying moving AOIs, bringing gaze analysis closer to the realities of naturalistic, real-world interactions in sports, classrooms, clinical settings, and everyday life.

## Map Gaze Onto Any Moving AOI With a Faster, More Flexible Workflow

[Pupil Cloud](https://pupil-labs.com/products/cloud) currently supports automatic AOI mapping through enrichments such as [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/), which works well for static objects and environments. In many real-world applications such as sports, shopper research, surgical workflows, and everyday interactions, however, objects and people are constantly in motion. 

Our [existing Alpha Lab tutorial](https://docs.pupil-labs.com/alpha-lab/map-onto-anything/) using detectors like YOLO can track moving categories, but this approach is limited to the predefined classes available within that model. As a result, researchers have often had to choose between manually re-annotating videos, relying on static AOIs, or restricting their analysis to broad category labels.

As a proof of concept, this workflow uses SAM2 segmentation to introduce user-defined, click-based AOIs that can be tracked dynamically across entire recordings. Thanks to a [Gradio Web App](https://www.gradio.app/) in Google Colab, researchers now have access to a GPU-powered, user-friendly interface where AOIs can be defined in just one frame and then propagated automatically throughout the video. 

This significantly reduces annotation time and opens new opportunities for eye tracking research by enabling precise, flexible, and interactive mapping of gaze onto moving targets in naturalistic environments.

## Run it!

1. Upload your Neon eye tracking recordings to Pupil Cloud and obtain a developer token by clicking [here](https://cloud.pupil-labs.com/settings/developer).

2. Open the provided [Google Colab Notebook](https://colab.research.google.com/drive/1IUtCZE-xxh4QbsplC53PvzjL9rlk-xS-?usp=sharing) and follow the instructions.

<div class="mb-4" style="display:flex;justify-content:center;">
 <a
  href="https://colab.research.google.com/drive/1IUtCZE-xxh4QbsplC53PvzjL9rlk-xS-?usp=sharing"
>
  <img
    src="https://img.shields.io/static/v1?label=&message=Open in Google Colab&color=blue&labelColor=grey&logo=Google Colab&logoColor=#F9AB00"
    alt="Open in Google Colab"
  />
</a>
</div>

3. Once the Gradio App launches, load your recording and select frames to click on objects of interest.
4. Prompt the tool to propagate these AOI masks across the video, automatically mapping gaze data onto segmented objects.

::: warning
SAM2 segmentation is computationally intensive. Very long videos may exceed available GPU or memory resources, especially in environments like Google Colab. Consider working with shorter clips or segmenting your video in parts.
:::

## What Can You Expect

This tool provides a workflow for dynamic AOI tracking, making it easier than ever to study gaze behavior in naturalistic, real-world tasks.

- Creates a segmentation-enriched video where Neon's gaze is mapped onto moving AOIs. Mask overlays change colour whenever gaze intersects with the AOI, giving an immediate visual representation of gaze-object interactions.
- Produces CSV outputs including timestamps and gaze coordinates, along with a clear indication of whether each gaze point fell inside or outside the AOI mask.

::: tip
Need help setting up your own AOI segmentation workflow? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
