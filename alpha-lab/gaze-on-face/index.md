---
title: "Mapping Gaze Onto Facial Landmarks"
description: "Map gaze onto facial landmarks using Pupil Cloud’s Face Mapper exported data."
permalink: /alpha-lab/gaze-on-face/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/bWCLXPZa8zs"
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

<Youtube src="bWCLXPZa8zs"/>

::: tip
Decode the cues of social interactions and cognition: Does your attention drift towards your friend's eyes, or do you gaze at their lips as they talk? This guide provides a roadmap to map gaze on facial landmarks using the output of our Face Mapper enrichment.
:::

## Analyzing Social Interactions: Mapping Gaze Onto Facial Landmarks 

Understanding where individuals direct their attention during social interactions is of significant importance across various research domains. From developmental research, exploring how infants and children focus on specific facial features at different developmental stages, to clinical psychology and the study of atypical behaviours, such as autism spectrum disorder.

In this guide, we'll show you how to map gaze onto facial landmarks using data exported from Pupil Cloud's Face Mapper enrichment.

## Introducing AOI Mapping for Facial Landmarks 

Pupil Cloud offers a [Face Mapper enrichment](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/face-mapper/) that tracks faces in scene videos, determines if they were gazed at, and provides coordinates for facial landmarks of the faces. However, it does not reveal which facial landmarks the wearer's gaze targets. That is, do they look at the mouth, eyes, or nose?

This guide addresses this by introducing a tool that can generate Areas of Interest (AOIs) around each facial landmark (like in the video above) and correlate the wearer's gaze with these. This enables automatic identification of which specific locations the wearer looked at on their interlocutor's face.

## Setting Up Your Study

When setting up your experiment, precise mapping of gaze on facial landmarks hinges on two crucial factors: the proximity between the wearer and the target face, and the viewing angle directed towards the face.

For example, closer proximity results in facial landmarks appearing larger in the scene video. Similarly, viewing angle influences whether the AOIs on distinct facial landmarks will overlap. 

It is therefore important to optimize the AOI radius depending on the target’s distance and viewing angle. A small AOI radius might inadequately cover the facial landmark of interest, leading to inaccuracies in gaze mapping. Conversely, a larger AOI radius might cause AOIs to overlap. Such overlap complicates the accurate mapping of gaze, as distinguishing foreground landmarks becomes challenging.

## Steps To Recreate
1. Download a [Timeseries Data + Scene video]() from your project in Pupil Cloud.
2. Download the [Face Mapper export](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/face-mapper/) from your project in Pupil Cloud.
Upload (uncompressed) one of the subfolders (recording folder) that you're interested in to Google Drive from the raw data export.
3. Follow the instructions of this [Github repository](https://github.com/pupil-labs/gaze-on-facial-landmarks) and start mapping gaze on facial landmarks.

::: tip
Consider applying [offset correction](https://docs.pupil-labs.com/neon/data-collection/offset-correction/#using-offset-correction-to-improve-gaze-accuracy) for even more accurate mapping of gaze on facial landmarks. 
:::

## Explore the Gaze Mapping Output

After running the code, new files will be generated and automatically saved within the folder that contains the Face Mapper enrichment data. Specifically, you will get:

1. The scene video of your recording rendered to show a bounding box of the detected face, a blue shaded circle over the eyes and nose and a blue shaded ellipse over the mouth, as well as the typical red circle for the gaze position. Facial landmarks that are gazed at are highlighted with a green mask. 
2. A newly generated file named `merged_data.csv`, containing all the relevant information you need, including the gaze data point information (gaze x and y coordinates), the coordinates of all facial landmarks, along with their associated timestamps, as well as the outcome of the mapping (field: `landmark`). 
3. A newly generated file named `percentages.csv`, along with a barplot showing the percentage of gaze data mapped on each facial landmark.

![Mapping gaze on facial landmarks results](./barplot.png)

::: tip
Need guidance in adapting or extending this guide to match your custom analysis pipeline? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::