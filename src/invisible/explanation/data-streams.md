---
description: TODO
---

# Data Streams
Pupil Invisible glasses include a number of sensors providing different types of data. Some data streams are available in real-time (see [real-time API]()), while others are computed in Pupil Cloud post-hoc after uploading. All data is fully accessible and can be downloaded from Pupil Cloud in convenient formats.

## Eye Videos
Pupil Invisible glasses feature two eye cameras, one for each eye. They are fully embedded into the frame. The sensors record IR video at 200 Hz and 192x192px resolution. Right next to each camera is an IR LED, which guarantees good illumination of the eye in dark environments.

<div style="display:flex;justify-content:center;filter: drop-shadow(6px 6px 4px);" class="pb-4">
  <v-img
    :src="require('../../media/invisible/eye-camera.jpg')"
    max-width=60%
  >
  </v-img>
</div>

Below you can find a collection of example image pairs recorded with different subjects:

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/example-eye-images.jpg')"
    max-width=100%
  >
  </v-img>
</div>

## Gaze
While recording, the Pupil Invisible Companion device is calculating gaze data in real-time. The exact framerate of this signal depends on the model of phone you use as Companion device. On a OnePlus 6 device the framerate is around 50 Hz, while on a OnePlus 8 it is around 65 Hz. Other app running simultaniously on the phone may decrease the framerate.

After a recording is uploaded to Pupil Cloud, the gaze data is automatically re-computed at the full framerate of 200 hz.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/pi-gaze-coordinate-diagram.jpg')"
    max-width=80%
  >
  </v-img>
</div>

The gaze data is output in pixel space of the scene camera image, which has a resolution of 1088x1080px. The origin is in the top-left corner of the image.

You can find a high-level description as well as a thorough evaluation of the accuracy and robustness of the gaze estimation algorithm in our [white paper](https://arxiv.org/pdf/2009.00508).

## Fixations
The two primary types of movement the eye is performing are fixations and saccades. During a fixation, the eye is fixated on a specific point in the environement. A saccade is a very quick movement where the eye is jumping from one fixation to the next. Properties like the fixation duration are correlated with cognitive processes like e.g. cognitive load.

Fixations are calculated automatically in Pupil Cloud after uploading a recording. They are available as part of all enrichment downloads. The downloads for gaze mapping enrichments ([Reference Image Mapper](), [Marker Mapper]()) also include "mapped fixations".

The fixation detection algorithm we have developed was specifically designed for head-mounted eye trackers. Traditionally, fixation detection algorithms are assuming the head of the subject to be stationary, which is however usually not the case when using head-mounted eye trackers.
If there is head-movement during a fixation, the vestibulo-ocular reflex (VOR) is performing a counter-movement with the eye to keep the gaze stable on the point of fixation.
Our algorithm is compensating for VOR movements and is thus correctly classifying fixations also in scenarios that feature a lot of movement.

The algorithm will soon be released as open-source. Further, we are currently working on a white paper that describes the algorithm in detail and evaluates it thoroughly.

## Blinks
Blink detection is coming soon!

## Scene Video
The scene camera is attached to the left temple of the Pupil Invisible glasses. It records video at 30 Hz and 1088x1080px resolution with a field of view of 82°x82°.

The scene camera is detachable and can be removed and re-attached freely even during a recording. Scene video capture will automatically resume as soon as the camera is attached again.

## Audio
A microphone is integrated into the scene camera module, such that audio can be recorded if the scene camera is connected. Recorded audio will be part of the resulting scene video.

Audio recording is disabled in the Pupil Invisible Companion app by default. You can enable it in the settings.

## Inertial Measurements
An inertial measurement unit (IMU) is integrated in the right temple of the Pupil Invisible glasses. It measures the rotation speed and translational acceleration of the Pupil Invisible glasses.

After upload to Pupil Cloud, the absolute roll and pitch values of the glasses are computed from the inertial measurements using the [Madgwick's algorithm](https://www.x-io.co.uk/res/doc/madgwick_internal_report.pdf).

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/pi-imu-diagram.jpg')"
    max-width=80%
  >
  </v-img>
</div>

The IMU is oriented in the frame, such that the x-axis points to the right, the y-axis points downwards and the z-axis points to the front.

## GPS
The GPS signal generated by the Companion device can be recorded.
This is disabled in the Pupil Invisible Companion app by default. You can enable it in the settings.