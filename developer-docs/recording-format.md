+++
date = "2018-07-19T17:45:00+01:00"
title = "recording format"
section_weight = 4
page_weight = 4
+++

## Recording Format

### Required Files

> Example `info.csv` file
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
1. An `info.csv` file that includes two columns -- `key` and `value`.
2. At least one video file and its corresponding timestamp file. See the [*Video Files*](#video-files) section below for details.

A minimum requirement of two key, value pairs are required. Example:
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
