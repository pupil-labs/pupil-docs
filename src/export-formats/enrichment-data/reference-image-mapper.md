---
permalink: /export-formats/enrichment-data/reference-image-mapper
description: Documentation of the exact export formats of Pupil Cloud.
---

# Reference Image Mapper

## gaze.csv
This file contains all the mapped gaze data from all sections.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze detected in reference image** | Boolean indicating whether or not the gaze point was detected inside or outside of the reference image.     |
| **gaze position in reference image x [px]** | Float value representing the x-coordinate of the mapped gaze point in pixel coordinates. If the reference image was not detected in the scene at the given time this value is empty.     |
| **gaze position in reference image y [px]** | Same as "gaze position in reference image x [px]" but for the y-coordinate.     |
| **fixation id** | If this gaze sample belongs to a fixation event, this is the corresponding id of the fixation. Otherwise, this field is empty.     |
| **blink id** | If this gaze samples belongs to a blink event, this is the corresponding id of the blink. Otherwise this field is empty.     |

## fixations.csv
This file contains fixation events detected in the gaze data stream and mapped to the reference image.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **fixation id** | Identifier of fixation within the section. The id corresponds to the fixation id of the raw unmapped data.    |
| **start timestamp [ns]** | UTC timestamp in nanoseconds of the start of the fixation.     |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the fixation.     |
| **duration [ms]** | Duration of the fixation in milliseconds.     |
| **fixation detected in reference image** | Boolean indicating whether or not the fixation was inside or outside of the reference image.    |
| **fixation x [px]** | Float value representing the x-coordinate of the fixation in reference image coordinates. This position is the average of all mapped gaze samples within the fixation.     |
| **fixation y [px]** | Same as "fixation x [px]" but for the y-coordinate.     |

## Reference Image
The reference image that was used for defining the enrichment. The file is named `reference_image.jpeg|png`.