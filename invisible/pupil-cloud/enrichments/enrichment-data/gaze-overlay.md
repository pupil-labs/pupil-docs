---
permalink: /export-formats/enrichment-data/gaze-overlay
description: Documentation of the exact export formats of Pupil Cloud.
---

## Gaze Overlay

#### Video Files
The export will have one folder per original recording using the following naming scheme:
```<recording name>-<start of recording ID>```

Each folder contains gaze overlay videos of the sections belonging to the corresponding recordings. The video files are named
```<beginning of section ID>_<start time>-<end time>.mp4```
where the times are in seconds relative to the recording start.