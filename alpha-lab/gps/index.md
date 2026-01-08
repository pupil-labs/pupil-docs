---
title: "Where did I see that? Eye Tracking & GPS"
description: "Use a GPS, like the one in Neon's Companion Device, to record synchronized location, eye, and head movement data. Visualize it on a map and click to jump there in your recording!"
permalink: /alpha-lab/gps/
layout: AlphaArticleLayout
sidebar: false
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/jag9EQB7840"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
tags: [Neon, Pupil Cloud, Offline Processing, 3D Reconstruction, Multimodal Data]
---

<Youtube src="Yjos2JzpD-I"/>

<font size=2><b>Neon data on a map:</b> Real-time recording of an orienteering course. Left: Map tracks user position, <a href="https://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data">head orientation</a> (blue arc), and <a href="https://docs.pupil-labs.com/alpha-lab/imu-transformations/">gaze direction</a> (red arrow); Right: Eye tracking footage.</font>

::: tip
Trying to find that moment when a participant reaches a key landmark, like an intersection or the summit of a hill, and visualize how their head and gaze were oriented at this moment in time? Now, you can see a bird's eye view of these data, and simply click on a map to jump to that point in the recording. Expand your insights from Neon with GPS!
:::

## Combine GPS Position Data with Neon Recordings

Neon lets you easily measure combined head and eye movements—but that's not all! The Companion Device also comes with an onboard GPS.

Here, we show you how to merge GPS positioning data (from the Companion Device or another GPS device) with Neon's gaze and IMU readings. This allows you to track where participants move in the real world, in addition to where they direct their gaze and head.

We provide a visualization tool to plot these datastreams onto a map for easy review. For example, you might want to know where a participant was looking when approaching a street intersection or as they jog past a key point on each lap of a race. Rather than searching for the appropriate segment in the recorded video, with this guide, you can simply click on the map and jump right to it!

We also provide automatically reverse-geocoded GPS Events. Participants can tap a button on the phone to save an [Event](https://docs.pupil-labs.com/neon/data-collection/events/) in the Neon recording that corresponds to their current location. This makes it more natural for participants to mark when they have reached key landmarks, like street intersections, without needing to follow a predefined route.

## Steps to recreate

### Recording the data

If you are using your own GPS device, then you can skip to the GPS Data Format section below. Otherwise, to get you up & running, we have developed [a small Android app](https://github.com/pupil-labs/gps-alpha-lab) that runs in tandem with the Neon Companion app. When the app is installed on the same phone, you can use it to start & stop a GPS recording in parallel. Within the app, simply tap a button to send a GPS Event to Neon.

### GPS Data Format

If using data from another GPS device, first be sure to temporally synchronize it with Neon. When using the GPS app, there is no need for any post-hoc time synchronization.

The GPS CSV file only needs the following columns:

```
    timestamp [ns], latitude, longitude
```

This is the same format that is used by the GPS app.

## Visualize your data on a map

Once you've made your recording, you can now load the GPS data and corresponding Neon recording into the visualization tool. Just follow the steps at [the Github repository](https://github.com/pupil-labs/gps-alpha-lab).

Taken together, the GPS app and visualization tool expand the capabilities of a standard Neon bundle, with the visualization tool providing a user interface that simplifies post-hoc review of Neon + GPS recordings. The tools add a new data stream to your studies of human behaviour and can be used with other GPS devices, if you prefer.

Feel free to share your fun & inspiring routes in the #[show-and-tell](https://discord.com/channels/285728493612957698/1238043619999617125) channel on our Discord server!

::: tip
Need assistance with the GPS app? Or, having trouble loading your GPS data into the visualization tool? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::
