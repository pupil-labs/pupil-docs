---
title: "Empowering vision and communication: giving eyes to GPT-4"
description: "Exploring the use of OpenAI's GPT-4-V and real-time APIs from Neon or Invisible to assist individuals with low vision or communication disabilities."
permalink: /alpha-lab/gpt-4-eyes/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://example.com/article_image.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/vOgBEFMdVXc"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/vOgBEFMdVXc/maxresdefault.jpg"
tags: [Pupil Invisible, Neon]
---
# Empowering Vision and Communication: The Fusion of GPT-4 and real-time APIs
<TagLinks />
<Youtube src="vOgBEFMdVXc"/>
**Important:** Play the video above with audio! 🔉

## Assisting you

Pupil Labs has long been committed to enhancing assistive technologies, blending the tools we craft with empathy to create impactful solutions. One example of this commitment is our recent support to [Gary's race for ALS awareness](https://pupil-labs.com/blog/cycling-for-als), which exemplifies our dedication to using technology for social good, particularly in aiding individuals with disabilities.

Building on this ethos of innovation and social responsibility, today we bring you a new example of how you can integrate our tools with the newest technologies to provide ‘**eyes**’ to individuals with low vision or '**voice**' to those with communication disabilities, offering a new dimension of independence and interaction in the realm of assistive technology.

OpenAI has recently announced the new APIs at their [DevDay event](https://openai.com/blog/new-models-and-developer-products-announced-at-devday), introducing GPT-4-V, an advanced iteration of the renowned GPT-4 model. GPT-4-V brings enhanced capabilities in understanding and interpreting visual information. When combined with the [real-time](../neon/real-time-api/introduction/) communication features of Neon or Invisible's APIs, it forms a powerful tool that can interpret visual scenes and provide descriptive feedback in almost real-time.

## A quick test

This example demonstrates how straightforward it is to integrate these technologies, showcasing the versatility and user-friendliness of both OpenAI and our real-time APIs. 

The code shows with few lines how to stream your Neon/Invisible device scene camera with gaze, take a snap of it upon pressing the "**Spacebar**" and send it to GPT-4 together with instructions to describe what the person is looking at, potential risks on their field of view and try to get the intention of the wearer.

Then, it will use [text-to-speech (TTS) new API](https://platform.openai.com/docs/guides/text-to-speech) to give you this response in viva voice.

## What do I need to try this?  

To get started, you'll need a Neon or Pupil Invisible device, a computer/laptop with internet access, and an [OpenAI key](https://platform.openai.com/docs/quickstart/account-setup).

## Steps

1. Set up your Python environment and API key using OpenAI's [quick start guide](https://platform.openai.com/docs/quickstart/step-1-setup-python?context=python).

2. Install the necessary dependencies:

`pip install -U openai pydub pupil-labs-realtime-api`

3. Download the script from [here] and run it using `python assistant.py`.

If you have your computer and Companion Device (Neon or Pupil Invisible) connected to the same network, it will be automatically linked and start streaming the scene camera with the gaze circle overlay.

Press **Space** to send the snap to GPT-4 and you will get the response by voice.

Press **ESC** to stop the application.


## Conclusion

Through this integration, users with low vision can receive descriptive information about their surroundings, while those with communication disabilities can interact more effectively with the world around them and communicate their needs. 
With this example we did not It not only demonstrates the capabilities of these technologies but also invites enthusiasts and developers alike to tinker and build upon them. It's your turn to explore the endless possibilities and create solutions that can transform lives.


::: tip
Need assistance implementing a real-time API based application? Reach out to us via email at [info@alpha-lab.com](mailto:info@alpha-lab.com), on our [Discord server](https://alpha-lab.com/chat/), or visit our [Support Page](https://alpha-lab.com/products/support/) for formal support options.
:::

