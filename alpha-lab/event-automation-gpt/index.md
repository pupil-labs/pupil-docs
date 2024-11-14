---
title: 
description: ""
permalink: /alpha-lab/event-automation-gpt
meta:
  - name: twitter:card
    content: player
  - name: twitter:image
    content: "https://i.ytimg.com/vi/cuvWqVOAc5M/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/cuvWqVOAc5M"
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

# Automate Event Annotations with Pupil Cloud and GPT

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="vEshPxgWs3E"/>

::: tip
Tired of endless manual frame-by-frame coding? What if you could capture exactly when users focus on specific objects, or what activities they were engaged in, all without sifting through hours of footage? This proof of concept explores how automating annotations could transform eye tracking analysis.
:::

## Scaling Eye Tracking Analysis with Automation: A Proof of Concept

In eye tracking research, analyzing recordings and identifying key moments—such as when users interact with specific objects—has typically required a tedious, frame-by-frame review. This manual process is time-consuming and limits scalability.

In this article, we explore how automation can overcome these challenges. Using a Large Multimodal Model (GPT-4o), we experiment with prompts to detect specific actions, such as reaching for an object, or what features of the environment were being gazed at, and automatically add the respective annotations to [Pupil Cloud](https://pupil-labs.com/products/cloud) recordings via the Pupil Cloud API. While still in its early stages, this approach shows promise in making the annotation process faster and more scalable.

## What This Tool Brings to the Table

This tool comes at a time when the need for more efficient eye tracking analysis workflows is growing. 

Our latest eye tracker, [Neon](https://pupil-labs.com/products/neon), can provide accurate and robust gaze recordings. By combining the GPT-4o model with customizable prompts, we test how users can automate the identification process, offering a potential solution for streamlining what is usually a labor-intensive process.

## Getting Started

With this tool, getting started is simple. You'll need to upload recordings to Pupil Cloud, obtain a developer token (click [**here**](https://cloud.pupil-labs.com/settings/developer) to obtain yours), and have an OpenAI key. Then, follow the setup guide linked in our [**Github repository**](https://github.com/pupil-labs/automate_custom_events), which provides all necessary instructions. 

The tool's user-friendly GUI will prompt you to select recording details and enter your desired prompts.

## Using The Right Prompt

When defining the prompts, clarity and precision are essential to optimize results with GPT-4o. Users could follow the recommendations listed below to improve detection accuracy:

- Be clear and specific: Instead of "the driver is looking around" use "the driver is looking at the rearview mirror".
- Use present tense: Frame prompts in the present tense to align with the video's real-time context, such as "the driver is adjusting the mirror".
- Include relevant context: Add details when necessary, like "the driver is checking the rearview mirror while merging into traffic" to give the model more information to work with.
- Avoid abstract or subjective terms: Stick to concrete, observable actions that can be visually confirmed in the video. Avoid using emotions or intentions as part of the prompt. For example, consider replacing "the driver is distracted" with "the driver is looking at their phone".
- Use specific objects or locations: Mention key objects or areas in the frame to guide the model's attention. For instance, "the person is pointing at the map on the wall" is better than "the person is pointing".
- Limit prompts to a single action per frame: For complex scenes with multiple activities, split them into individual prompts to improve detection.

## Event Annotations In Pupil Cloud: Powered By Your Prompts

After processing, event annotations are automatically added to your recording in Pupil Cloud, aligned with frames where the specified activities were detected.

How you then use these events is up to you. In the example video, we chose to run the [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) enrichment between events that corresponded to the beginning and end of a section of interest. But equally, you could download the events and use them for offline analysis, such as computing blink rate for the same section of the recording.

Our initial tests with GPT-4o have shown promising potential in detecting gazed-at objects and recognizing prompted activities. However, achieving optimal results relies on the clarity and specificity of the provided prompts. We think this tool could mark a significant step toward making eye tracking analysis more dynamic and efficient, opening new possibilities for both experienced researchers and newcomers. Be sure to experiment and post feedback on our [Discord server](https://pupil-labs.com/chat)!

::: tip
Need assistance automating event annotation via the Cloud API? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::