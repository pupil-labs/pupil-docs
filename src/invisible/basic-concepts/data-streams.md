---
permalink: /invisible/basic-concepts/data-streams
description: Summary of all available data streams in Pupil Invisible recordings
---

# Data Streams
Pupil Invisible glasses include a number of sensors providing different types of data. Some data streams are available in real-time (see [real-time API](/invisible/how-tos/integrate-with-the-real-time-api/introduction)), while others are computed in Pupil Cloud post hoc after uploading. All data is fully accessible and can be downloaded from Pupil Cloud in convenient formats.

## Eye Videos
Pupil Invisible glasses feature two eye cameras, one for each eye. They are fully embedded into the frame. The sensors record IR video at 200 Hz and with a resolution of 192x192px. Right next to each camera is an IR LED, which guarantees good illumination of the eye in dark environments.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/explainers/PI-Camera_annotation-white.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Below you can find a collection of example image pairs recorded with different subjects:

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/explainers/example-eye-images.jpg')"
    max-width=100%
  >
  </v-img>
</div>

## Gaze
While recording, the Pupil Invisible Companion device calculates gaze data in real-time. The exact framerate of this signal depends on the model of phone you use as Companion device. On a OnePlus 8 device it is +120 Hz. Other apps running simultaneously on the phone may decrease the framerate.

After a recording is uploaded to Pupil Cloud, gaze data is automatically re-computed at the full framerate of 200 Hz.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/explainers/pi-gaze-coordinate-diagram.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Gaze data is output in pixel space of the scene camera image, which has a resolution of 1088x1080px. The origin is in the top-left corner of the image.

The gaze estimation algorithm is based on end-2-end deep learning and provides gaze data robustly without requiring a calibration. You can find a high-level description as well as a thorough evaluation of the accuracy and robustness of the algorithm in our [white paper](https://arxiv.org/pdf/2009.00508).

## Fixations
Two primary types of eye movements exhibited by the visual system are fixations and saccades. During fixations, the eyes are directed at a specific point in the environment. A saccade is a very quick movement where the eyes jump from one fixation to the next. Properties like fixation duration are of significant importance for studying gaze behaviour.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/explainers/fixations.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Fixations are calculated automatically in Pupil Cloud after uploading a recording. They are available as part of the [Raw Data Exporter](/invisible/reference/export-formats/#fixations-csv) enrichment downloads. The downloads for gaze mapping enrichments ([Reference Image Mapper](/invisible/reference/export-formats/#fixations-csv-3), [Marker Mapper](/invisible/reference/export-formats/#fixations-csv-2)) also include "mapped fixations".

The fixation detection algorithm employed in Pupil Cloud was developed by us, and was specifically designed for head-mounted eye trackers. 

Traditionally, fixation detection algorithms assumed the head of the subject to be stationary, which is usually not the case when using head-mounted eye trackers. 
If head movements occur during a fixation, compensatory eye movements are required to keep gaze stable on the point of fixation. These are initiated by the 
vestibulo-ocular reflex (VOR). 

Our algorithm explicitly compensates for VOR eye movements and thus correctly classifies fixations in more dynamic scenarios!

The algorithm will soon be released with an open-source licence. Further, we are currently working on a white paper that describes the algorithm in detail and evaluates it thoroughly.

## Blinks
During blinks the eye is briefly covered by the eye lids, which serves the purpose of spreading tears across the cornea. The blink rate and blink duration are however also correlated with cognitive processes, which makes it an interesting physiological signal.

Blinks are detected automatically in Pupil Cloud after uploading a recording. They are available as part of the [Raw Data Exporter](/invisible/reference/export-formats/#blinks-csv) enrichment downloads.

The blink detection algorithm is operating directly on the eye video to detect the movement patterns of blinks. It will soon be released as open-source.

## Scene Video
The scene camera is attached to the left temple of the Pupil Invisible glasses. It records video at 30 Hz and 1088x1080px resolution with a field of view of 82°x82°.

The scene camera is detachable and can be removed and re-attached freely even during a recording. Scene video capture will automatically resume as soon as the camera is attached again.

## Audio
A microphone is integrated into the scene camera module, such that audio can be recorded if the scene camera is connected. Recorded audio will be part of the resulting scene video.

Audio recording is disabled in the Pupil Invisible Companion app by default. You can enable it in the settings.

## Inertial Measurements
An inertial measurement unit (IMU) is integrated into the right temple of the Pupil Invisible glasses. It measures the rotation speed and translational acceleration of the Pupil Invisible glasses.

After uploading to Pupil Cloud, absolute roll and pitch values of the glasses are computed from the inertial measurements using [Madgwick's algorithm](https://x-io.co.uk/downloads/madgwick_internal_report.pdf).

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/explainers/pi-imu-diagram.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The IMU is oriented in the frame, such that the x-axis points to the right, the y-axis points downwards and the z-axis points to the front.
