---
description: TODO
---

# Ecosystem Overview

Once you have made a recording using your Pupil Invisible glasses, the next step is to transfer it off of the phone for further processing.
We will introduce the different available options in the article alongside a couple other key components.

## Pupil Cloud
Pupil Cloud is our cloud-based storage and analysis platform and is the recommended tool for handling your Pupil Invisible recordings.
It makes it easy to store all your data securely in one place and it offers a variety of options for analysis.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/cloud/imgs/cloud-capture-store-analyze.jpg')"
    max-width=80%
  >
  </v-img>
</div>

Once a recording is uploaded to Pupil Cloud the processing pipeline begins adding several additional low-level data streams to it, including the 200 Hz gaze signal and fixation data. Some of this data (e.g. the 200 Hz gaze signal) is not available outside of Pupil Cloud.

From here, you can either download the raw data in convenient formats, or use some of the available analysis algorithms to extract additional information from the data. You may for example use the [Face Mapper]() to automatically track when subject's are looking at faces, or the [Reference Image Mapper]() to track when subjects are looking at objects of interest represented by a reference image.

We have a strict [privacy policy]() that ensures your recording data is accessible only by you and those you explicitly granted access. Pupil Labs will never access your recording data unless you explicitly instructed us to. If needed, additional privacy features are available that limit what data is stored in Pupil Cloud, like disaabling scene video upload or blurring faces in the scene video (coming soon!).

If enabled, recordings will be uploaded automatically to Pupil Cloud, such that not additional effort is needed for data logistics.


## Pupil Player
Alternatively, you can also transfer recordings directly from the phone to a computer using a USB cable (see [How to transfer recordings via USB?]()). Recordings are saved in a binary format on the phone, which is not easily human-readible. We thus recommend to export recordings to more convenient formats using the Pupil Player software.

Pupil Player is open-source software that was initially developed for the Pupil Core headset. It allows to play back Pupil Invisible recordings and offers a subset of the available analysis features available in Pupil Cloud for offline computation.

Detailed documentation on Pupil Player is available [here]().

::: tip
Note that without uploading to Pupil Cloud, the 200 Hz gaze signal is not available in a recording. Instead, only the real-time gaze signal computed by the phone is available, which is limited to ~65 Hz (using a OnePlus 8 phone).
:::


## Also worth checking out...
There are a number of other tools available for processing Pupil Invisible recordings or for making data acquisition easier. Here we introduce a couple more key components.

### Pupil Invisible Monitor
<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/pi-monitor-app.jpg')"
    max-width=80%
  >
  </v-img>
</div>

All data generated by Pupil Invisible can be monitored in real-time using the Pupil Invisible Monitor app. To access the app simply visit `pi.local` in your browser while being connected to the same WiFi network as the Companion device.

It allows you to stream scene video and gaze data as well as to remote control the Companion app to start/stop recordings and save events. This way you can fully control and monitor an ongoing recording session without having to directly interact with the Companion device carried by the subject.

### Real-Time API
All data generated by Pupil Invisible is accessilbe to developers in real-time via our **Real-Time API**. Similar to the Pupil Invisible Mnitor app, which was implemented using this API, it allows you to stream data, remotely start/stop recordings and save events. All that is required is that the Companion device and the computer using the API are connected to the same WiFi network.

This enables you to implement HCI applications with Pupil Invisible, or to streamline your experiment design by saving events to mark points of interest in your experiment. See our How-Tos to find out more:
- [How to implement HCI applications using the real-time API?]()
- [How to save events using the real-time API?]()

### Cloud API
Pupil Cloud too provides an API that allows developers to access stored data programmatically. It allows to download data without using the UI and enables highly streamlined data processing pipelines. See [here]() for more details.

### 3rd Party Analysis Software
A range of software integrations is available for Pupil Invisible recordings, including compatibility with e.g. the [iMotions]() and [Bliskshift]() software. You can find a full list of official partners [here](). 

Further, there are many open-source projects available built by the community. Join our [Discord](https://pupil-labs.com/chat) server and ask people to point you into the right direction for your project!