---
title: "Automate Event Annotations with Pupil Cloud and GPT"
description: ""
permalink: /alpha-lab/event-automation-gpt
layout: AlphaArticleLayout
sidebar: false
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

# Automate Event Annotations with Pupil Cloud and GPT

<Youtube src="IFV5hG3HQW8"/>

::: tip
Tired of endless manual frame-by-frame coding? What if you could automatically capture when people focused on specific 
objects or what activities they were engaged in, all without sifting through hours of eye-tracking footage? Here, we 
demonstrate how to build your own GPT-based personal annotation assistant!
:::

## Scaling Eye Tracking Analysis with Automation: A Proof of Concept

In eye tracking research, analyzing recordings and identifying key moments—such as when users interact with specific 
objects—has typically required a tedious, frame-by-frame review. This manual process is time-consuming and limits scalability.

In this article, we explore how automation can overcome these challenges. Using a Large Multimodal Model (OpenAI's GPT-4o), we 
experiment with prompts to detect specific actions, such as reaching for an object, or what features of the environment 
were being gazed at, and automatically add the respective annotations to [Pupil Cloud](https://pupil-labs.com/products/cloud) 
recordings via the Pupil Cloud API. While still in its early stages, this approach shows promise in making the annotation 
process faster and more scalable.

## What This Tool Brings to the Table

This tool comes at a time when the need for more efficient eye tracking analysis workflows is growing. For example, our 
latest eye tracker, [Neon](https://pupil-labs.com/products/neon), can record (accurately and robustly) for over four hours 
continuously. This makes larger-scale data collections feasible.

By combining the GPT-4o model with customizable prompts, we test how users can automate the identification process, 
offering a potential solution for streamlining what can be a labor-intensive process.

## Getting Started

With this tool, getting started is simple. You'll need to upload recordings to Pupil Cloud, obtain a developer token 
(click [**here**](https://cloud.pupil-labs.com/settings/developer) to obtain yours), and have an OpenAI key. Then, 
follow the setup guide linked in [**our Github repository**](https://github.com/pupil-labs/automate_custom_events), 
which provides all necessary instructions. 

The tool's user-friendly GUI will prompt you to select recording details and enter your desired prompts.

## Using The Right Prompt

When defining the prompts, clarity and specificity are essential to optimize results with GPT-4o. Users can follow the 
recommendations listed below to improve detection accuracy:

- Be clear and specific: Instead of _"the driver is looking around"_ use _"the driver is looking at the rearview mirror"_.
- Use present tense: Frame prompts in the present tense to align with the video's real-time context, such as _"the driver is adjusting the mirror"_.
- Include relevant context: Add details when necessary, like _"the driver is checking the rearview mirror while merging into traffic"_ to give the model more information to work with.
- Avoid abstract or subjective terms: Stick to concrete, observable actions that can be visually confirmed in the video. Avoid using emotions or intentions as part of the prompt. For example, consider _"the driver is looking at their phone"_ instead of, _"the driver is distracted"_.
- Use specific objects or locations: Mention key objects or areas in the frame to guide the model's attention. For instance, _"the person is pointing at the map on the wall"_ is better than _"the person is pointing"_.
- Limit prompts to a single action per frame: For complex scenes with multiple activities, split them into individual prompts to improve detection.

## Event Annotations In Pupil Cloud: Powered By Your Prompts

After processing, event annotations are automatically added to your recording in Pupil Cloud, aligned with frames where 
the specified activities were detected.

How you then use these events is up to you. In the example video, we chose to run the 
[Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) enrichment 
between events that corresponded to the beginning and end of a section of interest. But you could also download the 
events and use them for offline analysis, such as computing blink rate for the same section of the recording.

Our initial tests with GPT-4o have shown promising potential in detecting gazed-at objects and recognizing prompted 
activities. Achieving the best results relies on the clarity and specificity of the provided prompts. 

We think this tool could mark the beginnings of making eye tracking analysis more dynamic and efficient. Be sure to 
experiment and post feedback on our [Discord server](https://pupil-labs.com/chat)!

::: tip
Need assistance automating event annotation via the Cloud API? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::