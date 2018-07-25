+++
date = "2018-07-19T17:45:00+01:00"
title = "recording format"
section_weight = 4
page_weight = 4
+++

## Recording Format

### Required Files

```csv
key,value
Recording Name,2018_07_19
Start Date,19.07.2018
Start Time,14:56:21
Start Time (System),1532004981.666572
Start Time (Synced),701730.897108953
Duration Time,00:00:13
World Camera Frames,402
World Camera Resolution,1280x720
Capture Software Version,1.7.159
Data Format Version,1.8
System Info,"User: name, Platform: Linux, ..."
```

Each recording requires three files:
1. An `info.csv` file that includes two columns -- `key` and `value`. (See left for eaxample)
2. At least one video file and its corresponding timestamp file. See the [*Video Files*](#video-files) section below for details.

A minimum requirement of two key, value pairs are required in the `info.csv` file.
1. `Recording Name,<name>`
2. `Data Format Version,<version>`

### Data Files

#### Timestamp Files
Timestamp files must follow this strict naming convention:
Given that a data file is named `<name>.<ext>` then its timestamps file has to be named `<name>_timestamps.npy`.

Timestamp files are saved in the [NPY binary format](https://docs.scipy.org/doc/numpy/neps/npy-format.html). You can use [`numpy.load()`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.load.html#numpy.load) to access the timestamps in Python.

A datum and its timestamp have the same index within their respective files, i.e. the `i`th timestamp in `world_timestamps.npy` belongs to the `i`th video frame in `world.mp4`.

#### Video Files
Video files are only recognized if they comply with the following constraints:

Allowed video file extentions are:
- `.mp4`
- `.mkv`
- `.avi`
- `.h264`
- `.mjpeg`

Allowed video file names are:
- `world`: Scene video
- `eye0`: Right eye video
- `eye1`: Left eye video

### Audio File
An audio file is only recognized in Pupil Player's playback plugin if the file is named `audio.mp4`.

### `pldata` Files
These files contain a sequence of independently msgpack-encoded messages. Each message consists of two frames:
1. frame: The payload's topic as a string, e.g. `"pupil.0"`
2. frame: The payload, e.g. a pupil datum, encoded as msgpack

For clarification: The second frame is encoded twice!

Pupil Player decodes the messages into [`file_methods.Serialized_Dict`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L209)s. Each `Serialized_Dict` instance holds the serialized second frame and is responsible for decoding it on demand. The class is designed such that there is a maximum number of decoded frames at the same time. This prevents Pupil Player from using excessive amounts of memory.

You can use [`file_methods.PLData_Writer`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L138) and [`file_methods.load_pldata_file()`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L111) to read and write `pldata` files.

### Other Files
Files without file extention, e.g. the deprecated `pupil_data` file, and files with a `.meta` extention are msgpack-encoded dictionaries. They can be read and written using [`file_methods.load_object()` and `file_methods.save_object()`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L57-L87) and do *not* have a corresponding timestamps file.
