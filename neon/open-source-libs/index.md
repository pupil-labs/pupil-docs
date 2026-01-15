# Open-Source Libraries
Pupil Labs in mainting a number of open-source tools and libraries [on GitHub](https://github.com/pupil-labs) to support the Neon ecosystem. These range from the well-known Neon Player software and Real-Time API clients to lower-level libraries handling and processing eye-tracking data.

In addition to these actively maintained projects, we have also published a number of experimental open-source tools in the [AlphaLab](https://docs.pupil-labs.com/alpha-lab).

The following is a list of the most important projects roughly ordered from low-level libs to high-level applications.


## pl-camera
[pl-camera](https://pupil-labs.github.io/pl-camera/latest/) allows using camera intrinsic values to perform various tasks related to camera projection, including undistorting images and points. It's a wrapper around OpenCV's camera model functionality, with a more intuitive API and a few hacks for improved computational efficiency.

## pl-video
[pl-video](https://pupil-labs.github.io/pl-video/latest/) is a high-level wrapper around PyAV / FFmpeg for handling video files. It provides a simple API for reading and writing video files, and in particular allows efficient indexing of individual frames in videos.

## pl-neon-recording
[pl-neon-recording](https://pupil-labs.github.io/pl-neon-recording/latest/) contains functionality for reading Neon recordings in the native binary format used by the Neon Companion app. It provides easy access to all contained scalar and video data.

Alternatively to reading the native binary format with this library, Neon recordings can also be exported to CSV using Pupil Cloud or Neon Player.

## pl-neon-usb
[pl-neon-usb](https://pupil-labs.github.io/pl-neon-usb/latest/) allows interfacing with the Neon eye and scene cameras over USB, allowing to stream images, modify exposure settings, and obtain camera intrinsics values.

## pl-marker-mapper
[pl-marker-mapper](https://pupil-labs.github.io/pl-marker-mapper/latest/) is an implemenation of the marker-based gaze mapping tool also available in Pupil Cloud via the Marker Mapper enrichment and in Neon Player via the Marker Mapper plugin. It uses AprilTags to mark and track a planar surface (e.g. a screen, poster, or magazine page) in the scene camera video, and maps gaze points to coordinates on that surface. This implementation allows offline and real-time mapping of gaze points using recorded or live data.

## Real-Time API Clients
All our Real-Time API clients are open-source and could be used as a reference for building your own client applications. Find their documentation [here](/real-time-api/).

Clients are available for several programming languages:
- [Python](https://pupil-labs.github.io/pl-realtime-api/dev/)
- [C++](https://github.com/pupil-labs/pl-realtime-cpp-client)
- [Unity3D C#](https://docs.pupil-labs.com/neon/neon-xr/neon-xr-core-package/)
- [Matlab](https://github.com/pupil-labs/pl-neon-matlab)

## Neon Player
[Neon Player](/neon-player/) is a cross-platform desktop application for playing back, analysing, and exporting Neon recordings. It contains gaze mapping and visualization tools, and features a powerful plugin system allowing users to extend its functionality. The source code is available on [GitHub](https://github.com/pupil-labs/neon-player).
