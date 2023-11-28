---
title: "Detecting eye blinks with Neon"
description: Perform posthoc and real-time blink detection
permalink: /alpha-lab/blink-detection/
tags: [Neon, Realtime Python API]
---

# Detecting eye blinks using Pupil Lab's blink detection pipeline

<font size = 2>Products used: [Neon](https://pupil-labs.com/products/neon/), [Realtime Python API](https://pupil-labs-realtime-api.readthedocs.io/en/stable/)</font>

<div class="pb-4" style="display:flex;justify-content:left;">
  <v-img
    class="rounded"
    :src="require('../media/alpha-lab/eye_blinks_anim.gif')"
    max-width=800px
  >
  </v-img>
</div>

### Blinks: artifacts and information

The accurate detection of blinks serves a vital role in many eye tracking applications. Its importance is twofold: firstly, it helps identify time periods affected by blink-related artifacts, and secondly, blink statistics can serve as relevant physiological, cognitive, and clinical parameters. Blink detection can even be utilized in order to control external devices, for example by detecting a sequence of blinks made in quick succession.

### Running blink detection locally

Blinks are automatically detected once your recording is uploaded to Pupil Cloud. This guide shows how to apply Pupil Labs' blink detection algorithm to Neon recordings <i>offline</i> (i.e., without using Pupil Cloud) or <i>in real-time</i> (using [Pupil Lab's Realtime Python API](https://github.com/pupil-labs/realtime-network-api)). This allows you to build novel applications or simply satisfy your curiosity and develop a deeper understanding of the underlying algorithms.

::: tip
If you are interested in learning more about the technical details of the underlying blink detection pipeline, we invite you to also have a look at our [**white paper**](https://assets.pupil-labs.com/pdf/Pupil_Labs_Blink_Detector.pdf).
:::

### Getting started

To get started, check out the accompanying [**GitHub repository**](https://github.com/pupil-labs/real-time-blink-detection). There you can find detailed instructions on how to install all required packages as well as a [**Jupyter notebook**](https://github.com/pupil-labs/real-time-blink-detection/blob/main/blink_detection.ipynb) that contains all the code needed along with instructions on how to run everything.

If you don't have a recording at hand, worry not! The GitHub repository comes with an example Neon recording that you can explore.

### Results

#### Part 1: Posthoc blink detection

Once you have run the first part of the notebook, you will get an output from which you can derive a number of statistics that provide various insights about your recording: the total number of detected blinks, the estimated blink rate (in Hz), and the average blink duration (in seconds), as well as eyelid closing and re-opening durations (in seconds).

<div class="pb-4" style="display:flex;justify-content:left;">
  <v-img
    class="rounded"
    :src="require('../media/alpha-lab/eye_blinks_statistics.png')"
    max-width=500px
  >
  </v-img>
</div>

<font size=2>**Figure 1.** Blink statistics extracted from the provided example Neon recording.</font>

You will additionally get a visual representation of the detected blinks, providing an overview of their temporal distribution:


![Visual blink representation](../media/alpha-lab/eye_blinks_timeline.png)
<font size=2>**Figure 2.** Visual representation of the detected blinks in the example Neon recording. Green shaded areas depict detected blink events.</font>

The blink detector is designed to classify samples into eye lid opening and closing phases.

Note that, due to the design of the blink detector, the total blink duration doesn't (necessarily) equate to the sum of the durations of the closing and re-opening phases. This discrepancy arises because there are some frames during the period between closing and reopening of the eyelids where there is negligible movement, and thus, they are not classified as part of either the opening or the closing phase. As the total blink duration is calculated from the start time of the eyelid closing to the last frame identified as part of the re-opening sequence, it will, thus, almost always be marginally longer than the sum of the individual events.<br>

#### Part 2.1: Real-time blink detection

In the first section of Part 2 of the guide, you will learn how to estimate blink rate in real-time. From this, you will obtain a graph, as shown below, that is updated with every blink and shows an estimate of the current blink rate.

<div class="pb-4" style="display:flex;justify-content:left;">
  <v-img
    class="rounded"
    :src="require('../media/alpha-lab/eye_blinks_blinkrateest.png')"
    max-width=450px
  >
  </v-img>
</div>

<font size=2>**Figure 3.** Realtime blink rate estimation. Shown is the blink rate estimated over the last 30 s (solid line) as well as the average blink rate for the entire recording (dashed line). </b></font>

#### Part 2.2: Toggling recordings remotely through blinks

In the last section of the guide, you will learn how to control a Neon device through a rapid sequence of three blinks. Upon detection of said sequence, the companion device will initiate a new recording or stop an ongoing one, as illustrated in the video below:

<div class="pb-4" style="display:flex;justify-content:left;">
  <v-img
    class="rounded"
    :src="require('../media/alpha-lab/eye_blinks_toggle_recording.gif')"
    max-width=350px
  >
  </v-img>
</div>

<!-- <div class="pb-4" style="display:flex;justify-content:left;">
    <iframe width="400" height=258 src="https://www.youtube.com/embed/idAHOysl37Q?&mute=1&controls=0&autoplay=1&loop=1&playlist=idAHOysl37Q&rel=0">
    </iframe>
</div> -->

:::tip
If you need assistance in implementing or building your own application, reach out to us via email ([info@pupil-labs.com](mailto:info@pupil-labs.com)), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::
