---
permalink: /neon/reference/export-formats
description: Documentation of the exact export formats of Pupil Cloud.
---

# Export Formats

## General Information
All [enrichments](/neon/enrichments) are defined on specific sections of recordings using events. Every enrichment export contains a `sections.csv` file summarizing the available sections as follows:

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

Further, every enrichment export contains a file called `enrichment_info.txt`, which contains the name of the enrichment type, a link to the appropriate documentation, and the version of the enrichment that was used.

## Raw Data Exporter

#### Recording Folders
The export contains one folder per recording following this naming scheme:
```<recording name>-<start of recording ID>```
The files included in every folder are described in the following.

#### info.json
This file contains meta-information on the recording.

[TODO: Confirm naming of serial frame id and frame name]

| Field | Description | 
| -------- | -------- | 
| **android_device_id** | Unique identifier of the Android device used as Companion.     |
| **android_device_model** | Model name of the Companion device.     |
| **android_device_name** | Device name of the Companion device.     |
| **app_version** | Version of the Neon Companion app used to make the recording. |
| **calib_version** | Version of the offset correction used by the Neon Companion app. |
| **data_format_version** | Version of the data format used by the Neon Companion app.     |
| **duration** | Duration of the recording in nanoseconds|
| **frame_id** | Number identifying the type of frame used for this recording, e.g. 1 for "Just act natural". |
| **frame_name** | Name of the frame used for this recording. |
| **gaze_offset** | Gaze offset applied to this recording using the offset correction. Values are in pixels.|
| **module_serial_number** | Serial number of the Neon module used for the recording. This number is encoded in the QR code on the back of the Neon module. |
| **os_version** | Version of the Android OS that was installed on the recording Companion device. |
| **pipeline_version** | Version of the gaze estimation pipeline used by the Neon Companion app. |
| **recording_id** | Unique identifier of the recording. |
| **start_time** | Timestamp of when the recording was started. Given as UTC timestamp in nanoseconds. |
| **template_data** | Data regarding the selected template for the recording as well as the response values. |
| **wearer_id** | Unique identifier of the wearer selected for this recording. |
| **wearer_name** | Name of the wearer selected for this recording. |
| **workspace_id** | The ID of the Pupil Cloud workspace this recording has been assigned to. |


**Scene Video**
Scene video is contained in a file following the following naming scheme:
```<beginning of section ID>_<section start time>-<section end time>.mp4```

#### scene_camera.json
This file contains the camera intrinsics of the used scene camera. The values are determined via calibration of every camera during manufacturing.

[TODO: Confirm that the serial will be included in both scene_camera.json and info.json]

| Field | Description | 
| -------- | -------- | 
| **camera_matrix** | The camera matrix of the scene camera.     |
| **dist_coefs** | The distortion coefficients of the scene camera. The order of the values is `(k1, k2, p1, p2, k3, k4, k5, k6)` following [OpenCV's distortion model](https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html#ga3207604e4b1a1758aa66acb6ed5aa65d). |
| **serial_number** | Serial number of Neon module used for the recording. This number is encoded in the QR code on the back of the Neon module.      |
| **version** | The version of the intrinsics data format.     |



#### world_timestamps.csv
This file contains the timestamps of every world video frame.

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the corresponding world frame. |


#### events.csv
This file contains [event](/neon/basic-concepts/events) data for all recordings. It contains both project event annotations and real-time recording events.

| Field | Description | 
| -------- | -------- | 
| **recording id** | Unique identifier of the recording this event belongs to.     |
| **timestamp [ns]** | UTC timestamp of the event. |
| **name** | Name of the event.     |
| **type** | Type of the event. Possible values: project, recording     |


#### gaze.csv
This file contains [gaze](/neon/basic-concepts/data-streams/#gaze) data in world camera coordinates.

[TODO: Confirm that worn data will be available]


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze x [px]** | Float value representing the x-coordinate of the mapped gaze point in world camera pixel coordinates.
| **gaze y [px]** | Same as "gaze x [px]" but for the y-coordinate.     |
| **worn** | These values indicate whether Neon has been worn by a subject at the respective point in time. `1.0` indicates that it has been worn, while `0.0` indicates that it has not been worn.    |
| **fixation id** | If this gaze sample belongs to a fixation event, this is the corresponding id of the fixation. Otherwise, this field is empty.     |
| **blink id** | If this gaze samples belongs to a blink event, this is the corresponding id of the blink. Otherwise this field is empty.     |
| **azimuth [deg]** | The [azimuth](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray in relation to the scene camera in degrees.     |
| **elevation [deg]** | The [elevation](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray in relation to the scene camera in degrees.     |


#### fixations.csv
This file contains [fixations](/neon/basic-concepts/data-streams/#fixations) detected in the gaze data stream.
The corresponding gaze samples that belong to each fixation can be determined from the `gaze.csv` file using the `fixation id` field.


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
| **azimuth [deg]** | The [azimuth](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray corresponding to the fixation location in relation to the scene camera in degrees.     |
| **elevation [deg]** | The [elevation](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray corresponding to the fixation location in relation to the scene camera in degrees.     |

#### blinks.csv
This file contains [blinks](/neon/basic-concepts/data-streams/#blinks) detected in the eye video.
The corresponding gaze samples that belong to each blink can be determined from the `gaze.csv` file using the `blink id` field.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **blink id** | Identifier of the blink. The counter starts at the beginning of the recording.     |
| **start timestamp [ns]** | UTC timestamp in nanoseconds of the start of the blink.     |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the blink.     |
| **duration [ms]** | Duration of the blink in milliseconds.     |

#### imu.csv
This file contains data recorded by the integrated [IMU](/neon/basic-concepts/data-streams/#inertial-measurements) (inertial measurement unit).

[TODO: Upadate export format]

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample.    |
| **gyro x [deg/s]**<br />**gyro y [deg/s]**<br />**gyro z [deg/s]** | Rotation speed around x, y or z-axis respectively in degrees/s.    |
| **acceleration x [G]**<br />**acceleration y [G]**<br />**acceleration z [G]** | Translational acceleration along the x, y or z-axis respectively in G. Note `1 G = 9.80665 m/s^2`.|
| **roll** | Drift-free estimation of the roll (head tilt from side to side) in degrees. The output range is -180 to +180 degrees. Added in version 2 of this enrichment.    |
| **pitch** | Drift-free estimation of the pitch (head tilt from front to back) in degrees. The output range is -180 to +180 degrees. Added in version 2 of this enrichment. |
| **rotation vector w**<br />**rotation vector x**<br />**rotation vector  y**<br />**rotation vector  z** | Quaternion describing the rotation of the Neon module. |


## Marker Mapper

#### gaze.csv
This file contains all the mapped gaze data from all sections. The coordinate system is explained [here](/neon/enrichments/#surface-coordinates).

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

#### surface_positions.csv
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
| **fixation id** | If this gaze sample belongs to a fixation event, this is the corresponding id of the fixation. Otherwise, this field is empty.     |
| **blink id** | If this gaze samples belongs to a blink event, this is the corresponding id of the blink. Otherwise this field is empty.     |

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
The reference image that was used for defining the enrichment. The file is named `reference_image.jpeg|png`.


## Face Mapper

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

#### Video Files
The export will have one folder per original recording using the following naming scheme:
```<recording name>-<start of recording ID>```

Each folder contains gaze overlay videos of the sections belonging to the corresponding recordings. The video files are named
```<beginning of section ID>_<start time>-<end time>.mp4```
where the times are in seconds relative to the recording start.



## Binary Recording Data

[TODO: Update this section]

If you download recording data straight off of the phone without uploading to Pupil Cloud first, you will receive raw binary data. This data is difficult to handle and we do not recommend you use it directly. If using Pupil Cloud is not an option for you, please [export the data via Pupil Player](/core/software/pupil-player/#export) to convenient formats instead. Note that the formats used by Pupil Player are not the same as in Pupil Cloud.

You can find the format documentation of the raw binary data [here](https://docs.google.com/spreadsheets/d/1e1Xc1FoQiyf_ZHkSUnVdkVjdIanOdzP0dgJdJgt0QZg/edit?usp=sharing). Please note that the raw data format may change without advance notification.
