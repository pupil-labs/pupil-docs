---
permalink: /core/software/recording-format
---

# Recording Format

Each recording contains a number of files. The exact number and names depend on which
Pupil Core headset is connected and which features are enabled during the recording.

## Pupil Core 

```python
# Meta File (required)
info.player.json

# Notifications (required)
notify_timestamps.npy
notify.pldata

# World Video Files (optional in VR/AR recordings)
world_timestamps.npy
world.intrinsics
world.mp4

# Eye Video Files (only required for Offline Pupil Detection)
eye0_timestamps.npy
eye0.mp4

eye1_timestamps.npy
eye1.mp4

# Pupil Data (optional)
pupil_timestamps.npy
pupil.pldata

# Gaze Data (optional)
gaze_timestamps.npy
gaze.pldata

# Annotations (optional)
annotation_timestamps.npy
annotation.pldata

# Audio Capture (optional)
audio_timestamps.npy
audio.mp4

## Blink Detector (optional)
blinks_timestamps.npy
blinks.pldata

# Fixation Detector (optional)
fixations_timestamps.npy
fixations.pldata

# Surface Tracker (optional)
surface_definitions
surface_definitions_v01

# User Info (optional)
user_info.csv
```

## Pupil Mobile

::: warning
Warning: Pupil Mobile Android app is no longer actively maintained.
:::

```py
# Meta File (required)
info.csv

# Video Files (required)
# (Names and extensions can vary depending on configuration)
Pupil Cam1 ID2.mjpeg
Pupil Cam1 ID2.time

Pupil Cam2 ID0.mjpeg
Pupil Cam2 ID0.time

Pupil Cam2 ID1.mjpeg
Pupil Cam2 ID1.time

# Audio Capture (optional)
audio_00010000.mp4
audio_00010000.time

# Inertial Measurement Unit (IMU) Files (optional)
imu_00020000.imu
imu_00020000.time

# Bluethooth Keyboard Presses (Optional)
key_00040000.key
key_00040000.time

# Geographic Data (optional)
location_00080000.loc
location_00080000.time
```
