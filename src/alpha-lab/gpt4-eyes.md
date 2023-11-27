---
title: "Assistive scene understanding with GPT-4 vision"
description: "Exploring the use of OpenAI's GPT-4-V and real-time APIs from Neon or Invisible to assist individuals with low vision or communication disabilities."
permalink: /alpha-lab/gpt-4-eyes/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://example.com/article_image.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/UU4CF1rXTVI"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/UU4CF1rXTVI/maxresdefault.jpg"
tags: [Pupil Invisible, Neon]
---
# Assistive scene understanding with GPT-4 vision
<TagLinks />
<Youtube src="UU4CF1rXTVI"/>
::: tip
**🔉 Play the video above with audio!**
:::

## Assisting you

At Pupil Labs, we are always exploring how our technologies can be used to enhance lives, particularly in aiding individuals with disabilities. Our journey has led us to remarkable ventures, such as supporting [Gary's race for ALS awareness,](https://pupil-labs.com/blog/cycling-for-als) an inspiring case of using our technologies for a greater social good. Our community stories further reflect this spirit, where we have showcased in the past, tools built by our beloved community to assist others in different tasks, such as [detecting fixated objects](https://pupil-labs.com/blog/michael-barz-ubicomp) or [controlling a prosthetic arm](https://pupil-labs.com/blog/object_fixation). 

On this ethos of innovation and social responsibility, today we introduce a simple yet promising example, glimpsing at the future of assistive technologies. This demonstration is intended to show the potential for new levels of independence and interaction for individuals with either low vision or communication disabilities when combining eye-tracking with large language models (LLM) with vision capabilities.
The combination of these two technologies forms a powerful tool that can help interpret visual scenes and provide descriptive feedback in almost real-time.

## A quick test

OpenAI has recently announced the new APIs at their [DevDay event,](https://openai.com/blog/new-models-and-developer-products-announced-at-devday) introducing GPT-4V, an advanced iteration of the renowned GPT-4 model that is [capable of understanding images](https://platform.openai.com/docs/guides/vision).

With this example, we showcase how straightforward it is to work with these technologies, showcasing the versatility and user-friendliness of both OpenAI and our [real-time APIs](../neon/real-time-api/introduction/).

The code illustrates with a few lines how to stream your Neon/Invisible device scene camera with gaze, take a snap of it upon pressing the "Spacebar" and send it to GPT-4 together with some instructions to either describe what the person is looking at, check if there are any potential risks on their field of view or try to get the intention of the wearer.

To wrap it all up, the script will use the newest text-to-speech (TTS) API to give you this response in viva-voice.

## What do I need to try this?  

To get started, you'll need a Neon or Pupil Invisible device, a computer/laptop with internet access, and an **OpenAI key** that has access to the latest **GPT4-V model**. 

::: warning
You may have to spend 1$ on their APIs to get access to this model.
:::

## Steps

1. Set up your Python environment and API key using [OpenAI's quick start guide](https://platform.openai.com/docs/quickstart/account-setup)
2. Install the necessary dependencies:

```pip install -U openai pydub pupil-labs-realtime-api```

Download the script from [here](https://gist.github.com/mikelgg93/46a02823e1e271087c3eb6b2ab2cb99d) and run it using ```python assistant.py```.

## Play Around

If you have your computer and Companion Device (Neon or Pupil Invisible) connected to the same network, it will be automatically linked and start streaming the scene camera with the gaze circle overlay.

Press **Space** to send the snap to GPT-4 and you will get the response by voice, or use “ASDF” keys to change its mode from describe, report dangers, infer intention to describe in detail. 

**A** - Describe briefly the object gazed.

**S** - Describe any potential danger, knife, roads, …

****D**** - Try to guess the wearers intention, wants to drink water, make a call, be moved somewhere…

********F******** - More detailed description of the environment.

Press **ESC** to stop the application.

## Conclusion

Through this integration, users with low vision can receive descriptive information about their surroundings, while those with communication disabilities can interact more effectively with the world around them and communicate their needs to their caretakers. With this example we did not It not only demonstrates the capabilities of these technologies but also we invite enthusiasts and developers alike to tinker and build upon these tools. It's your turn to explore the endless possibilities and create solutions that can transform lives!


::: tip
Need assistance implementing a real-time API based application? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-lab.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
