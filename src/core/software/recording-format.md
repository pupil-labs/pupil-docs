---
permalink: /core/software/recording-format
description: Pupil Core recording format. Learn about the files contained within a Pupil Core recording. 
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
