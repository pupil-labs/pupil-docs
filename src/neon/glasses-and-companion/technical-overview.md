---
permalink: /neon/glasses-and-companion/technical-overview
description: A technical overview of Neon.
---

# Technical Overview

[TODO: update image]

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/pi_with_phone.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Neon connects to the Companion device (Android phone) with a USB-C cable. The Companion device supplies Neon with power and receives the raw sensor data for storage and further processing. Use the Neon app to make recordings, preview real-time gaze and world video, stream data over the network, set up wearers, select templates, and preview and upload recordings to Pupil Cloud.

[TODO: update image]

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/pi_sensor_callout.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The Neon module is filled with sensors and electronics:

- **Eye Cameras**: A binocular pair of infrared cameras with matching 850nm infrared illuminator **LEDs** are used to capture [eye videos](/neon/basic-concepts/data-streams/#eye-videos). The raw data is saved with each recording and is used for real-time [gaze](/neon/basic-concepts/data-streams/#gaze) estimation.

- **Scene Camera**: A front-facing scene camera is located at the center of the module capturing [scene video](/neon/basic-concepts/data-streams/#scene-video). A **microphone** is integrated in the module to capture [audio](/neon/basic-concepts/data-streams/#audio). Capturing audio is optional and settable in the Neon app settings.
 
- **IMU**: A 9-degrees-of-freedom IMU is integrated into the module. It captures the [inertia](/neon/basic-concepts/data-streams/#inertial-measurements) of the glasses, including translational acceleration, rotational speed, magnetic orientation, pitch, yaw, and roll.
**USB Connector**: A USB connector is located at the front of the module. Through this connector, the module connects to a "nest" which is typically located in a glasses-like frame. Attached to the nest is a USB-C cable which gets connected to the Companion device.

- **Serial Plaque**: A QR-Code is located at the back of the module, which contains the serial number of the device.