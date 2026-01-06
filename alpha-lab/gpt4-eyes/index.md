---
title: "Build an AI Vision Assistant"
description: "Exploring the use of OpenAI's GPT and real-time APIs from Neon or Invisible to assist individuals with low vision or communication disabilities."
permalink: /alpha-lab/gpt-4-eyes/
layout: AlphaArticleLayout
sidebar: false
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

<Youtube src="_k5QbpC84H8"/>

**🔉 Play the video above with audio!**

::: tip
Imagine an AI assistant that not only talks but also _“sees”_ for you. Welcome to the era of Large Multimodal Models!
:::

## Combining Eye Tracking With AI for Assistive Applications

Unlike popular Large _Language_ Models (LLMs), which can only interpret and interact with text, Large _Multimodal_ Models (LMMs) are also able to understand images. This means chatbots, like GPT, can understand, describe and interpret the content of real-world scenes, including identifying different objects and how people might interact with them.

When combined with eye tracking, this holds potential for assistive technologies. For example, it could help individuals with low vision to identify the objects at which they are gazing, highlight potential hazards in their surroundings, or assist people with ALS who face significant communication challenges.

Here, we show you how to build a simple, explorative, gaze-based assistive tool using Neon or Pupil Invisible and a new LMM, GPT-4V.

## What Tools Enable This

OpenAI recently unveiled a set of new APIs at their [DevDay event,](https://openai.com/blog/new-models-and-developer-products-announced-at-devday) introducing GPT-4V, an extension of their most advanced large language model capable of [understanding images](https://platform.openai.com/docs/guides/vision).
We gained access to the preview and decided to see what their model is capable of when integrated with our eye trackers. We used Neon and Pupil Invisible since they remove the barrier of calibration, making them more suitable for longer sessions and real-life scenarios and, therefore, in a good position to experiment with assistive applications.

We used the [real-time API](https://docs.pupil-labs.com/neon/real-time-api/introduction/) to stream scene camera video and gaze positions over the network. We grab a frame from the real-time stream and send it to GPT4-V for processing. We get back text that can be used to inform the wearer about what they were looking at or whatever we wanted to ask about the scene.

## Steps

To try this demo, you'll need a Neon or Pupil Invisible eye tracker, a computer with internet access, and an OpenAI key that has access to the latest GPT-4V model.

::: info
**24/06/12 Update:** This script uses now [`gpt-4o`](https://openai.com/index/hello-gpt-4o/) by default.
:::

Head to this [script](https://gist.github.com/mikelgg93/46a02823e1e271087c3eb6b2ab2cb99d) and follow the installation instructions.

## Scene Understanding in Real-Time

Look at something in your environment and press the `Space` key. A snapshot with gaze overlay will be sent to GPT, and you will receive a vocal response.

The nature of the AI assistant's response will depend on the selected model. We have defined 4 modes that can be toggled with **("ASDF")** keys:

1. `A`: a description of what you're gazing at.
2. `S`: any potential danger.
3. `D`: a guess about your intentions.
4. `F`: a more detailed description of the environment.

In this initial exploration, GPT-4V was generally good at identifying what was being gazed at or trying to predict the wearer's intentions. However, it wasn't fast enough to detect immediate dangers due to network latency. The great thing about GPT-4V is that you can modify the prompts to suit your specific needs. Rapid advancements in the field suggest that we might soon see these types of models operating [locally](https://android-developers.googleblog.com/2023/12/a-new-foundation-for-ai-on-android.html) and with virtually no latency. How useful could this be? We would love to hear your feedback!

::: tip
Need assistance implementing a real-time API based application? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
