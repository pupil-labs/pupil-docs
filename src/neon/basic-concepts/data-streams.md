---
permalink: /neon/basic-concepts/data-streams
description: Summary of all available data streams in Neon recordings
---

# Data Streams
The Neon module contains a number of sensors providing different types of data. Some data streams are available in real-time (see [real-time API](/neon/real-time-api/introduction/)), while others are computed in Pupil Cloud post hoc after uploading. All data is fully accessible and can be downloaded from Pupil Cloud in convenient formats.

## Eye Videos
The Neon module features two eye cameras, one for each eye. They are located at the tip of the small arms of the module. The sensors record IR video at 200 Hz with a resolution of 192x192px. The two sensors are synced in hardware, such that they record images at the exact same time. The resulting images a concatenated in a single video stream of 384x192px resolution. 

An IR LED is located just above each camera, which guarantees good illumination of the eye in dark environments.


## Gaze
The Neon Companion app can provide gaze data in real-time. When using a OnePlus 8 Companion device, the available framerate is +120 Hz (the achieved framerate varies from ~200Hz in the first minute of a recording to ~120Hz for longer recordings. This is due to restrictions in resource consumption applied by the Android operating system). Other apps running simultaneously on the phone may decrease the framerate.

After a recording is uploaded to Pupil Cloud, gaze data is automatically re-computed at the full framerate of 200 Hz and can be downloaded from there.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/neon/gaze.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Gaze data is output in pixel space of the scene camera image, which has a resolution of 1600x1200 px. The origin is in the top-left corner of the image.

The gaze estimation algorithm is based on end-2-end deep learning and provides gaze data robustly without requiring a calibration. We are currently working on a white paper that thoroughly evaluated the algorithm and will link it here once it is published.

## Fixations
The two primary types of eye movements exhibited by the visual system are fixations and saccades. During fixations, the eyes are directed at a specific point in the environment. A saccade is a very quick movement where the eyes jump from one fixation to the next. Properties like the fixation duration are of significant importance for studying gaze behaviour.


<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/neon/fixations.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Fixations are calculated automatically in Pupil Cloud after uploading a recording and are included in relevant downloads. The downloads for gaze mapping enrichments ([Reference Image Mapper](/neon/reference/export-formats/#fixations-csv-3), [Marker Mapper](/neon/reference/export-formats/#fixations-csv-2)) also include "mapped fixations".

The deployed fixation detection algorithm was specifically designed for head-mounted eye trackers and offers increased robustness in the presence of head-movements. Especially movements due to vestibulo-ocular reflex are compensated for, which is not the case for most other fixation detection algorithms. 

## Blinks
During blinks the eye is briefly covered by the eye lids, which serves the purpose of spreading tears across the cornea. The blink rate and blink duration are also correlated with cognitive processes, which makes them interesting physiological signals.

Blinks are detected automatically in Pupil Cloud after uploading a recording and are part of the downloadable data.

The blink detection algorithm is operating directly on the eye video to detect the movement patterns of blinks.

## Scene Video
The front-facing scene camera is located in the center of the Neon Module. It records video at 30 Hz and 1600x1200 px resolution with a field of view of 132°x81°.

The scene camera can be operated with automatic or manual exposure. In situations with challenging lighting condition, e.g. when recordings a screen, optimizing the exposure manually can improve the quality of the scene video.

## Audio
A microphone is integrated into the Neon module. Recorded audio will be part of the resulting scene video.

Audio recording is disabled in the Neon Companion app by default and can be enabled in the settings.

## Inertial Measurements
An 9-DoF inertial measurement unit (IMU) is integrated into the Neon module featuring a fused and independent accelerometer, gyroscope, and magnetometer measuring acceleration, magnetic orientation, and angular velocity.

After uploading to Pupil Cloud, absolute roll, pitch, and yaw values of the glasses are computed from the inertial measurements using [Madgwick's algorithm](https://x-io.co.uk/downloads/madgwick_internal_report.pdf).


<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/neon/inertial_measurements.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The IMU is oriented in the frame, such that the x-axis points to the right, the y-axis points downwards and the z-axis points to the front.
