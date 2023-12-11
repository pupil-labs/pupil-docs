---
title: "Assistive scene understanding with GPT-4 vision"
description: "Exploring the use of OpenAI's GPT-4V and real-time APIs from Neon or Invisible to assist individuals with low vision or communication disabilities."
permalink: /alpha-lab/gpt-4-eyes/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://example.com/article_image.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/_k5QbpC84H8"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/_k5QbpC84H8/maxresdefault.jpg"
tags: [Pupil Invisible, Neon]
---
<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Assistive Scene Understanding With GPT-4V

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="_k5QbpC84H8"/>

**🔉 Play the video above with audio!**

::: tip
Imagine an AI assistant that not only talks but also *“sees”* for you. Welcome to the era of Large Multimodal Models! 
:::

## Combining Eye Tracking With AI for Assistive Applications

Unlike popular Large *Language* Models (LLMs), which can only interpret and interact with text, Large *Multimodal* Models (LMMs) are also able to understand images. This means chatbots, like GPT, can understand, describe and interpret the content of real-world scenes, including identifying different objects and how people might interact with them.

When combined with eye tracking, this holds potential for assistive technologies. For example, it could help individuals with low vision to identify the objects at which they are gazing, highlight potential hazards in their surroundings, or assist people with ALS who face significant communication challenges.

Here, we show you how to build a simple, explorative, gaze-based assistive tool using Neon or Pupil Invisible and a new LMM, GPT-4V.

## What Tools Enable This

OpenAI recently unveiled a set of new APIs at their [DevDay event,](https://openai.com/blog/new-models-and-developer-products-announced-at-devday) introducing GPT-4V, an extension of their most advanced large language model capable of [understanding images](https://platform.openai.com/docs/guides/vision). 
We got access to the preview and decided to see what is capable of when integrated with our eye trackers. We used Neon and Pupil Invisible because they remove the barrier of calibration, making them more suitable for real-life applications, longer recording sessions, and thus use alongside GPT-4V for experimenting with assistive applications.

We used our [real-time API](https://docs.pupil-labs.com/neon/real-time-api/introduction/) as it enables streaming of scene camera and gaze positions over the network in real-time. This meant we could grab a frame at a selected moment and send it to GPT4-V for further processing, informing the wearer about what they were seeing or whatever we wanted to ask it about the scene.

## Steps

To try this demo, you'll need a Neon or Pupil Invisible device, a computer/laptop with internet access, and an OpenAI key that has access to the latest GPT-4V model. 

::: tip
[Don’t have access to `gpt-4-vision-preview model`?](https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4) You may have to spend 1$ on their APIs to get access to this model.
:::

Head to this [script](https://gist.github.com/mikelgg93/46a02823e1e271087c3eb6b2ab2cb99d) and follow the installation instructions.

## Scene Understanding in Real-Time

After running the example and pressing the `Space` key when you’re gazing at something, a snapshot of what you’re looking at will be sent to GPT-4V, and you will receive a vocal response. The nature of the AI assistant's response will depend on the selected model **("ASDF")**. This could be `A`, a description of what you're gazing at; `S`, any potential danger; `D`, a guess of your intentions; or `F`, a more detailed description of the environment. 

In this early exploration, we found that GPT-4V is generally good at detecting what is being gazed at or trying to guess the intention of the wearer. But not fast or accurate enough to detect immediate dangers. There was some network latency, but generally, it worked quite well. You can modify the prompt in the code to tailor it to your specific needs. We ultimately can’t say just how useful this will be for assistive users. For that, we need your feedback!

::: tip
Need assistance implementing a real-time API based application? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
