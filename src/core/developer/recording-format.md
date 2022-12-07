---
permalink: /developer/core/recording-format
description: We recommend reading the format thoroughly if you want to develop software that creates recordings on its own, or processes existing recordings without having to open them in Pupil Player.
---

# Recording Format

This section outlines the Pupil Player recording format. We recommend reading it
thoroughly if you want to develop software that creates recordings on its own,
or processes existing recordings without having to open them in Pupil Player.

## Meta Files

Meta files are essential for Pupil Player. Without them, Pupil Player is not able to
recognize a directory as a Pupil Recording.

The [Pupil Player Recording Format 2.0](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/pupil_recording/README.md)—introduced in version `v1.16`—requires the meta info file to be named `info.player.json`.
See its [specification](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/pupil_recording/README.md) for details.

::: tip
<v-icon large color="info">info_outline</v-icon>
Pupil Invisible recordings have their own meta file definitions:
`info.csv` and `info.json`. When opened in Pupil Player, the meta info file
will be transformed the Pupil Player Recording Format 2.0.
:::

## Timestamp Files
Timestamp files must follow this strict naming convention:
Given that a data file is named `<name>.<ext>` then its timestamps file has to be named `<name>_timestamps.npy`.

Timestamp files are saved in the [NPY binary format](https://numpy.org/doc/stable/reference/generated/numpy.lib.format.html#module-numpy.lib.format). You can use [`numpy.load()`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.load.html#numpy.load) to access the timestamps in Python.

A datum and its timestamp have the same index within their respective files, i.e. the `i`th timestamp in `world_timestamps.npy` belongs to the `i`th video frame in `world.mp4`.

## Video Files
Video files are only recognized if they comply with the following constraints:

Allowed video file extensions are:

- `.mp4`
- `.mkv`
- `.avi`
- `.h264`
- `.mjpeg`

Allowed video file names are:

- `world`: Scene video
- `eye0`: Right eye video
- `eye1`: Left eye video

The video files should look like:

- `world.mp4`, `eye0.mjpeg`, `eye1.mjpeg`

We also support multiple parts of video files as input. For instance:

- `world.mp4`, `world_001.mp4`, `world_002.mp4`, ...
- `eye0.mjpeg`, `eye0_001.mjpeg`

And their corresponding timestamp files should follow the pattern:

- `world_timestamps.npy`, `world_001_timestamps.npy`, `world_002_timestamps.npy`, ...

### Video Player Compatibility

In order to open the video files with the majority of video players, you will have to
**transcode the video stream encoding from mjpeg to h264** and **change the color format
from yuvj422p to yuv420p**. You can use the following [ffmpeg](https://ffmpeg.org/ "FFmpeg - software solution for recording, converting, and streaming audio and video")
command to perform this transcoding:

```
ffmpeg -i world.mp4 -vf format=yuv420p world_compatible.mp4
```

## Audio File
An audio file is only recognized in Pupil Player's playback plugin if the file is named
`audio.mp4` and there is a corresponding `audio_timestamps.npy` file containing the
correct audio timestamps.

## `pldata` Files
These files contain a sequence of independently msgpack-encoded messages. Each message consists of two frames:
1. frame: The payload's topic as a string, e.g. `"pupil.0"`
2. frame: The payload, e.g. a pupil datum, encoded as msgpack

For clarification: The second frame is encoded twice!

Pupil Player decodes the messages into [`file_methods.Serialized_Dict`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L209)s. Each `Serialized_Dict` instance holds the serialized second frame and is responsible for decoding it on demand. The class is designed such that there is a maximum number of decoded frames at the same time. This prevents Pupil Player from using excessive amounts of memory.

You can use [`file_methods.PLData_Writer`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L138) and [`file_methods.load_pldata_file()`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L111) to read and write `pldata` files.

## Other Files
Files without file extension, e.g. the deprecated `pupil_data` file, and files with a `.meta` extension are msgpack-encoded dictionaries. They can be read and written using [`file_methods.load_object()` and `file_methods.save_object()`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L57-L87) and do *not* have a corresponding timestamps file.
