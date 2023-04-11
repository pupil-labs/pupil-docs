---
permalink: /export-formats/enrichment-data/marker-mapper
description: Documentation of the exact export formats of Pupil Cloud.
---

# Marker Mapper

## gaze.csv
This file contains all the mapped gaze data from all sections. The coordinate system is explained [here](/invisible/enrichments/#surface-coordinates).

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze detected on surface** | Boolean indicating whether or not the gaze point was inside or outside of the surface.     |
| **gaze position on surface x [normalized]** | Float value representing the x-coordinate of the mapped gaze point in surface coordinates. If the surface was not localized this value is empty.     |
| **gaze position on surface y [normalized]** | Same as gaze position on surface x [normalized] but for y-coordinate.     |
| **fixation id** | If this gaze sample belongs to a fixation event, this is the corresponding id of the fixation. Otherwise, this field is empty.     |
| **blink id** | If this gaze samples belongs to a blink event, this is the corresponding id of the blink. Otherwise this field is empty.     |

## fixations.csv
This file contains fixation events detected in the gaze data stream and mapped to the surface.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **fixation id** | Identifier of fixation within the section. The id corresponds to the fixation id of the raw unmapped data.    |
| **start timestamp [ns]** | UTC timestamp in nanoseconds of the start of the fixation.     |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the fixation.     |
| **duration [ms]** | Duration of the fixation in milliseconds.     |
| **fixation detected on surface** | Boolean indicating whether or not the fixation was inside or outside of the surface.    |
| **fixation x [normalized]** | Float value representing the x-coordinate of the fixation in surface coordinates. This position is the average of all mapped gaze samples within the fixation.     |
| **fixation y [normalized]** | Same as "fixation x [normalized]" but for the y-coordinate.     |

## aoi_positions.csv
This file contains the surface locations in the scene images for all sections.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the scene camera frame the marker detection was executed on.     |
| **detected markers** | A list of the markers detected in the corresponding scene camera frame. Markers are represented by their ID and the list is separated by `;`. Added in version 2 of this enrichment.    |
| **tl x/y [px]** | x or y coordinate respectively of the **t**op **l**eft corner. Empty in case the surface could not be localized. Added in version 2 of this enrichment.   |
| **tr x/y [px]** | x or y coordinate respectively of the **t**op **r**ight corner. Empty in case the surface could not be localized. Added in version 2 of this enrichment.   |
| **br x/y [px]** | x or y coordinate respectively of the **b**ottom **r**ight corner. Empty in case the surface could not be localized. Added in version 2 of this enrichment.   |
| **bl x/y [px]** | x or y coordinate respectively of the **b**ottom **l**eft corner. Empty in case the surface could not be localized. Added in version 2 of this enrichment.   |