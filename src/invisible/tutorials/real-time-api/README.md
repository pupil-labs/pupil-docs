# Real-Time API
For some applications it is critical to have access to eye tracking data in real-time. Imagine for example an application utilizing gaze-interaction to allow users to press a button using only their eyes.

In other cases it may be important to automatically start or stop a recording and save [events](). For example you might want to launch a screen-based experiment and have the recording start automatically when the stimulus presentation begins. Additionally, you might want to save the timestamps of when the subject interacted with the screen.

All of this is possible for developers using Pupil Invisible's real-time API. It allows you to stream gaze data and scene video to any device connected to the same local network. Further, you can control all devices remotely to start and stop recordings or save events.

If you are not a developer and simply need a tool to monitor and controll all your devices in real-time, check out [Pupil Invisible Monitor]().

We have created a Python client library for the API that makes it very easy to use. If you require access to the API from a different programming language please see the documentation [here]().

To install the client library execute the following command in a terminal:

```
pip install pupil_labs
```

### Using the Client Library
The client comes in two modes, `simple` and `async`. The simple mode is very easy to use and is the one we will focus on in this tutorial. 

The async mode is using Python's async.io in order to implement non-blocking asynchronous communication. The calls made using the simple mode are blocking. If you don't know what any of this means, that's okay! The simple mode suffices for most use-cases and you usually do not need to understand the differences!

The simple client is located in `pupil_labs.realtime_api.simple`. Using the `discover_one_device` method we can connect to a Pupil Invisible device connected to your local network. Make sure the Invisible Companion app is running! If no device can be found, please check [this section]() in our troubleshooting area! 


```python
from pupil_labs.realtime_api.basic import discover_one_device
device = discover_one_device(max_search_duration_seconds=10)
```


With the device connected, you can check various properties of the Companion device and the Pupil Invisible Glasses:


```python
print(f"Phone IP address: {device.phone_ip}")
print(f"Phone name: {device.phone_name}")
print(f"Phone unique ID: {device.phone_id}")

print(f"Battery level: {device.battery_level_percent}%")
print(f"Battery state: {device.battery_state}")

print(f"Free storage: {device.memory_num_free_bytes / 1024**3}GB")
print(f"Storage level: {device.memory_state}")

print(f"Connected glasses: SN {device.serial_number_glasses}")
print(f"Connected scene camera: SN {device.serial_number_scene_cam}")
```

### Remote Controll of Pupil Invisible Devices
Use the `recording_start` and `recording_stop_and_save` methods to remotely start and stop recordings.

While a recordings is running you can check it's current duration by querying the device's status using `get_status`.


```python
import time

recording_id = device.recording_start()
print(f"Started recording with id {recording_id}")

time.sleep(5)

status = device.get_status()
print(f"Recording is running for {status.recording.rec_duration_seconds} seconds")

device.recording_stop_and_save()

```

While a recording is running, you can save [events]() using the `send_event` method. By default, the Pupil Invisible device receiving the event will assign assign a timestamp to it, using the time of arrivel. Optionally, you can set a custom nanosecond timestamp for your event instead.


```python
device.recording_start()

print(device.send_event("test event"))

# send event with current timestamp
print(device.send_event("test event", event_timestamp_unix_ns=time.time_ns()))

device.recording_stop_and_save()

```

### Streaming Scene Video and Gaze Data


```python
frame = device.read_scene_video_frame()
bgr_buffer = frame.bgr_buffer()

import matplotlib.pyplot as plt

plt.imshow(bgr_buffer)
```
