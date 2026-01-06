---
title: "Audio-Based Event Detection With Pupil Cloud and OpenAI's Whisper"
description: ""
permalink: /alpha-lab/audio-event-annotations
layout: AlphaArticleLayout
sidebar: false
meta:
  - name: twitter:card
    content: player
  - name: twitter:image
    content: "https://i.ytimg.com/vi/cuvWqVOAc5M/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/YvtlsLHaxu8"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/cuvWqVOAc5M/maxresdefault.jpg"
tags: [Neon, Cloud]
---

# Audio-Based Event Detection With Pupil Cloud and OpenAI's Whisper

<Youtube src="YvtlsLHaxu8"/>

::: tip
Eye tracking isn't just about following gazes anymore—it's about listening to the context. This tool brings auditory and visual data together offering a fresh way to streamline annotations.
:::

## Event Annotations With Audio-based Detection

Eye tracking analysis often focuses on visual data, whereby researchers identify and annotate events after watching the eye tracking footage. This tool introduces an alternative approach that leverages [Neon's](https://pupil-labs.com/products/neon) audio recordings to detect and annotate events based on auditory cues. By integrating OpenAI's automatic speech recognition system, Whisper, with the Pupil Cloud API, we can automatically detect key spoken events and align them with eye tracking data in [Pupil Cloud](https://pupil-labs.com/products/cloud).

This method might be particularly useful in experiments where speech plays a crucial role. For example, if your research involves extended speech interactions, you may want to automatically tag key words and phrases, and subsequently correlate them with gaze patterns and fixation behavior. Or you could use this approach to speed up your testing workflow, by marking the beginning and end of trials using a specific keyword or phrase, e.g. 'trial one begin', making your experiment easier to run in practice.

::: info
For a similar tool showcasing how AI can detect actions—such as reaching for an object—and automatically generate corresponding annotations in Pupil Cloud recordings using scene recognition, refer to our [GPT Alpha Lab guide](https://docs.pupil-labs.com/alpha-lab/event-automation-gpt/).
:::

## Enhancing Eye Tracking Analysis With Audio Context

Eye tracking data is powerful, but it can gain even more depth when combined with other modalities like speech. With advancements in automatic speech recognition (ASR), systems like OpenAI's Whisper are now more accurate and accessible than ever before. This progress sparked the idea to explore how ASR could be used for event detection, allowing researchers to automate annotations based on spoken cues. 

## Run it!

First, upload your recordings to Pupil Cloud and obtain a developer token by clicking [here](https://cloud.pupil-labs.com/settings/developer). 

Access **[our Google Colab notebook](https://colab.research.google.com/drive/18_UULU4u0_aM7zL2N-9xEzNiLgKJQ5P7?usp=sharing)** and follow the instructions outlined there. 

<div class="mb-4" style="display:flex;justify-content:center;">
 <a
  href="https://colab.research.google.com/drive/18_UULU4u0_aM7zL2N-9xEzNiLgKJQ5P7?usp=sharing"
>
  <img
    src="https://img.shields.io/static/v1?label=&message=Open in Google Colab&color=blue&labelColor=grey&logo=Google Colab&logoColor=#F9AB00"
    alt="Open in Google Colab"
  />
</a>
</div>

The notebook will guide you through selecting recording details and entering your desired prompts (you can use prompts of any length!). These prompts represent the words or phrases you want Neon to detect in the audio.
## Audio-Detected Event Annotations In Pupil Cloud

After running this tool, you'll get the following files within your recording's folder in your Google Drive:

- A CSV file, `audio_timestamps.csv`, including each word detected in your recording and its start and end timestamp in seconds.
- A transcript of your audio recording, `audio_transcript.txt`.

More importantly, when a specified word is detected, an event will automatically be created in the recording, tagged with that word, and subsequently uploaded to Pupil Cloud, ready to enhance your analysis. Here are some ideas about how to use them.

- Use audio-detected events to section your recordings for use with enrichments.
- Inspect annotated events for further analysis, such as correlating spoken instructions or key speech/phrases with participant gaze patterns

::: tip
Looking for help with automating event annotation from audio data using the Cloud API, or curious about how audio data can enhance your Neon recordings? Feel free to reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
