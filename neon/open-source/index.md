# Open-Source
Pupil Labs in mainting a number of open-source tools and libraries [on GitHub](https://github.com/pupil-labs) to support the Neon ecosystem. These range from the well-known Neon Player software and Real-Time API clients to lower-level libraries handling and processing eye-tracking data.

In addition to these actively maintained projects, we have also published a number of experimental open-source tools in the [AlphaLab](https://docs.pupil-labs.com/alpha-lab).

The following is a list of the most important projects roughly ordered from low-level libs to high-level applications.


## pl-camera
[pl-camera](https://github.com/pupil-labs/pl-camera) allows using camera intrinsic values to perform various tasks related to camera projection, including undistorting images and points. It's a wrapper around OpenCV's camera model functionality, with a more intuitive API and a few hacks for improved computational efficiency.

## pl-video
[pl-video]() is a high-level wrapper around PyAV / FFmpeg for handling video files. It provides a simple API for reading and writing video files, and in particular allows efficient indexing of individual frames in videos.

## pl-neon-recording
[pl-neon-recording](https://github.com/pupil-labs/pl-neon-recording) contains functionality for reading Neon recordings in the native binary format used by the Neon Companion app. It provides easy access to all contained scalar and video data.

Alternatively to reading the native binary format with this library, Neon recordings can also be exported to CSV using Pupil Cloud or Neon Player.


Example usage:
```python
from pupil_labs import neon_recording as nr

recording = nr.open("path/to/recording_folder")

print(f"Start time (ns): {recording.start_time}")
print(f"Wearer: {recording.wearer['name']}")

# Access the 100th gaze sample
gaze = recording.gaze.point[100]

# Get matching scene video frames and gaze samples
data = zip(
    recording.scene,
    recording.gaze.sample(recording.scene.time),
)
for scene_frame, gaze_sample in data:
    print(f"Scene frame at {scene_frame.time} ns has gaze point {gaze_sample.point}")

```



## pl-neon-usb
[pl-neon-usb]() allows interfacing with the Neon eye and scene cameras over USB.

## pl-aac
[pl-aac]() is implementing an AAC (Assistive and Alternative Communication) tool that allows using Neon for gaze typing. It implements a range of different interaction designs including traditional dwell-time based typing, as well as more advanced methods such as the "Dasher" or "Context Switching".

## Real-Time API Clients
All our Real-Time API clients are open-source and could be used as a reference for building your own client applications. Find their documentation [here](/real-time-api/).

## Neon Player