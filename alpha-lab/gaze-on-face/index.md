---
title: "Map Gaze Onto Facial Landmarks"
description: "Map gaze onto facial landmarks using Pupil Cloud’s Face Mapper exported data."
permalink: /alpha-lab/gaze-on-face/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/aWkFag5Z8LU"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
tags: [Neon, Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Map Gaze Onto Facial Landmarks

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="aWkFag5Z8LU"/>

::: tip
Decode the cues of social interactions and cognition: Does your attention drift towards your friend's eyes, or do you gaze at their lips as they talk? This guide shows how to map gaze on facial landmarks using the output of our Face Mapper enrichment.
:::

## Analyzing Social Interactions: Mapping Gaze Onto Facial Landmarks 

Understanding where individuals direct their attention during social interactions is of significant importance across various research domains. 
From developmental research, exploring how infants and children focus on facial features at different developmental stages, to clinical psychology 
and the study of atypical behaviours, such as autism spectrum disorder.

In this guide, we'll show you how to map gaze onto facial landmarks using data exported from Pupil Cloud's Face Mapper enrichment.

## Introducing AOI Mapping for Facial Landmarks 

Pupil Cloud offers a [Face Mapper enrichment](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/face-mapper/) that tracks 
faces in scene videos, determines if they were gazed at, and provides coordinates for facial landmarks. However, it does not 
reveal _which_ facial landmarks were gazed at. That is, did they look at the mouth, eyes, or nose?

This guide introduces a tool to generate Areas of Interest (AOIs) around each facial landmark (like in the video above) and 
correlate the wearer's gaze with these. In other words, it automatically identifies which facial landmarks were gazed at on the interlocutor's face.

## Setting Up Your Experiment

When setting up your experiment, accurate mapping of gaze on facial landmarks depends on three crucial factors: the proximity 
between the wearer and the target face, the viewing angle, and the size of the AOIs that you define with our tool.

For instance, if the wearer is far from the target face, facial landmarks may appear very small in the scene video. Meanwhile, 
awkward viewing angles can cause facial landmarks to be very small, and sometimes overlap. Both of these factors can make it 
difficult to distinguish exactly which landmark was being gazed at.

Subsequently, it's important to optimise the AOI radius. A small AOI radius, for example, might not cover the entire facial 
landmark of interest. Conversely, a larger AOI radius might cause AOIs to overlap. 

So you can see how all of these factors can interact, and the optimal setup may take some trial and error! But in general, 
a wearer who is both close and directly facing the target face is more optimal in our experience.


## Steps To Recreate
1. Download [Timeseries Data + Scene video](https://docs.pupil-labs.com/neon/data-collection/data-format/) from your project in Pupil Cloud.
2. Download the [Face Mapper export](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/face-mapper/) from your project in Pupil Cloud.
Upload (uncompressed) one of the subfolders (recording folder) that you're interested in to Google Drive from the raw data export.
3. Follow the instructions in this [Github repository](https://github.com/pupil-labs/gaze-on-facial-landmarks) and start mapping gaze on facial landmarks!

::: tip
Consider applying [offset correction](https://docs.pupil-labs.com/neon/data-collection/offset-correction/#using-offset-correction-to-improve-gaze-accuracy) before the recording(s) for even more accurate mapping of gaze on facial landmarks. 
:::

## Explore the Gaze Mapping Output

After running the code, new files will be generated and automatically saved within the folder that contains the Face Mapper enrichment data:

1. Scene video of your recording rendered to show a bounding box of the detected face, a shaded circle over the eyes and nose and a shaded ellipse over the mouth, as well as the typical red circle for the gaze position. Facial landmarks that are gazed at are highlighted with a green mask. 
2. `merged_data.csv` - contains all relevant information, including the gaze x and y coordinates, the coordinates of all facial landmarks, along with their associated timestamps, as well as the outcome of the mapping (field: `landmark`). 
3. `percentages.csv` - percentage of gaze data mapped on each facial landmark, along with a barplot

![Mapping gaze on facial landmarks results](./barplot.png)

::: tip
Need guidance in adapting or extending this guide for your custom analysis pipeline? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::



