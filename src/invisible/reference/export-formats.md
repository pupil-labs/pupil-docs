---
description: TODO
---

# Export Formats

## Raw Data Exporter

#### sections.csv
This file contains an overview of the sections that were generated from this enrichment.

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the section.     |
| **recording id** | Unique identifier of the recording this section belongs to.     |
| **recording name** | Name of the recording this section belongs to.     |
| **wearer id** | Unique identifier of the wearer used in the corresponding recording.     |
| **section start time [ns]** | Timestamp corresponding to the start event of the section. Given as UTC timestamp in nanoseconds.     |
| **section end time [ns]** | Timestamp corresponding to the end event of the section. Given as UTC timestamp in nanoseconds.     |
| **start event name** | Name of the start event of the section.     |
| **end event name** | Name of the end event of the section.     |


#### Recording Data
The export contains one folder per recording following this naming scheme:
```<recording name>-<start of recording ID>```
The files included in every folder are described in the following.

#### info.json
This file contains meta-information on the recording.

| Field | Description | 
| -------- | -------- | 
| **android_device_id** | Unique identifier of the Android device used as Invisible Companion.     |
| **android_device_model** | Model name of the Companion device.     |
| **android_device_name** | Device name of the Companion device.     |
| **app_version** | Version of the Companion app used to make the recording. |
| **calib_version** | Version of the offset correction used by the Companion app. |
| **data_format_version** | Version of the data format used by the Companion app.     |
| **duration** | Duration of the recording in nanoseconds|
| **gaze_offset** | Gaze offset applied to this recording using the offset correction. Values are in pixels.|
| **glasses_serial_number** | Serial number of the Pupil Invisible glasses used for the recording. |
| **pipeline_version** | Version of the gaze estimation pipeline used by the Companion app. |
| **recording_id** | Unique identifier of the recording. |
| **scene_camera_serial_number** | Serial number of the scene camera used for the recording. |
| **start_time** | Timestamp of when the recording was started. Given as UTC timestamp in nanoseconds. |
| **template_data** | Data regarding the selected template for the recording as well as the response values. |
| **wearer_id** | Unique identifier of the wearer selected for this recording. |
| **wearer_name** | Name of the wearer selected for this recording. |

**Scene Video**
Scene video is contained in a file following the following naming scheme:
```<beginning of section ID>_<section start time>-<section end time>.mp4```


#### world_timestamps.csv
This file contains the timestamps of every world video frame.

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the corresponding world frame. |


#### events.csv
This file contains project event annotations and real-time [recording events](/developer/invisible/#recording-events "Documentation on recordings events in real-time using recording events").

| Field | Description | 
| -------- | -------- | 
| **recording id** | Unique identifier of the recording this event belongs to.     |
| **timestamp [ns]** | UTC timestamp of the event. |
| **name** | Name of the event.     |
| **type** | Type of the event. Possible values: project, recording     |


#### gaze.csv
This file contains gaze data in world camera coordinates. For a definition of the coordinate system see [here](/developer/invisible/#gaze-coordinate-system "Explanation of Pupil Invisible's gaze coordinate system").


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze x [px]** | Float value representing the x-coordinate of the mapped gaze point in world camera pixel coordinates.
| **gaze y [px]** | Same as "gaze x [px]" but for the y-coordinate.     |
| **worn** | This value indicates whether the Pupil Invisible Glasses have been worn by a subject at this point in time. `1.0` indicates that it has been worn, while `0.0` indicates that is has not been. Added in version 2 of this enrichment.    |
| **fixation id** | If this gaze samples belongs to a fixation event, this is the corresponding id of the fixation. Otherwise this field is empty.     |


#### fixations.csv
This file contains fixations detected in the gaze data stream.
The corresponding gaze samples that belong to each fixation can be determined from the `gaze.csv` file using the `fixation id` fields.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **fixation id** | Identifier of the fixation. The counter starts at the beginning of the recording.     |
| **start timestamp [ns]** | UTC timestamp in nanoseconds of the start of the fixation.     |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the fixation.     |
| **duration [ms]** | Duration of the fixation in milliseconds.     |
| **fixation x [px]** | Float value representing the x-coordinate of the fixation in world camera pixel coordinates. This position is the average of all gaze samples within the fixation.     |
| **fixation y [px]** | Same as "fixation x [px]" but for the y-coordinate.     |


#### imu.csv

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample.    |
| **gyro x [deg/s]**<br />**gyro y [deg/s]**<br />**gyro z [deg/s]** | Rotation speed around x, y or z-axis respectively in degrees/s.    |
| **acceleration x [G]**<br />**acceleration y [G]**<br />**acceleration z [G]** | Translational acceleration along the x, y or z-axis respectively in G. Note `1 G = 9.80665 m/s^2`.|
| **roll** | Drift-free estimation of the roll (head tilt from side to side) in degrees. The output range is -180 to +180 degrees. Added in version 2 of this enrichment.    |
| **pitch** | Drift-free estimation of the pitch (head tilt from front to back) in degrees. The output range is -180 to +180 degrees. Added in version 2 of this enrichment. |


## Marker Mapper

#### sections.csv 
This file contains an overview of the sections that were generated from this enrichment.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the section.     |
| **recording id** | Unique identifier of the recording this section belongs to.     |
| **recording name** | Name of the recording this section belongs to.     |
| **wearer id** | Unique identifier of the wearer used in the corresponding recording.     |
| **section start time [ns]** | Timestamp corresponding to the start event of the section. Given as UTC timestamp in nanoseconds.     |
| **section end time [ns]** | Timestamp corresponding to the end event of the section. Given as UTC timestamp in nanoseconds.     |
| **start event name** | Name of the start event of the section.     |
| **end event name** | Name of the end event of the section.     |


#### gaze.csv
This file contains all the mapped gaze data from all sections. The coordinate system is explained [here](#surface-coordinates "Explanation of the coordinate system of the Marker Mapper's surfaces").

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze detected on surface** | Boolean indicating whether or not the gaze point was inside or outside of the surface.     |
| **gaze position on surface x [normalized]** | Float value representing the x-coordinate of the mapped gaze point in surface coordinates. If the surface was not localized this value is empty.     |
| **gaze position on surface y [normalized]** | Same as gaze position on surface x [normalized] but for y-coordinate.     |
| **fixation id** | If this gaze samples belongs to a fixation event, this is the corresponding id of the fixation. Otherwise this field is empty.     |

#### fixations.csv
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

#### aoi_positions.csv
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


## Reference Image Mapper

#### sections.csv
This file contains an overview of the sections that were generated from this enrichment.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the section.     |
| **recording id** | Unique identifier of the recording this section belongs to.     |
| **recording name** | Name of the recording this section belongs to.     |
| **wearer id** | Unique identifier of the wearer used in the corresponding recording.     |
| **section start time [ns]** | Timestamp corresponding to the start event of the section. Given as UTC timestamp in nanoseconds.     |
| **section end time [ns]** | Timestamp corresponding to the end event of the section. Given as UTC timestamp in nanoseconds.     |
| **start event name** | Name of the start event of the section.     |
| **end event name** | Name of the end event of the section.     |


#### gaze.csv
This file contains all the mapped gaze data from all sections.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze detected in reference image** | Boolean indicating whether or not the gaze point was detected inside or outside of the reference image.     |
| **gaze position in reference image x [px]** | Float value representing the x-coordinate of the mapped gaze point in pixel coordinates. If the reference image was not detected in the scene at the given time this value is empty.     |
| **gaze position in reference image y [px]** | Same as "gaze position in reference image x [px]" but for the y-coordinate.     |
| **fixation id** | If this gaze samples belongs to a fixation event, this is the corresponding id of the fixation. Otherwise this field is empty.     |

#### fixations.csv
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

#### Reference Image
The reference image was used for defining the enrichment. The file is named `reference_image.jpeg|png`


## Face Mapper

#### sections.csv
This file contains an overview of the sections that are generated by this enrichment.

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the section.     |
| **recording id** | Unique identifier of the recording this section belongs to.     |
| **recording name** | Name of the recording this section belongs to.     |
| **wearer id** | Unique identifier of the wearer used in the corresponding recording.     |
| **section start time [ns]** | Timestamp corresponding to the start event of the section. Given as UTC timestamp in nanoseconds.     |
| **section end time [ns]** | Timestamp corresponding to the end event of the section. Given as UTC timestamp in nanoseconds.     |
| **start event name** | Name of the start event of the section.     |
| **end event name** | Name of the end event of the section.     |

#### face_positions.csv
This file contains all the individual face detections.

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the corresponding world camera frame timestamp. If multiple faces have been detected in the same scene video frame, each face is reported in a separate row with the same timestamp.     |
| **p1 x [px]** | x-coordinate of the starting point of the bounding box rectangle.     |
| **p1 y [px]** | y-coordinate of the starting point of the bounding box rectangle.     |
| **p2 x [px]** | x-coordinate of the ending point of the bounding box rectangle.     |
| **p2 y [px]** | y-coordinate of the ending point of the bounding box rectangle.     |
| **eye left x [px]** | X coordinate of the left eye in image coordinates in pixels.	|	
| **eye left y [px]** | Y coordinate of the left eye in image coordinates in pixels.	|
|	**eye right x [px]** | X coordinate of the right eye in image coordinates in pixels.	|
| **eye right y [px]** | Y coordinate of the right eye in image coordinates in pixels.	|
| **nose x [px]** | X coordinate of the nose in image coordinates in pixels. |
|	**nose y [px]** | Y coordinate of the nose in image coordinates in pixels. | 
|	**mouth left x [px]** | X coordinate of the left mouth corner in image coordinates in pixels. |
|	**mouth left y [px]** | Y coordinate of the left mouth corner in image coordinates in pixels. |
|	**mouth right x [px]** | X coordinate of the right mouth corner in image coordinates in pixels. |
|	**mouth right y [px]** | Y coordinate of the right mouth corner in image coordinates in pixels. |

#### gaze_on_face.csv
This file indicates which gaze samples are on faces (within the bounding box of detected faces).

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the corresponding gaze sample.     |
| **gaze on face** | Boolean indicating whether the gaze point is on a face.     |

#### fixations_on_face.csv
This file indicates which fixations are on faces (within the bounding box of detected faces).

| Field | Description | 
| -------- | -------- | 
| **fixation id** | Identifier of the fixation event.     |
| **fixation on face** | Boolean indicating whether the fixation is on a face.     |


## Gaze Overlay

#### sections.csv
This file contains an overview of the sections that were generated from this enrichment.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the section.     |
| **recording id** | Unique identifier of the recording this section belongs to.     |
| **recording name** | Name of the recording this section belongs to.     |
| **wearer id** | Unique identifier of the wearer used in the corresponding recording.     |
| **section start time [ns]** | Timestamp corresponding to the start event of the section. Given as UTC timestamp in nanoseconds.     |
| **section end time [ns]** | Timestamp corresponding to the end event of the section. Given as UTC timestamp in nanoseconds.     |
| **start event name** | Name of the start event of the section.     |
| **end event name** | Name of the end event of the section.     |


#### Video Files
The export will have one folder per original recording using the following naming scheme:
```<recording name>-<start of recording ID>```

Each folder contains gaze overlay videos of the sections belonging to the corresponding recordings. The video files are named
```<beginning of section ID>_<start time>-<end time>.mp4```
where the times are in seconds relative to the recording start.



## Binary Recording Data
If you download recording data straight off of the phone without uploading to Pupil Cloud first, you will receive raw binary data. This data is difficult to handle and we do not recommend you use it directly. If using Pupil Cloud is not an option for you, please export the data via Pupil Player to convenient formats instead (see [Transfer Recordings via USB](src\invisible\how-tos\tools\transfer-recordings-via-usb.md)).

You can find the format documentation of the raw binary data [here](https://docs.google.com/spreadsheets/d/1e1Xc1FoQiyf_ZHkSUnVdkVjdIanOdzP0dgJdJgt0QZg/edit?usp=sharing). Please note that the raw data format may change without advance notification.