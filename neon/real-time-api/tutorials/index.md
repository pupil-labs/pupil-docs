# Introduction

For some applications it is critical to have access to eye tracking data in real time. Imagine for example an application utilizing gaze interaction to allow users to press a button using only their eyes.

In other cases it may be important to automatically start or stop a recording and save [events](/data-collection/events/). For example, you might want to launch a screen-based experiment and have the recording start automatically when the stimulus presentation begins. Additionally, you might want to save the timestamps of when the subject interacted with the screen.

All of this is possible for developers using the real-time API. It allows you to stream gaze data and scene video to any device connected to the same local network. Further, you can control all devices remotely to start and stop recordings or save events.

If you are not a developer and simply need a tool to monitor and control all your devices in real-time, check out [Neon Monitor](/data-collection/monitor-app/).

We have created a Python client library for the API that makes it very easy to use. If you require access to the API from a different programming language, you will have to write your own client. Please see the documentation [here](https://pupil-labs-realtime-api.readthedocs.io/en/stable/guides/under-the-hood.html).

To install the client library execute the following command in a terminal:

```
pip install pupil-labs-realtime-api
```

The client comes in two modes, `simple` and `async`. The simple mode is very easy to use and is the one we will focus on in this tutorial.

## Connecting to a Neon Device

Using the [`discover_one_device`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.discover_one_device) function, we can connect to a Neon device connected to your local network. Make sure the Neon Companion app is running! If no device can be found, please check the [troubleshooting section](#troubleshooting) at the end.

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

    Phone IP address: 192.168.1.168
    Phone name: OnePlus8
    Battery level: 43%
    Free storage: 92.4 GB
    Serial number of connected glasses: h4gcf

## Starting & Stopping Recordings

Use the [`recording_start`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.recording_start)
and [`recording_stop_and_save`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.recording_stop_and_save)
methods to remotely start and stop recordings.

```python
import time
from pupil_labs.realtime_api.simple import discover_one_device

device = discover_one_device()

recording_id = device.recording_start()
print(f"Started recording with id {recording_id}")

time.sleep(5)

device.recording_stop_and_save()

# output: Started recording with id 2f99d9f9-f009-4015-97dd-eb253de443b0
```

## Saving Events

While a recording is running, you can save [events](/data-collection/events/)
using the [`send_event`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.send_event) method.
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

```python

Event(name=None recording_id=None timestamp_unix_ns=1642599117043000000 datetime=2022-01-19 14:31:57.043000)
Event(name=None recording_id=fd8c98ca-cd6c-4d3f-9a05-fbdb0ef42668 timestamp_unix_ns=1642599122555200500 datetime=2022-01-19 14:32:02.555201)

```

## Scene Video and Gaze Data

You can receive the current scene camera frame as well as the current gaze sample using the [`receive_matched_scene_video_frame_and_gaze`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.receive_matched_scene_video_frame_and_gaze) method.

```python
from datetime import datetime
import matplotlib.pyplot as plt
import cv2
from pupil_labs.realtime_api.simple import discover_one_device

device = discover_one_device()

scene_sample, gaze_sample = device.receive_matched_scene_video_frame_and_gaze()

scene_image_rgb = cv2.cvtColor(scene_sample.bgr_pixels, cv2.COLOR_BGR2RGB)
plt.imshow(scene_image_rgb)
plt.scatter(gaze_sample.x, gaze_sample.y, s=200, facecolors='none', edgecolors='r')
```

Alternatively, you could also use the [`receive_scene_video_frame`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.receive_scene_video_frame) and [`receive_gaze_datum`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.receive_gaze_datum) methods to obtain each sample separately. The [`receive_matched_scene_video_frame_and_gaze`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.receive_matched_scene_video_frame_and_gaze) method does however also ensure that both samples are matched temporally.

## IMU Data

Data generated by the IMU can be received using the [`receive_imu_datum`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.receive_imu_datum) method. It returns a UTC timestamp in seconds, the head pose as a quaternion, gyro data, and accelerometer data as follows.

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

You can receive camera calibration parameters using the [`get_calibration`](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html#pupil_labs.realtime_api.simple.Device.get_calibration) method. Especially the scene camera matrix and distortion coefficients are useful for undistorting the scene video.

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

You can find the full API reference [here](https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/simple.html).

For an example implementation on how to use the real-time API in action, please see [Track your Experiment Progress using Events](/real-time-api/track-your-experiment-progress-using-events/).

To learn more about the `async` mode of the client see [here](https://pupil-labs-realtime-api.readthedocs.io/en/stable/examples/async.html).
