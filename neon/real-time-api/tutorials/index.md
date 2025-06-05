# Introduction

For some applications it is critical to have access to eye tracking data in real time. Imagine for example an application utilizing gaze interaction to allow users to press a button using only their eyes.

In other cases, it may be important to automatically start or stop a recording and save [events](/data-collection/events/). For example, you might want to launch a screen-based experiment and have the recording start automatically when the stimulus presentation begins. Additionally, you might want to save the timestamps of when the subject interacted with the screen.

All of this is possible for developers using the real-time API. It allows you to stream gaze data and scene video to any device connected to the same local network. Further, you can control all devices remotely to start and stop recordings or save events.

If you are not a developer and simply need a tool to monitor and control all your devices in real-time, check out [Neon Monitor](/data-collection/monitor-app/).

We have created a Python client library for the API that makes it very easy to use. If you require access to the API from a different programming language, you will have to write your own client. Please see the documentation [here](https://pupil-labs.github.io/pl-realtime-api/dev/).

To install the client library execute the following command in a terminal:

```
pip install pupil-labs-realtime-api
```

The client comes in two modes, `simple` and `async`. The simple mode is very easy to use and is the one we will focus on in this tutorial.

## Connecting to a Neon Device

Using the [`discover_one_device`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.discover_one_device) function, we can connect to a Neon device connected to your local network. Make sure the Neon Companion app is running! If no device can be found, please check the [troubleshooting section](#troubleshooting) at the end.

```python
from pupil_labs.realtime_api.simple import discover_one_device
device = discover_one_device()
```

With the device connected, you can check various properties of the Companion device and the Neon:

```python
print(f"Phone IP address: {device.phone_ip}")
print(f"Phone name: {device.phone_name}")
print(f"Battery level: {device.battery_level_percent}%")
print(f"Free storage: {device.memory_num_free_bytes / 1024**3:.1f} GB")
print(f"Serial number of connected glasses: {device.serial_number_glasses}")
```

```
Phone IP address: 192.168.1.168
Phone name: OnePlus8
Battery level: 43%
Free storage: 92.4 GB
Serial number of connected glasses: h4gcf
```

## Starting & Stopping Recordings

Use the [`recording_start`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.recording_start)
and [`recording_stop_and_save`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.recording_stop_and_save)
methods to remotely start and stop recordings.

```python
import time
from pupil_labs.realtime_api.simple import discover_one_device

device = discover_one_device()

recording_id = device.recording_start()
print(f"Started recording with id {recording_id}")

time.sleep(5)

device.recording_stop_and_save()
```

```
Started recording with id 2f99d9f9-f009-4015-97dd-eb253de443b0
```

## Saving Events

While a recording is running, you can save [events](/data-collection/events/)
using the [`send_event`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.send_event) method.
By default, the Neon device receiving the event will assign a timestamp to it,
using the time of arrival. Optionally, you can set a custom nanosecond timestamp for your event instead.

```python
from pupil_labs.realtime_api.simple import discover_one_device
device = discover_one_device()

device.recording_start()

print(device.send_event("test event 1"))

time.sleep(5)

# send event with current timestamp
print(device.send_event("test event 2", event_timestamp_unix_ns=time.time_ns()))

device.recording_stop_and_save()
```

```
Event(name=None recording_id=None timestamp_unix_ns=1642599117043000000 datetime=2022-01-19 14:31:57.043000)
Event(name=None recording_id=fd8c98ca-cd6c-4d3f-9a05-fbdb0ef42668 timestamp_unix_ns=1642599122555200500 datetime=2022-01-19 14:32:02.555201)

```

## Scene Video and Gaze, Pupil Diameter, Eye Poses, and Eye Openness Data

You can receive the current scene camera frame as well as the current gaze sample using the [`receive_matched_scene_video_frame_and_gaze`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.receive_matched_scene_video_frame_and_gaze) method. This method also provides [pupil diameter](/data-collection/data-streams/#pupil-diameters) and [eye poses](/data-collection/data-streams/#_3d-eye-poses) and [eye openness data](/data-collection/data-streams/#eye-openness), separately for each eye. An example is provided below:

```python
import cv2
import matplotlib.pyplot as plt
from pupil_labs.realtime_api.simple import discover_one_device

device = discover_one_device()

scene_sample, gaze_sample = device.receive_matched_scene_video_frame_and_gaze()

print("This sample contains the following data:\n")
print(f"Gaze x and y coordinates: {gaze_sample.x}, {gaze_sample.y}\n")
print(
    f"Pupil diameter in millimeters for the left eye: {gaze_sample.pupil_diameter_left} and the right eye: {gaze_sample.pupil_diameter_right}\n"
)
print(
    "Location of left and right eye ball centers in millimeters in relation to the scene camera of the Neon module."
)
print(
    f"For the left eye x, y, z: {gaze_sample.eyeball_center_left_x}, {gaze_sample.eyeball_center_left_y}, {gaze_sample.eyeball_center_left_z} and for the right eye x, y, z: {gaze_sample.eyeball_center_right_x}, {gaze_sample.eyeball_center_right_y}, {gaze_sample.eyeball_center_right_z}.\n"
)
print("Directional vector describing the optical axis of the left and right eye.")
print(
    f"For the left eye x, y, z: {gaze_sample.optical_axis_left_x}, {gaze_sample.optical_axis_left_y}, {gaze_sample.optical_axis_left_z} and for the right eye x, y, z: {gaze_sample.optical_axis_right_x}, {gaze_sample.optical_axis_right_y}, {gaze_sample.optical_axis_right_z}.\n"
)
print("Angles and aperture describing the eyelid openness of the left and right eye.")
print(
    f"For the left eye upper lid angle, lower lid angle, and aperture: {gaze_sample.eyelid_angle_top_left}, {gaze_sample.eyelid_angle_bottom_left}, {gaze_sample.eyelid_aperture_left} and for the right eye: {gaze_sample.eyelid_angle_top_right}, {gaze_sample.eyelid_angle_bottom_right}, {gaze_sample.eyelid_aperture_right}."
)

scene_image_rgb = cv2.cvtColor(scene_sample.bgr_pixels, cv2.COLOR_BGR2RGB)
plt.imshow(scene_image_rgb)
plt.scatter(gaze_sample.x, gaze_sample.y, s=200, facecolors="none", edgecolors="r")
device.close()
plt.show()
```

The output data would look as follows:

```
This sample contains the following data:

Gaze x and y coordinates: 732.8187255859375, 604.2568359375

Pupil diameter in millimeters for the left eye: 3.873124122619629 and the right eye: 3.441348075866699

Location of left and right eye ball centers in millimeters in relation to the scene camera of the Neon module.
For the left eye x, y, z: -30.625, 14.09375, -33.96875 and for the right eye x, y, z: 32.4375, 14.375, -33.9375.

Directional vector describing the optical axis of the left and right eye.
For the left eye x, y, z: -0.015054119750857353, 0.10672548413276672, 0.9941745400428772 and for the right eye x, y, z: -0.06556398421525955, 0.09701070189476013, 0.9931215047836304.

Angles and aperture describing the eyelid openness of the left and right eye.
For the left eye upper lid angle, lower lid angle, and aperture: 0.39990234375, -0.5849609375, 10.859789848327637 and for the right eye: 0.396484375, -0.609375, 11.100102424621582.
```

Alternatively, you could also use the [`receive_scene_video_frame`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.receive_scene_video_frame) and [`receive_gaze_datum`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.receive_gaze_datum) methods to obtain each sample separately. The [`receive_matched_scene_video_frame_and_gaze`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.receive_matched_scene_video_frame_and_gaze) method does however also ensure that both samples are matched temporally.

## IMU Data

Data generated by the IMU can be received using the [`receive_imu_datum`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.receive_imu_datum) method. It returns a UTC timestamp in seconds, the head pose as a quaternion, gyro data, and accelerometer data as follows.

```python
from pupil_labs.realtime_api.simple import discover_one_device
device = discover_one_device()

imu_sample = device.receive_imu_datum()

dt = datetime.fromtimestamp(imu_sample.timestamp_unix_seconds)
print(f"This IMU sample was recorded at {dt}")

print(f"It contains the following data:")

print(f"Head pose:")
print(imu_sample.quaternion)

print(f"Acceleration data:")
print(imu_sample.accel_data)

print(f"Gyro data:")
print(imu_sample.gyro_data)
```

The output data would look as follows:

```
This IMU sample was recorded at 2023-05-25 11:23:05.749155
It contains the following data:
Head pose (as quaternion)
Quaternion(x=0.6989051699638367, y=0.6990674734115601, z=0.14088384807109833, w=0.05466122552752495)
Acceleration data
Data3D(x=0.1142578125, y=0.25927734375, z=-0.93701171875)
Gyro data
Data3D(x=0.1506805419921875, y=-0.1316070556640625, z=-0.0858306884765625)
```

## Camera Calibration

You can receive camera calibration parameters using the [`get_calibration`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.get_calibration) method. Especially the scene camera matrix and distortion coefficients are useful for undistorting the scene video.

```python
from pupil_labs.realtime_api.simple import discover_one_device

device = discover_one_device()
calibration = device.get_calibration()

print("Scene camera matrix:")
print(calibration["scene_camera_matrix"][0])
print("\nScene distortion coefficients:")
print(calibration["scene_distortion_coefficients"][0])

print("\nRight camera matrix:")
print(calibration["right_camera_matrix"][0])
print("\nRight distortion coefficients:")
print(calibration["right_distortion_coefficients"][0])

print("\nLeft camera matrix:")
print(calibration["left_camera_matrix"][0])
print("\nLeft distortion coefficients:")
print(calibration["left_distortion_coefficients"][0])
```

## Template Data

You can access the response data entered into the template questionnaire on the phone and also set those responses remotely.

Using the [`get_template`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.get_template) method, you can receive the definition of the template containing all questions and sections.

```python
template = device.get_template()
fstring = "{i.id}\t{i.title}\t{i.widget_type} \t{i.choices}"
print("\n".join(fstring.format(i=i) for i in template.items))
```

```
e3b94cc7-dce4-4781-a818-f769574c31d2    Section 1       SECTION_HEADER  []
a54e85aa-5474-42f8-90c0-19f40e9ca825    Question 1      TEXT            []
59c01ff9-972e-42c7-8b6f-5ef4e11df5d8    Section 2       SECTION_HEADER  []
3c7d620f-9f98-4556-92dd-b66df329999c    Question 2      PARAGRAPH       []
6169276c-91f4-4ef9-8e03-45759ff61477    Question 3      CHECKBOX_LIST   ['a', 'b', 'c']
33059b82-63b7-4c4e-9bab-a27f7724bd1e    Question 4      RADIO_LIST      ['1', '2', '3']
```

Using the [`get_template_data`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.get_template_data) method, you can receive the responses currently saved in the template.

```python
data = device.get_template_data()
print("\n".join(f"{k}\t{v}" for k, v in data.items()))
```

```
6169276c-91f4-4ef9-8e03-45759ff61477    ['a']
3c7d620f-9f98-4556-92dd-b66df329999c    An example paragraph.
a54e85aa-5474-42f8-90c0-19f40e9ca825    An example short text.
33059b82-63b7-4c4e-9bab-a27f7724bd1e    ['1']
```

Using the [`post_template_data`](https://pupil-labs.github.io/pl-realtime-api/dev/api/simple/#pupil_labs.realtime_api.simple.Device.post_template_data) method, you can set the template responses remotely.

```python
questionnaire = {
    "6169276c-91f4-4ef9-8e03-45759ff61477": "b",
    "3c7d620f-9f98-4556-92dd-b66df329999c": "A different paragraph.",
    "a54e85aa-5474-42f8-90c0-19f40e9ca825": "Another short text.",
    "33059b82-63b7-4c4e-9bab-a27f7724bd1e": "3",
}
device.post_template_data(questionnaire)
```

You can also retrieve individual questions by their ID using the [`get_question_by_id`](https://pupil-labs.github.io/pl-realtime-api/dev/api/async/#pupil_labs.realtime_api.models.Template.get_question_by_id) method and check the validity of a response using the [`validate_answer`](https://pupil-labs.github.io/pl-realtime-api/dev/api/async/#pupil_labs.realtime_api.models.TemplateItem.validate_answer) method.

```python
question = template.get_question_by_id("6169276c-91f4-4ef9-8e03-45759ff61477")
question.validate_answer(["invalid_option"])
```

```
pupil_labs/realtime_api/models.py", line 346, in validate_answer
    raise InvalidTemplateAnswersError(self, answers, errors)
pupil_labs.realtime_api.models.InvalidTemplateAnswersError: Question 3 (6169276c-91f4-4ef9-8e03-45759ff61477) validation errors:
   location: ('6169276c-91f4-4ef9-8e03-45759ff61477', 0)
     input: invalid_option
     message: Value error, 'invalid_option' is not a valid choice from: ['a', 'b', 'c']
```

## Fixations, Saccades and Blinks

You can also stream the detected fixations, saccades, and blinks in real-time please refer to [the real-time examples](https://github.com/pupil-labs/realtime-python-api/blob/main/examples/async/stream_eye_events.py).

## Troubleshooting

If you are having trouble connecting to your Neon device via the real-time API, consider the following points:

1. Make sure the Neon Companion app and the device you are using to access the API are connected to the same local network.
1. For discovery the local network must allow MDNS and UDP traffic. In large public networks this may be prohibited for security reasons.

   - You may still be able to connect to Neon using its IP address. You can find the IP address in the WiFi settings of the phone. Once you have it, you can connect like this:

     ```python
     from pupil_labs.realtime_api.simple import Device

     # This address is just an example. Find out the actual IP address of your device!
     ip = "192.168.1.169"

     device = Device(address=ip, port="8080")
     ```

   - Alternatively, you can circumvent this by running a separate WiFi using the phone's hotspot functionality or a dedicated WiFi router.

## Conclusion

Using the simple mode of the real-time API client you can easily access scene video and gaze data in real-time as well as remote control your Neon devices.

You can find the full API reference [here](https://pupil-labs.github.io/pl-realtime-api/dev/modules/).

For an example implementation on how to use the real-time API in action, please see [Track your Experiment Progress using Events](/real-time-api/track-your-experiment-progress-using-events/).

To learn more about the `async` mode of the client see [here](https://pupil-labs.github.io/pl-realtime-api/dev/methods/async/).
