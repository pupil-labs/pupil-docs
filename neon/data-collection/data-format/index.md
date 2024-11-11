# Recording Format

The page describes the data format when downloading Neon recordings from Pupil Cloud in the "Timeseries Data" and "Timeseries Data + Scene Video" formats. In this format the Data from the Neon Companion is augmented by adding gaze and eye state estimates whenever they had not been computed in realtime. Futhermore fixations and blink data as well as some IMU transformations are computed.

When downloading Native Recording Data from the Cloud or directly [extracting it via USB from the companion device](/data-collection/transfer-recordings-via-usb/), you can use the [pl-neon-recording](https://github.com/pupil-labs/pl-neon-recording) python library to read and access the data or load it onto [Neon Player](/neon-player/). This data format will contain all video data as well as all data that has been computed in realtime on the companion device.

## Recording Folders

The export contains one folder per recording following this naming scheme:
`<recording name>-<start of recording ID>`
The files included in every folder are described in the following.

## info.json

This file contains meta-information on the recording.

| Field                    | Description                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **android_device_id**    | Unique identifier of the Android device used as Companion.                                                                     |
| **android_device_model** | Model name of the Companion device.                                                                                            |
| **android_device_name**  | Device name of the Companion device.                                                                                           |
| **app_version**          | Version of the Neon Companion App used to make the recording.                                                                  |
| **calib_version**        | Version of the offset correction used by the Neon Companion App.                                                               |
| **data_format_version**  | Version of the data format used by the Neon Companion App.                                                                     |
| **duration**             | Duration of the recording in nanoseconds                                                                                       |
| **firmware_version**     | Version numbers of the firmware and FPGA.                                                                                      |
| **frame_id**             | Number identifying the type of frame used for this recording.                                                                  |
| **frame_name**           | Name of the frame used for this recording.                                                                                     |
| **gaze_offset**          | Gaze offset applied to this recording using the offset correction. Values are in pixels.                                       |
| **module_serial_number** | Serial number of the Neon module used for the recording. This number is encoded in the QR code on the back of the Neon module. |
| **os_version**           | Version of the Android OS that was installed on the recording Companion device.                                                |
| **pipeline_version**     | Version of the gaze estimation pipeline used by the Neon Companion App.                                                        |
| **recording_id**         | Unique identifier of the recording.                                                                                            |
| **start_time**           | Timestamp of when the recording was started. Given as UTC timestamp in nanoseconds.                                            |
| **template_data**        | Data regarding the selected template for the recording as well as the response values.                                         |
| **wearer_id**            | Unique identifier of the wearer selected for this recording.                                                                   |
| **gaze_mode**            | Indicates whether binocular or monocular (right/ left) pipeline was used to infer gaze.                                        |
| **wearer_name**          | Name of the wearer selected for this recording.                                                                                |
| **workspace_id**         | The ID of the Pupil Cloud workspace this recording has been assigned to.                                                       |

**Scene Video**
Scene video is contained in a file following the following naming scheme:
`<beginning of section ID>_<section start time>-<section end time>.mp4`

## scene_camera.json

This file contains the camera intrinsics of the used scene camera. The values are determined via calibration of every camera during manufacturing.

| Field             | Description                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **camera_matrix** | The camera matrix of the scene camera.                                                                                                                                                                                                           |
| **dist_coefs**    | The distortion coefficients of the scene camera. The order of the values is `(k1, k2, p1, p2, k3, k4, k5, k6)` following [OpenCV's distortion model](https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html#ga3207604e4b1a1758aa66acb6ed5aa65d). |
| **serial_number** | Serial number of Neon module used for the recording. This number is encoded in the QR code on the back of the Neon module.                                                                                                                       |
| **version**       | The version of the intrinsics data format.                                                                                                                                                                                                       |

## world_timestamps.csv

This file contains the timestamps of every world video frame.

| Field              | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| **section id**     | Unique identifier of the corresponding section.                |
| **recording id**   | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]** | UTC timestamp in nanoseconds of the corresponding world frame. |

## events.csv

This file contains [event](/data-collection/events/) data for all recordings. It contains both event annotations from Pupil Cloud and real-time recording events.

| Field              | Description                                               |
| ------------------ | --------------------------------------------------------- |
| **recording id**   | Unique identifier of the recording this event belongs to. |
| **timestamp [ns]** | UTC timestamp of the event.                               |
| **name**           | Name of the event.                                        |
| **type**           | Type of the event. Possible values: cloud, recording      |

## gaze.csv

This file contains [gaze](/data-collection/data-streams/#gaze) data in world camera coordinates.

| Field                   | Description                                                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **section id**          | Unique identifier of the corresponding section.                                                                                                                                        |
| **recording id**        | Unique identifier of the recording this sample belongs to.                                                                                                                             |
| **timestamp&nbsp;[ns]** | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the eye video frame this sample was generated with.                                                              |
| **gaze x [px]**         | Float value representing the x-coordinate of the mapped gaze point in world camera pixel coordinates.                                                                                  |
| **gaze y [px]**         | Same as "gaze x [px]" but for the y-coordinate.                                                                                                                                        |
| **worn**                | These values indicate whether Neon has been worn by a subject at the respective point in time. `1.0` indicates that it has been worn, while `0.0` indicates that it has not been worn. |
| **fixation id**         | If this gaze sample belongs to a fixation event, this is the corresponding id of the fixation. Otherwise, this field is empty.                                                         |
| **blink id**            | If this gaze samples belongs to a blink event, this is the corresponding id of the blink. Otherwise this field is empty.                                                               |
| **azimuth [deg]**       | The [azimuth](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray in relation to the scene camera in degrees.                                                  |
| **elevation [deg]**     | The [elevation](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray in relation to the scene camera in degrees.                                                |

## fixations.csv

This file contains [fixations](/data-collection/data-streams/#fixations-saccades) detected in the gaze data stream.
The corresponding gaze samples that belong to each fixation can be determined from the `gaze.csv` file using the `fixation id` field.

| Field                              | Description                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **section id**                     | Unique identifier of the corresponding section.                                                                                                                                |
| **recording id**                   | Unique identifier of the recording this sample belongs to.                                                                                                                     |
| **fixation id**                    | Identifier of the fixation. The counter starts at the beginning of the recording.                                                                                              |
| **start&nbsp;timestamp&nbsp;[ns]** | UTC timestamp in nanoseconds of the start of the fixation.                                                                                                                     |
| **end timestamp [ns]**             | UTC timestamp in nanoseconds of the end of the fixation.                                                                                                                       |
| **duration [ms]**                  | Duration of the fixation in milliseconds.                                                                                                                                      |
| **fixation x [px]**                | Float value representing the x-coordinate of the fixation in world camera pixel coordinates. This position is the average of all gaze samples within the fixation.             |
| **fixation y [px]**                | Same as "fixation x [px]" but for the y-coordinate.                                                                                                                            |
| **azimuth [deg]**                  | The [azimuth](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray corresponding to the fixation location in relation to the scene camera in degrees.   |
| **elevation [deg]**                | The [elevation](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) of the gaze ray corresponding to the fixation location in relation to the scene camera in degrees. |

## saccades.csv

This file contains [saccades](/data-collection/data-streams/#fixations-saccades) detected by the fixation detector.

| Field                              | Description                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **section id**                     | Unique identifier of the corresponding section.                                                         |
| **recording id**                   | Unique identifier of the recording this sample belongs to.                                              |
| **saccade id**                     | Identifier of the saccade. The counter starts at the beginning of the recording.                        |
| **start&nbsp;timestamp&nbsp;[ns]** | UTC timestamp in nanoseconds of the start of the saccade.                                               |
| **end&nbsp;timestamp&nbsp;[ns]**   | UTC timestamp in nanoseconds of the end of the saccade.                                                 |
| **duration [ms]**                  | Duration of the saccade in milliseconds.                                                                |
| **amplitude [px]**                 | Float value representing the amplitude of the saccade in world camera pixel coordinates.                |
| **amplitude [deg]**                | Float value representing the amplitude of the saccade in degrees of visual angle.                       |
| **mean&nbsp;velocity&nbsp;[px/s]** | Float value representing the mean velocity of the saccade in world camera pixel coordinates per second. |
| **peak&nbsp;velocity&nbsp;[px/s]** | Float value representing the peak velocity of the saccade in world camera pixel coordinates per second. |

## 3d_eye_states.csv

This file contains [3D eye states](/data-collection/data-streams/#_3d-eye-states) as well as [pupil diameter](/data-collection/data-streams/#pupil-diameters) data.

| Field                                                                                                                                                                                                                                                                                                       | Description                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **section id**                                                                                                                                                                                                                                                                                              | Unique identifier of the corresponding section.                                                                                                                                                                                                                 |
| **recording id**                                                                                                                                                                                                                                                                                            | Unique identifier of the recording this sample belongs to.                                                                                                                                                                                                      |
| **timestamp [ns]**                                                                                                                                                                                                                                                                                          | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the eye video frame this sample was generated with.                                                                                                                                       |
| **pupil&nbsp;diameter&nbsp;left&nbsp;[mm]**                                                                                                                                                                                                                                                                 | Physical diameter of the pupil of the left eye.                                                                                                                                                                                                                 |
| **pupil&nbsp;diameter&nbsp;right&nbsp;[mm]**                                                                                                                                                                                                                                                                | Physical diameter of the pupil of the right eye.                                                                                                                                                                                                                |
| **eye&nbsp;ball&nbsp;center&nbsp;left&nbsp;x&nbsp;[mm]**<br /> **eye ball center left y [mm]**<br /> **eye ball center left z [mm]**<br /> **eye&nbsp;ball&nbsp;center&nbsp;right&nbsp;x&nbsp;[mm]**<br /> **eye&nbsp;ball&nbsp;center&nbsp;right&nbsp;y&nbsp;[mm]**<br /> **eye ball center right z [mm]** | Location of left and right eye ball centers in millimeters in relation to the scene camera of the Neon module. For details on the coordinate systems see [here](/data-collection/data-streams/#_3d-eye-states).                                                 |
| **optical axis left x**<br /> **optical axis left y**<br /> **optical axis left z**<br /> **optical axis right x**<br /> **optical axis right y**<br /> **optical axis right z**                                                                                                                            | Directional vector describing the optical axis of the left and right eye, i.e. the vector pointing from eye ball center to pupil center of the respective eye. For details on the coordinate systems see [here](/data-collection/data-streams/#_3d-eye-states). |

## blinks.csv

This file contains [blinks](/data-collection/data-streams/#blinks) detected in the eye video.
The corresponding gaze samples that belong to each blink can be determined from the `gaze.csv` file using the `blink id` field.

| Field                              | Description                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| **section id**                     | Unique identifier of the corresponding section.                                |
| **recording id**                   | Unique identifier of the recording this sample belongs to.                     |
| **blink id**                       | Identifier of the blink. The counter starts at the beginning of the recording. |
| **start&nbsp;timestamp&nbsp;[ns]** | UTC timestamp in nanoseconds of the start of the blink.                        |
| **end timestamp [ns]**             | UTC timestamp in nanoseconds of the end of the blink.                          |
| **duration [ms]**                  | Duration of the blink in milliseconds.                                         |

## imu.csv

This file contains data recorded by the integrated [IMU](/data-collection/data-streams/#movement-imu-data) (inertial measurement unit).

| Field                                                                                              | Description                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **section id**                                                                                     | Unique identifier of the corresponding section.                                                                                                                |
| **recording id**                                                                                   | Unique identifier of the recording this sample belongs to.                                                                                                     |
| **timestamp [ns]**                                                                                 | UTC timestamp in nanoseconds of the sample.                                                                                                                    |
| **gyro x [deg/s]**<br />**gyro y [deg/s]**<br />**gyro z [deg/s]**                                 | Rotation speed around x, y or z-axis respectively in degrees/s.                                                                                                |
| **acceleration&nbsp;x&nbsp;[g]**<br />**acceleration&nbsp;y&nbsp;[g]**<br />**acceleration z [g]** | Translational acceleration (in terms of [g-force](https://en.m.wikipedia.org/wiki/G-force)) along the x, y or z-axis respectively. Note `1 g = 9.80665 m/s^2`. |
| **roll [deg]**                                                                                     | Drift-free estimate of the roll (head tilt from side to side) in degrees. The output range is -180 to +180 degrees. Added in version 2 of this enrichment.     |
| **pitch [deg]**                                                                                    | Drift-free estimate of the pitch (head tilt from front to back) in degrees. The output range is -90 to +90 degrees. Added in version 2 of this enrichment.     |
| **yaw [deg]**                                                                                      | Drift-free estimate of the yaw (horizontal head rotation) in degrees. The output range is -180 to +180 degrees. Added in version 2 of this enrichment.         |
| **quaternion w**<br />**quaternion x**<br />**quaternion y**<br />**quaternion z**                 | Quaternion describing the rotation of the Neon module.                                                                                                         |
