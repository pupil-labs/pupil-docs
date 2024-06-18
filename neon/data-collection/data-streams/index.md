# Data Streams

The Neon module contains a number of sensors providing different types of data (see also [Technical Overview](/hardware/module-technical-overview/)). Some data is available in real-time (e.g. via the [real-time API](/real-time-api/tutorials/)), while other data is generated post hoc through either [Pupil Cloud](/pupil-cloud/) or [Neon Player](/neon-player/).

Below you can find a description of all data streams and where they are available. All data is fully accessible and can be downloaded in convenient formats.

## Eye Videos

<Badge>Real-time</Badge><Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
The Neon module features two eye cameras, one for each eye. They are located at the tip of the small arms of the module. The sensors record IR video at 200 Hz with a resolution of 192x192px. The two sensors are synced in hardware, such that they record images at the exact same time. The resulting images a concatenated in a single video stream of 384x192px resolution.

An IR LED is located just above each camera, which guarantees good illumination of the eye in dark environments.

## Gaze

<Badge>Real-time</Badge><Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
The Neon Companion app can provide gaze data in real-time at up to 200 Hz. Gaze data is output in pixel space of the scene camera image, which has a resolution of 1600x1200 px. The origin is in the top-left corner of the image.

![Gaze](./gaze.jpg)

The achieved framerate can vary based on what Companion device is used and environmental conditions. On the OnePlus 10 and Motorola Edge 40 Pro, the full 200 Hz can generally be achieved outside of especially hot environments. On the OnePlus 8, the framerate typically drops to ~120 Hz within a few minutes of starting a recording. Other apps running simultaneously on the phone may decrease the framerate.

After a recording is uploaded to Pupil Cloud, gaze data is automatically re-computed at the full 200 Hz framerate and can be downloaded from there.

The gaze estimation algorithm is based on end-2-end deep learning and provides gaze data robustly without requiring a calibration. You can find a high-level description as well as a thorough evaluation of the accuracy and robustness of the algorithm in our [white paper](https://zenodo.org/doi/10.5281/zenodo.10420388). 

## Fixations & Saccades

<Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
The two primary types of eye movements exhibited by the visual system are fixations and saccades. During fixations, the eyes are directed at a specific point in the environment. A saccade is a very quick movement where the eyes jump from one fixation to the next. Properties like the fixation duration are of significant importance for studying gaze behavior.

![Fixations](./fixations.jpg)

Fixations and saccades are calculated automatically in Pupil Cloud after uploading a recording and are included in the recording downloads. The deployed fixation detection algorithm was specifically designed for head-mounted eye trackers and offers increased robustness in the presence of head movements. Especially movements due to vestibulo-ocular reflex are compensated for, which is not the case for most other fixation detection algorithms. You can learn more about it in the [Pupil Labs fixation detector whitepaper](https://docs.google.com/document/d/1CZnjyg4P83QSkfHi_bjwSceWCTWvlVtbGWtuyajv5Jc/export?format=pdf) and in our [publication](https://link.springer.com/article/10.3758/s13428-024-02360-0) in *Behavior Research Methods* discussing fixation detection strategies.

We detect saccades based on the fixation results, considering the gaps between fixations to be saccades. Note, that this assumption is only true in the absence of smooth pursuit eye movements. Additionally, the fixation detector does not compensate for blinks, which can cause a break in a fixation and thus introduce a false saccade.

The downloads for gaze mapping enrichments ([Reference Image Mapper](/pupil-cloud/enrichments/reference-image-mapper/#export-format), [Marker Mapper](/pupil-cloud/enrichments/marker-mapper/#export-format)) also include mapped fixations, i.e. fixations in reference image or surface coordinates respectively.


## 3D Eye States

<Badge>Real-time</Badge><Badge>Pupil Cloud</Badge>
After uploading a recording to Pupil Cloud, 3D eye states are computed automatically at 200 Hz. The 3D eye states are a time series of each eye's position and orientation in 3D space, given by the location of the eyeball center and the optical axis of each eye.

The coordinate system is depicted below. The origin corresponds to the scene camera of the Neon Module.

![Coordinate systems of 3D eye states](./3d_eye_states.png)

You can specify the inter-eye distance (IED) of a wearer in the wearer profile before making a recording to further improve the accuracy of the measurements. If no IED value is specified, the population average of 63 mm is used.

## Pupil Diameters

<Badge>Real-time</Badge><Badge>Pupil Cloud</Badge>
After uploading a recording to Pupil Cloud, pupil diameters are computed automatically at 200 Hz, separately for the left and right eye. The computed pupil diameters correspond to the physical pupil size in mm, rather than the apparent pupil size in pixels as observed in the eye videos. You can find a high-level description as well as a thorough evaluation of the accuracy and robustness of Neon’s pupil-size measurements in our [white paper](https://zenodo.org/records/10057185).

Similar to the 3D eye states, the accuracy of the pupil diameter measurements improves when supplying the wearer's IED in the wearer profile before making a recording.

## Blinks

<Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
During blinks the eye is briefly covered by the eyelids, which serves the purpose of spreading tears across the cornea. The blink rate and blink duration are also correlated with cognitive processes, which makes them interesting physiological signals.

Blinks are detected automatically in Pupil Cloud after uploading a recording and are part of the downloadable data.

The blink detection algorithm is operating directly on the eye video to detect the movement patterns of blinks. Read more about the algorithm in the [Pupil Labs blink detector whitepaper](https://docs.google.com/document/d/1JLBhC7fmBr6BR59IT3cWgYyqiaM8HLpFxv5KImrN-qE/export?format=pdf). The algorithm will soon be released as open-source.

## Scene Video

<Badge>Real-time</Badge><Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
The front-facing scene camera is located in the center of the Neon Module. It records video at 30 Hz and 1600x1200 px resolution with a field of view of 132°x81°.

The scene camera can be operated with automatic or manual exposure. In situations with challenging lighting conditions, e.g. when recording a screen, optimizing the exposure manually can improve the quality of the scene video.

## Audio

<Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
Stereo microphones are integrated into the Neon module. Recorded audio will be part of the resulting scene video.

Audio recording is disabled in the Neon Companion app by default and can be enabled in the settings.

## Movement (IMU Data)

<Badge>Real-time</Badge><Badge>Pupil Cloud</Badge><Badge>Neon Player</Badge>
The Neon module is equipped with a 9-DoF [inertial measurement unit](https://invensense.tdk.com/products/motion-tracking/9-axis/icm-20948/) (IMU) featuring an accelerometer, gyroscope, and magnetometer. The accelerometer and gyroscope measure linear acceleration and angular velocity, respectively, and are provided as raw values.

A fusion engine also combines these values with magnetometer readings to estimate the module's absolute orientation relative to magnetic north and gravity as a quaternion. Note that in order to obtain precise absolute yaw readings, the magnetometer needs to be [calibrated](/data-collection/calibrating-the-imu/).

The IMU is located in the top bar of the module and is sampled at 110 Hz. Its coordinate system is oriented with the x-axis pointing to the right, the y-axis pointing in front, and the z-axis pointing upwards.

![IMU Coordinate System](./imu-xyz-black.jpg)

When relating data from the IMU to things visible in the scene camera, it may be necessary to align their respective 3D coordinate systems. The IMU's coordinate system is rotated by 102° around the x-axis in relation to the scene camera's coordinate system.

![IMU Scene Camera](./imu_scenecam_sidepose.png)

::: tip 
Gaze data for the 3D eye states are given in scene camera coordinates. Due to the handedness of the two coordinate systems, leftward rotations in the IMU coordinate system are positive and rightward rotations in the scene camera are also positive. 
:::

### Euler Angles

When exporting recordings from Pupil Cloud or Neon Player the IMU's orientation in Euler angles (i.e. roll, pitch, and yaw) is also available.

Pitch is defined as a rotation around the x-axis with a value range of -90° to +90°. Yaw and roll are rotations around the y- and z-axis, respectively, with value ranges of -180° to +180°.

Once the IMU is properly [calibrated](https://docs.pupil-labs.com/neon/data-collection/calibrating-the-imu/), then a yaw value of 0° is aligned with magnetic north.

![IMU Pitch, Yaw, Roll](./imu-pitch_yaw_roll-black.jpg)
