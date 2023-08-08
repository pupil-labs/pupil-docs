---
permalink: /export-formats/recording-data/invisible
description: Documentation of the exact export formats of Pupil Cloud.
---

# Pupil Invisible Recording Format

## Recording Folders
The export contains one folder per recording following this naming scheme:
```<recording name>-<start of recording ID>```
The files included in every folder are described in the following.

## info.json
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

## scene_camera.json
This file contains the camera intrinsics of the used scene camera. The values are determined via calibration of every camera during manufacturing.

| Field | Description | 
| -------- | -------- | 
| **camera_matrix** | The camera matrix of the scene camera.     |
| **dist_coefs** | The distortion coefficients of the scene camera. The order of the values is `(k1, k2, p1, p2, k3, k4, k5, k6)` following [OpenCV's distortion model](https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html#ga3207604e4b1a1758aa66acb6ed5aa65d). |
| **rotation_matrix** | Extrinsic rotation matrix describing how the scene camera is positioned in relation to the eye cameras. For more details please see section III-B of the [white paper](https://arxiv.org/pdf/2009.00508.pdf).     |
| **serial_number** | The serial number of the scene camera. This number can also be found on the back of the scene camera module. Please note that this number is different from the serial number of the frame, which can be found on the tip of the left temple of the Pupil Invisible frame.     |
| **version** | The version of the intrinsics data format.     |



#### world_timestamps.csv
This file contains the timestamps of every world video frame.

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the corresponding world frame. |


## events.csv
This file contains [event](/invisible/basic-concepts/events) data for all recordings. It contains both project event annotations and real-time recording events.

| Field | Description | 
| -------- | -------- | 
| **recording id** | Unique identifier of the recording this event belongs to.     |
| **timestamp [ns]** | UTC timestamp of the event. |
| **name** | Name of the event.     |
| **type** | Type of the event. Possible values: project, recording     |


## gaze.csv
This file contains [gaze](/invisible/basic-concepts/data-streams/#gaze) data in world camera coordinates.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the original gaze sample before mapping.     |
| **gaze x [px]** | Float value representing the x-coordinate of the mapped gaze point in world camera pixel coordinates.
| **gaze y [px]** | Same as "gaze x [px]" but for the y-coordinate.     |
| **worn** | This value indicates whether the Pupil Invisible Glasses have been worn by a subject at this point in time. `1.0` indicates that it has been worn, while `0.0` indicates that it has not been worn. Added in version 2 of this enrichment.    |
| **fixation id** | If this gaze sample belongs to a fixation event, this is the corresponding id of the fixation. Otherwise, this field is empty.     |
| **blink id** | If this gaze samples belongs to a blink event, this is the corresponding id of the blink. Otherwise this field is empty.     |
| **azimuth [deg]** | The [azimuth](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray in relation to the scene camera in degrees.     |
| **elevation [deg]** | The [elevation](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray in relation to the scene camera in degrees.     |


## fixations.csv
This file contains [fixations](/invisible/basic-concepts/data-streams/#fixations) detected in the gaze data stream.
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

## blinks.csv
This file contains [blinks](/invisible/basic-concepts/data-streams/#blinks) detected in the eye video.
The corresponding gaze samples that belong to each blink can be determined from the `gaze.csv` file using the `blink id` field.


| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **blink id** | Identifier of the blink. The counter starts at the beginning of the recording.     |
| **start timestamp [ns]** | UTC timestamp in nanoseconds of the start of the blink.     |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the blink.     |
| **duration [ms]** | Duration of the blink in milliseconds.     |

## imu.csv
This file contains data recorded by the integrated [IMU](/invisible/basic-concepts/data-streams/#inertial-measurements) (inertial measurement unit).

| Field | Description | 
| -------- | -------- | 
| **section id** | Unique identifier of the corresponding section.     |
| **recording id** | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the sample.    |
| **gyro x [rad/s]**<br />**gyro y [rad/s]**<br />**gyro z [rad/s]** | Rotation speed around x, y or z-axis respectively in radians/s.    |
| **acceleration x [G]**<br />**acceleration y [G]**<br />**acceleration z [G]** | Translational acceleration along the x, y or z-axis respectively in G. Note `1 G = 9.80665 m/s^2`.|
| **roll** | Drift-free estimation of the roll (head tilt from side to side) in radians. The output range is -π to +π rad. Added in version 2 of this enrichment.    |
| **pitch** | Drift-free estimation of the pitch (head tilt from front to back) in radians. The output range is -π to +π rad. Added in version 2 of this enrichment. |